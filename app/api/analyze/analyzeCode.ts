import { parse } from "@babel/parser"
import type { AnalysisResult } from "./types"
import { analyzeAst } from "./analyzeAst"

export function analyzeCode(code: string): AnalysisResult {
    const ast = parse(code, {
        sourceType: "module",
        plugins: ["jsx", "typescript"],
    })

    return analyzeAst(ast)
}
