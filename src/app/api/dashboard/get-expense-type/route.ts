import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getMostExpenseType } from '@prisma/client/sql';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const monthYear = url.searchParams.get('monthYear');

        if (!monthYear) {
            return NextResponse.json({ error: 'Month and Year parameter is required' }, { status: 400 });
        }

        const mostExpenseType = await prisma.$queryRawTyped(getMostExpenseType(monthYear));

        return NextResponse.json(mostExpenseType);
    } catch (error) {
        console.error('Error fetching most expense type:', error);
        return NextResponse.json({ error: 'Failed to fetch most expense type' }, { status: 500 });
    }
}
