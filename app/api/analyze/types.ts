export type RefactorSnippet = {
    before: string
    after: string
}

export type Issue = {
    id: string
    title: string
    description: string
    severity: "low" | "medium" | "high"

    // Rule’lar tarafından doldurulabilir
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
