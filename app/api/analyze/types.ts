export type Issue = {
    id: string
    title: string
    description: string
    severity: "low" | "medium" | "high"
}

export type AnalysisResult = {
    summary: {
        issueCount: number
    }
    issues: Issue[]
}
