export type RefactorSnippet = {
    before: string
    after: string
}

export type Issue = {
    id: string
    title: string
    description: string
    severity: "low" | "medium" | "high"
    explanation?: string
    refactorSuggestion?: string
    refactorSnippet?: RefactorSnippet
}

export type AnalysisResult = {
    summary: {
        issueCount: number
    }
    issues: Issue[]
}
