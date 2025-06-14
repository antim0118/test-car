"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import SortFilterControl from "@/components/SortFilterControl";
import Pagination from "@/components/Pagination";
import { useCars } from "@/hooks/useCars";
import { SortOrder } from "@/types/car";

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("_page")) || 1;
    const currentSort = searchParams.get("_sort") as "price" | null;
    const currentOrder = searchParams.get("_order") as SortOrder;

    const { cars, meta, loading, error } = useCars(
        currentPage,
        currentSort,
        currentOrder
    );

    const handleSortChange = (order: SortOrder) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        const params = new URLSearchParams(currentParams);

        if (order) {
            params.set("_sort", "price");
            params.set("_order", order);
        } else {
            params.delete("_sort");
            params.delete("_order");
        }
        params.set("_page", "1");
        router.push(`/?${params.toString()}`);
    };

    const handlePageChange = (page: number) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        const params = new URLSearchParams(currentParams);
        params.set("_page", page.toString());
        router.push(`/?${params.toString()}`);
    };

    return (
        <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
                <SortFilterControl
                    currentSort={currentSort}
                    currentOrder={currentOrder}
                    onSortChange={handleSortChange}
                />
            </div>

            {loading ? (
                <div className="text-center py-8">Загрузка...</div>
            ) : error ? (
                <div className="text-center py-8 text-red-600">{error}</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {cars.map((car) => (
                            <CarCard key={car.unique_id} car={car} />
                        ))}
                    </div>

                    {meta && (
                        <Pagination
                            currentPage={currentPage}
                            lastPage={meta.last_page}
                            onPageChange={handlePageChange}
                        />
                    )}
                </>
            )}
        </main>
    );
}
