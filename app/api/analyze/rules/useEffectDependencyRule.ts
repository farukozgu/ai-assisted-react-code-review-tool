import * as t from "@babel/types"
import type { NodePath } from "@babel/traverse"
import type { Issue } from "../types"

/**
 * Rule:
 * Detects useEffect calls with an empty dependency array.
 */
export function useEffectDependencyRule(
    path: NodePath<t.CallExpression>,
    issues: Issue[]
) {
    const callee = path.node.callee

    // Only handle useEffect(...)
    if (!t.isIdentifier(callee) || callee.name !== "useEffect") {
        return
    }

    const args = path.node.arguments

    // useEffect must have exactly two arguments
    if (args.length !== 2) return

    const deps = args[1]

    // Second argument must be an array
    if (!t.isArrayExpression(deps)) return

    // Empty dependency array detected
    if (deps.elements.length === 0) {
        issues.push({
            id: "missing-useeffect-deps",
            title: "Missing useEffect dependencies",
            description:
                "The dependency array of useEffect is empty. This may cause stale values or unexpected behavior if variables are used inside the effect.",
            severity: "high",
        })
    }
}
