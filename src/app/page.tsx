"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import SortFilterControl from "@/components/SortFilterControl";
import Pagination from "@/components/Pagination";
import { useCars } from "@/hooks/useCars";
import { SortOrder } from "@/types/car";
import { Suspense } from "react";
import CarList from "@/components/CarList";

export default function Home() {
    return (
        <Suspense
            fallback={
                <div className="text-center py-8">Загрузка страницы...</div>
            }
        >
            <CarList />
        </Suspense>
    );
}
