import { GoDotFill } from "react-icons/go";

type Issue = {
    id: string
    title: string
    description: string
    severity: "low" | "medium" | "high"
    explanation: string
    refactorSuggestion: string
}


type OutputPanelProps = {
    result: {
        summary: {
            issueCount: number
        }
        issues: Issue[]
    } | null
}

export default function OutputPanel({ result }: OutputPanelProps) {
    if (!result) return null

    return (
        <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-white">
                <GoDotFill color="red" className="text-lg" /> ISSUES FOUND: {result.summary.issueCount}
            </h2>
            <ul className="flex flex-col gap-4 bg-gray-100 dark:bg-[#2e2d2d] px-4 py-3 rounded-lg">
                {result.issues.map((issue) => (
                    <li className="bg-white dark:bg-[#3f3e3e] px-4 py-3 rounded-lg" key={issue.id}>
                        <div className="flex justify-between items-center">
                            <strong className="text-black dark:text-white text-lg">{issue.title}</strong>
                            <span
                                className={
                                    "inline-block px-4 py-1 text-sm font-bold rounded-full uppercase " +
                                    (
                                        issue.severity === "high"
                                            ? "bg-red-100 text-red-700"
                                            : issue.severity === "medium"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                    )}
                            >
                                {issue.severity}
                            </span>

                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-black dark:text-white">{issue.description}</p>
                            <p>
                                <strong className="text-lg">Why this is a problem:</strong><br />
                                {issue.explanation}
                            </p>

                            <p>
                                <strong className="text-lg">How to refactor:</strong><br />
                                {issue.refactorSuggestion}
                            </p>
                        </div>




                    </li>
                ))}
            </ul>

        </div>
    )
}
