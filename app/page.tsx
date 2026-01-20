"use client";

import Image from "next/image";
import { useState } from "react";
import CodeInput from "./components/CodeInput";
import AnalyzeButton from "./components/AnalyzeButton";
import OutputPanel from "./components/OutputPanel";
import Header from "./components/Header";
import ExamplePicker from "./components/ExamplePicker";

type Issue = {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  explanation: string
  refactorSuggestion: string
}

type AnalysisResult = {
  summary: {
    issueCount: number
  }
  issues: Issue[]
}


export default function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      if (!res.ok) {
        throw new Error("Request failed")
      }

      const data: AnalysisResult = await res.json()
      setResult(data)
    } catch (error) {
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectExample = (code: string) => {
    setCode(code)
    setResult(null)
  }




  return (
    <>
      <Header />
      <main className="min-h-screen max-w-400 mx-auto px-8 py-16">
        <h1 className="text-5xl font-bold mb-6 text-center">React Code Review</h1>
        <p className="mb-8 text-2xl text-center">A rule-based tool that analyzes React components, highlights common anti-patterns,<br /> and suggests safe refactors.</p>
        <ExamplePicker onSelect={setCode} />
        <section className="mx-auto pt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

          <div className="flex flex-col gap-6">
            <CodeInput value={code} onChange={setCode} />

            <AnalyzeButton
              onClick={handleAnalyze}
              isLoading={isLoading}
              disabled={!code.trim()}
            />
          </div>

          <div>
            <OutputPanel result={result} />
          </div>
        </section>
      </main>
    </>

  );
}
