import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { id, typeId, emoji, categoryName } = await request.json();

        let response;

        if (id) {
            response = await prisma.category.update({
                where: { id },
                data: {
                    typeId,
                    emoji,
                    categoryName
                },
            });
        } else {
            if (!typeId || !emoji || !categoryName) {
                return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
            }
            response = await prisma.category.create({
                data: {
                    typeId,
                    emoji,
                    categoryName
                },
            });
        }

        return NextResponse.json(response, { status: id ? 200 : 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process category' }, { status: 500 });
    }
}
