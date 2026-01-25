export type CodeExample = {
    id: string
    title: string
    code: string
}

export const codeExamples: CodeExample[] = [
    {
        id: "hooks-problems",
        title: "useEffect anti-patterns",
        code: `import { useEffect } from "react"

export default function Example() {
  useEffect(async () => {
    window.addEventListener("resize", () => {
      console.log("resize")
    })
  }, [])

  return <div>Hello</div>
}
`,
    },
    {
        id: "performance-problems",
        title: "Performance issues",
        code: `function Example({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={index}
          style={{ marginTop: 10 }}
          onClick={() => console.log(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}
`,
    },
    {
        id: "clean-example",
        title: "Clean React code",
        code: `import { useEffect, useCallback } from "react"

export default function Example({ items }) {
  const handleClick = useCallback((item) => {
    console.log(item)
  }, [])

  useEffect(() => {
    console.log("mounted")
  }, [])

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => handleClick(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  )
}
`,
    },
]
