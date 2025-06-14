import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("_page") || "1";
    const limit = searchParams.get("_limit") || "12";
    const sort = searchParams.get("_sort");
    const order = searchParams.get("_order");

    let url = `https://testing-api.ru-rating.ru/cars?_limit=${limit}&_page=${page}`;

    if (sort && order) {
        url += `&_sort=${sort}&_order=${order}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Не удалось загрузить" },
            { status: 500 }
        );
    }
}
