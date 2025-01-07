import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCategory } from '@prisma/client/sql'

const prisma = new PrismaClient();

export async function GET() {
    try {
        const category = await prisma.$queryRawTyped(getCategory());

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}
