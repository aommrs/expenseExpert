import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getBalance } from '@prisma/client/sql';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const balance = await prisma.$queryRawTyped(getBalance());

        return NextResponse.json(balance);
    } catch (error) {
        console.error('Error fetching balance:', error);
        return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
    }
}