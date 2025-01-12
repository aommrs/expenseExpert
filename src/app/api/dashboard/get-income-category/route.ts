import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getMostIncomeCategory } from '@prisma/client/sql';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const monthYear = url.searchParams.get('monthYear');

        if (!monthYear) {
            return NextResponse.json({ error: 'Month and Year parameter is required' }, { status: 400 });
        }

        const mostIncomeCategory = await prisma.$queryRawTyped(getMostIncomeCategory(monthYear));

        const mostIncomeCategoryBar = {
            month: monthYear,
            ...mostIncomeCategory.reduce((acc: any, item: any) => {
                acc[item.categoryName] = item.totalAmount;
                return acc;
            }, {}),
        };
        const mostIncomeCategoryBarArray = [mostIncomeCategoryBar];

        const series = mostIncomeCategory.map((item: any) => ({
            dataKey: item.categoryName,
            label: item.categoryName,
        }));

        return NextResponse.json({
            mostIncomeCategoryBarArray,
            series,
        });
    } catch (error) {
        console.error('Error fetching most income category:', error);
        return NextResponse.json({ error: 'Failed to fetch most income category' }, { status: 500 });
    }
}
