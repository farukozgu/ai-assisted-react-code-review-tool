"use client"
import { IoCodeSlashOutline } from "react-icons/io5";


type CodeInputProps = {
    value: string
    onChange: (value: string) => void
}

export default function CodeInput({ value, onChange }: CodeInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1 text-sm font-semibold text-gray-700 dark:text-white">
                <IoCodeSlashOutline className="text-lg" />
                PASTE YOUR CODE HERE
            </label>

            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={` function Example() {
const [count, setCount] = useState(0)

useEffect(() => {
    console.log(count)
}, [])

 return (
    <button onClick={() => setCount(count + 1)}>
        {count}
    </button>
    )
}`}
                className="
                    min-h-150
                    resize-none
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    dark:bg-[#2e2d2d]
                    p-4
                    font-sans
                    text-lg
                    leading-relaxed
                    text-gray-900
                    dark:text-white
                    outline-none
                    focus:border-gray-400
                    shadow-sm
                    "
            />
        </div>
    )
}
