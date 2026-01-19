import * as t from "@babel/types"
import type { NodePath } from "@babel/traverse"
import type { Issue } from "../types"

/**
 * Rule:
 * Detects inline arrow functions used inside JSX attributes.
 */
export function inlineJsxFunctionRule(
    path: NodePath<t.JSXAttribute>,
    issues: Issue[]
) {
    const value = path.node.value

    // Only consider JSX expressions: onClick={...}
    if (!t.isJSXExpressionContainer(value)) return

    const expression = value.expression

    // Detect arrow functions: onClick={() => ...}
    if (!t.isArrowFunctionExpression(expression)) return

    issues.push({
        id: "inline-jsx-function",
        title: "Inline function used in JSX",
        description:
            "Defining functions inline inside JSX can cause unnecessary re-renders. Consider extracting the function or memoizing it with useCallback.",
        severity: "medium",
    })
}
