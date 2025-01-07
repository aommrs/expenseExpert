import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getType } from '@prisma/client/sql'

const prisma = new PrismaClient();

export async function GET() {
    try {
        const types = await prisma.$queryRawTyped(getType());

        return NextResponse.json(types);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
