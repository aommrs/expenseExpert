import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCategoryDropdown } from '@prisma/client/sql'

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categoryDropdown = await prisma.$queryRawTyped(getCategoryDropdown());

        return NextResponse.json(categoryDropdown);
    } catch (error) {
        console.error('Error fetching category dropdown:', error);
        return NextResponse.json({ error: 'Failed to fetch category dropdown' }, { status: 500 });
    }
}
