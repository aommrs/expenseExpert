import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getMostExpenseCategory } from '@prisma/client/sql';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const monthYear = url.searchParams.get('monthYear');

        if (!monthYear) {
            return NextResponse.json({ error: 'Month and Year parameter is required' }, { status: 400 });
        }

        const mostExpenseCategory = await prisma.$queryRawTyped(getMostExpenseCategory(monthYear));

        const mostExpenseCategoryBar = {
            month: monthYear,
            ...mostExpenseCategory.reduce((acc: any, item: any) => {
                acc[item.categoryName] = item.totalAmount;
                return acc;
            }, {}),
        };
        const mostExpenseCategoryBarArray = [mostExpenseCategoryBar];

        const series = mostExpenseCategory.map((item: any) => ({
            dataKey: item.categoryName,
            label: item.categoryName,
        }));

        return NextResponse.json({
            mostExpenseCategoryBarArray,
            series,
        });
    } catch (error) {
        console.error('Error fetching most expense category:', error);
        return NextResponse.json({ error: 'Failed to fetch most expense category' }, { status: 500 });
    }
}