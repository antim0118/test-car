import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

type PaginationProps = {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    lastPage,
    onPageChange,
}: PaginationProps) {
    const renderPageNumbers = () => {
        const pageNumbers: (number | string)[] = [];
        const pagesToShowAroundCurrent = 1;

        const addPage = (page: number) => {
            if (page >= 1 && page <= lastPage) {
                pageNumbers.push(page);
            }
        };

        addPage(1);

        for (
            let i = currentPage - pagesToShowAroundCurrent;
            i <= currentPage + pagesToShowAroundCurrent;
            i++
        ) {
            if (i > 1 && i < lastPage) {
                addPage(i);
            }
        }

        if (lastPage > 1) {
            addPage(lastPage);
        }

        const uniqueSortedPages = Array.from(new Set(pageNumbers)).sort(
            (a: any, b: any) => a - b
        );

        const finalPages: (number | string)[] = [];
        for (let i = 0; i < uniqueSortedPages.length; i++) {
            const current = uniqueSortedPages[i];
            finalPages.push(current);

            if (i < uniqueSortedPages.length - 1) {
                const next = uniqueSortedPages[i + 1];
                if (
                    typeof current === "number" &&
                    typeof next === "number" &&
                    next - current > 1
                ) {
                    finalPages.push("...");
                }
            }
        }

        return finalPages.map((page, index) =>
            typeof page === "string" ? (
                <button
                    disabled
                    key={page}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors font-medium text-gray-100 bg-gray-500 opacity-50 cursor-not-allowed border border-gray-700`}
                >
                    {page}
                </button>
            ) : (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors font-medium ${
                        page === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-white text-blue-500 hover:bg-gray-200 border border-blue-500"
                    }`}
                >
                    {page}
                </button>
            )
        );
    };

    return (
        <div className="mt-8 flex justify-center items-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 border border-gray-300 hover:bg-blue-600 disabled:bg-gray-500 disabled:border disabled:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeftIcon className="h-5 w-5 text-gray-100" />
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 border border-gray-300 hover:bg-blue-600 disabled:bg-gray-500 disabled:border disabled:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRightIcon className="h-5 w-5 text-gray-100" />
            </button>
        </div>
    );
}
