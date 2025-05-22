'use client'

import { useState } from "react";

const filters = [
    { label: "Semua", key: "all" },
    { label: "Diproses", key: "packing" },
    { label: "Dikirim", key: "shipped" },
    { label: "Selesai", key: "done" },
];

export default function OrderFilter({ onChange }) {
    const [active, setActive] = useState("packing");

    function handleClick(key) {
        setActive(key);
        if (onChange) onChange(key);
    }

    return (
        <nav className="flex justify-center w-fit border rounded-lg border-gray-300 font-semibold text-sm select-none">
            {filters.map(({ label, key }) => {
                const isActive = key === active;
                return (
                    <button
                        key={key}
                        onClick={() => handleClick(key)}
                        className={`relative px-4 py-3 whitespace-nowrap ${isActive
                                ? "text-primary border-b-2 border-primary"
                                : "text-gray-700 hover:text-primary"
                            }`}
                    >
                        {label}
                    </button>
                );
            })}
        </nav>
    );
}