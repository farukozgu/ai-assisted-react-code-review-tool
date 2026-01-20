"use client"
import { BsLightningChargeFill } from "react-icons/bs";


type AnalyzeButtonProps = {
    onClick: () => void
    isLoading: boolean
    disabled?: boolean
}

export default function AnalyzeButton({
    onClick,
    isLoading,
    disabled,
}: AnalyzeButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className="
            inline-flex
            items-center
            justify-center
            rounded-lg
            bg-[#4B42DB]
            dark:bg-[#4B42DB]
            dark:text-white
            hover:bg-[#3a32c8]
            px-5
            py-2.5
            text-md
            font-medium
            text-white
            transition
            disabled:cursor-not-allowed
            disabled:opacity-70
            cursor-pointer
        "
        >
            <BsLightningChargeFill className="mr-2" />
            {isLoading ? "Analyzing..." : "Analyze Code"}
        </button>
    )
}
