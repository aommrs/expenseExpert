import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getTransaction } from '@prisma/client/sql'

const prisma = new PrismaClient();

export async function GET() {
    try {
        const transaction = await prisma.$queryRawTyped(getTransaction());

        return NextResponse.json(transaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        return NextResponse.json({ error: 'Failed to fetch transaction' }, { status: 500 });
    }
}
