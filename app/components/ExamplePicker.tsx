"use client"

import { codeExamples } from "@/lib/examples"

type Props = {
    onSelect: (code: string) => void
}


export default function ExamplePicker({ onSelect }: Props) {
    return (
        <div className="mb-4 space-y-2">
            <p className="text-sm font-medium opacity-80">
                Try an example:
            </p>

            <div className="flex flex-wrap gap-2">
                {codeExamples.map((example) => (
                    <button
                        key={example.id}
                        onClick={() => onSelect(example.code)}
                        className="rounded border px-3 py-1.5 text-sm text-white cursor-pointer bg-[#4B42DB] hover:bg-[#3a32c8] transition"
                    >
                        {example.title}
                    </button>
                ))}
            </div>
        </div>
    )
}
