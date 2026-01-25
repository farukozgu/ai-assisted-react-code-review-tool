import traverse from "@babel/traverse"
import type { File } from "@babel/types"
import type { Issue } from "./types"
import { useEffectDependencyRule } from "./rules/useEffectDependencyRule"
import { inlineJsxFunctionRule } from "./rules/inlineJsxFunctionRule"
import { asyncUseEffectRule } from "./rules/asyncUseEffectRule"
import { missingUseEffectCleanupRule } from "./rules/missingUseEffectCleanupRule"
import { inlineJsxObjectRule } from "./rules/inlineJsxObjectRule"
import { indexAsKeyRule } from "./rules/indexAsKeyRule"


export function analyzeAst(ast: File) {
    const issues: Issue[] = []

    traverse(ast, {
        CallExpression(path) {
            useEffectDependencyRule(path, issues)
            asyncUseEffectRule(path, issues)
            missingUseEffectCleanupRule(path, issues)
        },
        JSXAttribute(path) {
            inlineJsxFunctionRule(path, issues)
            inlineJsxObjectRule(path, issues)
            indexAsKeyRule(path, issues)
        },


    })

    return {
        summary: {
            issueCount: issues.length,
        },
        issues,
    }
}
