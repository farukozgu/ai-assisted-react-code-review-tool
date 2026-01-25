"use client"

type Props = {
    open: boolean
    onClose: () => void
}

export default function DocsModal({ open, onClose }: Props) {
    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded bg-white dark:bg-[#2e2d2d] dark: p-6 text-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-3 text-lg font-semibold">
                    About React Code Review
                </h2>

                <p className="mb-4 opacity-80">
                    This tool analyzes React components using rule-based static analysis
                    to detect common anti-patterns and suggest safe refactors.
                </p>

                <p className="mb-2 font-medium">What it checks</p>
                <ul className="mb-4 list-disc pl-5 opacity-80">
                    <li>useEffect dependency issues</li>
                    <li>Async useEffect usage</li>
                    <li>Missing cleanup functions</li>
                    <li>Performance-related JSX patterns</li>
                    <li>List rendering issues (index as key)</li>
                </ul>

                <p className="mb-2 font-medium">What it does not do</p>
                <ul className="mb-4 list-disc pl-5 opacity-80">
                    <li>Automatically rewrite your code</li>
                    <li>Replace ESLint or human review</li>
                    <li>Analyze full projects</li>
                </ul>

                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="rounded bg-[#4B42DB] px-4 py-1.5 text-white cursor-pointer hover:bg-[#5b51e0] transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}
