import * as t from "@babel/types"
import type { NodePath } from "@babel/traverse"
import type { Issue } from "../types"

/**
 * Rule:
 * Detects array index used as key in list rendering.
 */
export function indexAsKeyRule(
    path: NodePath<t.JSXAttribute>,
    issues: Issue[]
) {
    // key={...}
    if (!t.isJSXIdentifier(path.node.name)) return
    if (path.node.name.name !== "key") return

    const value = path.node.value
    if (!t.isJSXExpressionContainer(value)) return

    const expression = value.expression

    // key={index}
    if (!t.isIdentifier(expression)) return

    const keyName = expression.name

    // Check if we're inside a map callback
    const mapCall = path.findParent((p) =>
        p.isCallExpression() &&
        t.isMemberExpression(p.node.callee) &&
        t.isIdentifier(p.node.callee.property) &&
        p.node.callee.property.name === "map"
    )

    if (!mapCall) return

    const callback = mapCall.node.arguments[0]
    if (!t.isFunction(callback) && !t.isArrowFunctionExpression(callback)) {
        return
    }

    const params = callback.params

    // map((item, index) => ...)
    if (params.length < 2) return

    const indexParam = params[1]
    if (!t.isIdentifier(indexParam)) return

    // index variable matches key
    if (indexParam.name !== keyName) return

    issues.push({
        id: "index-as-key",
        title: "Array index used as key",
        description:
            "The array index is used as the key when rendering a list.",
        severity: "medium",
        explanation:
            "Using the array index as a key can cause issues when the list changes, leading to incorrect component reuse and state bugs.",
        refactorSuggestion:
            "Use a stable and unique value from the item itself as the key instead of the index.",
        refactorSnippet: {
            before: `items.map((item, index) => (
  <Item key={index} />
))`,
            after: `items.map((item) => (
  <Item key={item.id} />
))`,
        },
    })
}
