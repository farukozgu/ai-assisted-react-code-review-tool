import * as t from "@babel/types"
import type { NodePath } from "@babel/traverse"
import type { Issue } from "../types"


export function asyncUseEffectRule(
    path: NodePath<t.CallExpression>,
    issues: Issue[]
) {
    const callee = path.node.callee

    if (!t.isIdentifier(callee) || callee.name !== "useEffect") {
        return
    }

    const args = path.node.arguments
    if (args.length === 0) return

    const effectCallback = args[0]

    if (
        t.isArrowFunctionExpression(effectCallback) &&
        effectCallback.async
    ) {
        issues.push({
            id: "async-useeffect",
            title: "Async function used in useEffect",
            description:
                "The callback passed to useEffect is declared as async.",
            severity: "high",
            explanation:
                "useEffect callbacks should not be async because React expects the callback to optionally return a cleanup function, not a Promise.",
            refactorSuggestion:
                "Move the async logic into an inner function and call it synchronously inside useEffect.",
            refactorSnippet: {
                before: `useEffect(async () => {
  await fetchData()
}, [])`,
                after: `useEffect(() => {
  const load = async () => {
    await fetchData()
  }

  load()
}, [])`,
            },
        })
    }
}
