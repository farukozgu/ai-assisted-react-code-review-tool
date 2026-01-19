import { NextResponse } from "next/server"
import { analyzeCode } from "./analyzeCode"

export async function POST(req: Request) {
    const { code } = await req.json()

    if (!code || typeof code !== "string") {
        return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    try {
        const result = analyzeCode(code)
        return NextResponse.json(result)
    } catch {
        return NextResponse.json(
            { error: "Analysis failed" },
            { status: 500 }
        )
    }
}
