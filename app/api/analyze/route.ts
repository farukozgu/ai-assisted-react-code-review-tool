import { NextResponse } from "next/server"
import { analyzeCode } from "./analyzeCode"
import { explainIssue } from "./explainIssue"

export async function POST(req: Request) {
    const { code } = await req.json()

    if (!code || typeof code !== "string") {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    try {
        const analysisResult = analyzeCode(code)

        const explainedIssues = await Promise.all(
            analysisResult.issues.map(async (issue) => {
                const fallback = await explainIssue(issue, code)

                return {
                    ...issue,

                    explanation:
                        issue.explanation || fallback.explanation,

                    refactorSuggestion:
                        issue.refactorSuggestion || fallback.refactorSuggestion,

                    // Snippet zaten rule’dan geliyorsa aynen koru
                    refactorSnippet: issue.refactorSnippet,
                }
            })
        )

        return NextResponse.json({
            summary: {
                issueCount: explainedIssues.length,
            },
            issues: explainedIssues,
        })
    } catch (error) {
        console.error("ANALYZE ERROR:", error)

        return NextResponse.json(
            { error: "Analysis failed" },
            { status: 500 }
        )
    }
}
