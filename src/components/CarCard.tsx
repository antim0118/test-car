import Image from "next/image";
import { Car } from "@/types/car";
import { HeartIcon, ScaleIcon } from "@heroicons/react/24/outline";
import {
    BoltIcon,
    Cog6ToothIcon,
    GlobeAmericasIcon,
    SwatchIcon,
    CalendarDaysIcon,
    EyeDropperIcon,
} from "@heroicons/react/24/solid";

type CarCardProps = {
    car: Car;
};

export default function CarCard({ car }: CarCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <div className="relative h-48 w-full">
                <Image
                    src={car.images.image[0]}
                    alt={`${car.mark_id} ${car.folder_id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-bold mb-3 line-clamp-2">
                    {car.mark_id} {car.folder_id}
                </h3>
                <div className="text-sm font-bold mb-2">
                    {car.price.toLocaleString("ru-RU")} ₽
                </div>
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                    <p className="flex items-center gap-1">
                        <BoltIcon className="h-4 w-4 text-gray-500" />
                        {car.engine_volume}{" "}
                        {car.engine_type === "Бензин" ? "л." : ""} (
                        {car.engine_power})
                    </p>
                    <div className="flex space-x-1">
                        <p className="flex items-center gap-1">
                            <GlobeAmericasIcon className="h-4 w-4 text-gray-500" />
                            {car.run.toLocaleString("ru-RU")} км
                        </p>
                        <p className="flex items-center gap-1">
                            <Cog6ToothIcon className="h-4 w-4 text-gray-500" />
                            {car.gearbox}
                        </p>
                    </div>
                    <div className="flex space-x-1">
                        <p className="flex items-center gap-1">
                            <EyeDropperIcon className="h-4 w-4 text-gray-500" />
                            {car.engine_type}
                        </p>
                        <p className="flex items-center gap-1">
                            <SwatchIcon className="h-4 w-4 text-gray-500" />
                            {car.color}
                        </p>
                        <p className="flex items-center gap-1">
                            <CalendarDaysIcon className="h-4 w-4 text-gray-500" />
                            {car.year}
                        </p>
                    </div>
                </div>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors">
                            <HeartIcon className="h-5 w-5 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors">
                            <ScaleIcon className="h-5 w-5 text-gray-600" />
                        </button>
                    </div>
                    <button className="bg-blue-500 text-white text-sm px-5 py-2 rounded-md hover:bg-blue-600 transition-colors font-medium">
                        КУПИТЬ
                    </button>
                </div>
            </div>
        </div>
    );
}
