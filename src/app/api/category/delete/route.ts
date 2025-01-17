import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const response = await prisma.category.delete({
            where: { id },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error(error);

        if (error.code === 'P2003') {
            return NextResponse.json(
                {
                    error: 'ไม่สามารถลบข้อมูลหมวดหมู่ได้ เนื่องจากหมวดหมู่นี้ถูกนำไปใช้งานแล้ว',
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: 'Failed to delete category',
            },
            { status: 500 }
        );
    }
}