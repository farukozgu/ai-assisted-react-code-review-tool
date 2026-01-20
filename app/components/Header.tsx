import React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { RiMoonFill } from "react-icons/ri";
import { FaRegSun } from "react-icons/fa";


function Header() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div>
            <header className="mx-auto px-8 py-5 border-b border-gray-100 shadow-xs bg-white dark:bg-[#1E1E1E] dark:border-0">
                <div className='flex justify-between items-center'>
                    <div className="text-xl font-bold text-black dark:text-white">React Code Review</div>
                    <div className="text-sm text-gray-600 flex items-center">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2 text-[24px] text-black dark:text-white cursor-pointer transition-colors"
                        >
                            {theme === "dark" ? (
                                <FaRegSun />
                            ) : (
                                <RiMoonFill />
                            )}
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Header;
