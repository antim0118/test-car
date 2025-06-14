import { useState } from "react";
import { XMarkIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { SortOrder } from "@/types/car";

type SortFilterControlProps = {
    currentSort: "price" | null;
    currentOrder: SortOrder;
    onSortChange: (order: SortOrder) => void;
};

export default function SortFilterControl({
    currentSort,
    currentOrder,
    onSortChange,
}: SortFilterControlProps) {
    const [isOpen, setIsOpen] = useState(false);

    const displayValue = !currentSort
        ? "Сортировка по умолчанию"
        : currentOrder === "asc"
        ? "Цена по возрастанию"
        : "Цена по убыванию";

    const handleOptionClick = (order: SortOrder) => {
        onSortChange(order);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full max-w-80">
            <div
                className="flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Bars3BottomLeftIcon className="h-4 w-4 text-gray-500" />
                <span className="text-gray-700">{displayValue}</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOptionClick(null);
                        }}
                        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                    >
                        <XMarkIcon className="h-4 w-4 text-gray-500" />
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                    <button
                        onClick={() => handleOptionClick(null)}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Сортировка по умолчанию
                    </button>
                    <button
                        onClick={() => handleOptionClick("asc")}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Цена по возрастанию
                    </button>
                    <button
                        onClick={() => handleOptionClick("desc")}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Цена по убыванию
                    </button>
                </div>
            )}
        </div>
    );
}
