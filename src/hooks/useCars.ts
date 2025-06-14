import { useState, useEffect } from "react";
import { Car, CarsResponse, SortOrder } from "@/types/car";

type UseCarsResult = {
    cars: Car[];
    meta: CarsResponse["meta"] | null;
    loading: boolean;
    error: string | null;
};

export function useCars(
    currentPage: number,
    currentSort: "price" | null,
    currentOrder: SortOrder
): UseCarsResult {
    const [cars, setCars] = useState<Car[]>([]);
    const [meta, setMeta] = useState<CarsResponse["meta"] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            setError(null);

            try {
                const params = new URLSearchParams({
                    _limit: "12",
                    _page: currentPage.toString(),
                });

                if (currentSort && currentOrder) {
                    params.append("_sort", currentSort);
                    params.append("_order", currentOrder);
                }

                const response = await fetch(`/api/cars?${params.toString()}`);
                const data: CarsResponse = await response.json();
                setCars(data.data);
                setMeta(data.meta);
            } catch (error) {
                setError("Не удалось загрузить данные");
                console.error("Не удалось загрузить:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [currentPage, currentSort, currentOrder]);

    return { cars, meta, loading, error };
}
