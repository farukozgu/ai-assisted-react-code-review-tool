import * as t from "@babel/types"
import type { NodePath } from "@babel/traverse"
import type { Issue } from "../types"

/**
 * Rule:
 * Detects useEffect hooks with side-effects but no cleanup function.
 */
export function missingUseEffectCleanupRule(
    path: NodePath<t.CallExpression>,
    issues: Issue[]
) {
    const callee = path.node.callee

    // Only useEffect(...)
    if (!t.isIdentifier(callee) || callee.name !== "useEffect") {
        return
    }

    const args = path.node.arguments
    if (args.length === 0) return

    const effectCallback = args[0]

    if (!t.isArrowFunctionExpression(effectCallback)) return

    const body = effectCallback.body
    if (!t.isBlockStatement(body)) return

    let hasSideEffect = false
    let hasCleanup = false

    body.body.forEach((statement) => {
        // return () => {...}
        if (
            t.isReturnStatement(statement) &&
            t.isArrowFunctionExpression(statement.argument)
        ) {
            hasCleanup = true
        }

        // window.addEventListener(...)
        if (
            t.isExpressionStatement(statement) &&
            t.isCallExpression(statement.expression)
        ) {
            const call = statement.expression

            if (
                t.isMemberExpression(call.callee) &&
                t.isIdentifier(call.callee.property)
            ) {
                const method = call.callee.property.name

                if (
                    method === "addEventListener" ||
                    method === "setInterval" ||
                    method === "setTimeout"
                ) {
                    hasSideEffect = true
                }
            }
        }
    })

    if (hasSideEffect && !hasCleanup) {
        issues.push({
            id: "missing-useeffect-cleanup",
            title: "Missing useEffect cleanup",
            description:
                "The effect contains a side-effect but does not return a cleanup function.",
            severity: "medium",
            explanation:
                "Side-effects like event listeners or timers should be cleaned up when the component unmounts to avoid memory leaks.",
            refactorSuggestion:
                "Return a cleanup function from useEffect to remove listeners or clear timers.",
            refactorSnippet: {
                before: `useEffect(() => {
  window.addEventListener("resize", handleResize)
}, [])`,
                after: `useEffect(() => {
  window.addEventListener("resize", handleResize)

  return () => {
    window.removeEventListener("resize", handleResize)
  }
}, [])`,
            },
        })
    }
}
