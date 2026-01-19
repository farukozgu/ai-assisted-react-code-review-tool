import traverse from "@babel/traverse"
import type { File } from "@babel/types"
import type { Issue } from "./types"
import { useEffectDependencyRule } from "./rules/useEffectDependencyRule"
import { inlineJsxFunctionRule } from "./rules/inlineJsxFunctionRule"

export function analyzeAst(ast: File) {
    const issues: Issue[] = []

    traverse(ast, {
        CallExpression(path) {
            useEffectDependencyRule(path, issues)
        },
        JSXAttribute(path) {
            inlineJsxFunctionRule(path, issues)
        },
    })

    return {
        summary: {
            issueCount: issues.length,
        },
        issues,
    }
}
