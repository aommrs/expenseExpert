import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });


        const response = await prisma.transaction.delete({
            where: { id },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
    }
}
