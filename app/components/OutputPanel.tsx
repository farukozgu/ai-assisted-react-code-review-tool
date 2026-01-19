import { GoDotFill } from "react-icons/go";



type Issue = {
    id: string
    title: string
    description: string
    severity: "Low" | "Medium" | "High"
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
                        <strong className="text-black dark:text-white">{issue.title}</strong>
                        <p className="text-black dark:text-white">{issue.description}</p>
                        <span className="text-black dark:text-white">Severity: {issue.severity}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
