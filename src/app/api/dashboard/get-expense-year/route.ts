import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getExpenseInYear } from '@prisma/client/sql';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const yearParam = url.searchParams.get("year");
        const year = yearParam ? parseInt(yearParam, 10) : null;

        if (!year) {
            return NextResponse.json({ error: 'Year parameter is required' }, { status: 400 });
        }

        const expenseYear = await prisma.$queryRawTyped(getExpenseInYear(year));

        const month = expenseYear.map((data: any) => `Month ${data.month}`);
        const income = expenseYear.map((data: any) => data.income || 0);
        const expense = expenseYear.map((data: any) => data.expense || 0);
        const invest = expenseYear.map((data: any) => data.invest || 0);
        const tax = expenseYear.map((data: any) => data.tax || 0);
        const saving = expenseYear.map((data: any) => data.saving || 0);

        return NextResponse.json({
            month,
            income,
            expense,
            invest,
            tax,
            saving,
        });
    } catch (error) {
        console.error('Error fetching expense year:', error);
        return NextResponse.json({ error: 'Failed to fetch expense year' }, { status: 500 });
    }
}
