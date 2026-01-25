import * as t from "@babel/types"
import type { NodePath } from "@babel/traverse"
import type { Issue } from "../types"

/**
 * Rule:
 * Detects inline object or array literals used inside JSX props.
 */
export function inlineJsxObjectRule(
    path: NodePath<t.JSXAttribute>,
    issues: Issue[]
) {
    const value = path.node.value

    // Only JSX expressions: prop={...}
    if (!t.isJSXExpressionContainer(value)) return

    const expression = value.expression

    const isInlineObject = t.isObjectExpression(expression)
    const isInlineArray = t.isArrayExpression(expression)

    if (!isInlineObject && !isInlineArray) return

    issues.push({
        id: "inline-jsx-object",
        title: "Inline object or array used in JSX",
        description:
            "An object or array literal is created inline inside JSX.",
        severity: "low",
        explanation:
            "Inline objects and arrays are recreated on every render, which can cause unnecessary re-renders when passed as props.",
        refactorSuggestion:
            "Move the object or array outside of JSX and memoize it using useMemo if necessary.",
        refactorSnippet: {
            before: `<Component style={{ marginTop: 10 }} />`,
            after: `const style = useMemo(() => ({ marginTop: 10 }), [])

<Component style={style} />`,
        },
    })
}
