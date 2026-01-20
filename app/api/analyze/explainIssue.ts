import type { Issue } from "./types"

export type IssueExplanation = {
    explanation: string
    refactorSuggestion: string
}

export async function explainIssue(
    issue: Issue,
    _code: string
): Promise<IssueExplanation> {
    if (issue.id === "missing-useeffect-deps") {
        return {
            explanation:
                "This effect runs only once because the dependency array is empty. If you use values from the component scope inside the effect, they may become outdated.",
            refactorSuggestion:
                "Add the relevant variables to the dependency array or restructure the logic so the effect does not rely on changing values.",
        }
    }

    if (issue.id === "inline-jsx-function") {
        return {
            explanation:
                "Inline functions inside JSX are recreated on every render, which can lead to unnecessary re-renders and performance issues.",
            refactorSuggestion:
                "Move the function outside of JSX or memoize it using useCallback.",
        }
    }

    return {
        explanation:
            "This issue was detected by the analysis engine.",
        refactorSuggestion:
            "Review the code and consider refactoring based on best practices.",
    }
}
