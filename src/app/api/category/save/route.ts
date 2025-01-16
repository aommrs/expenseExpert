import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { id, typeId, emoji, categoryName } = await request.json();

        if (id) {
            const response = await prisma.category.update({
                where: { id },
                data: {
                    typeId,
                    emoji,
                    categoryName
                },
            });
            return NextResponse.json(response, { status: 200 });
        }

        const count = await prisma.category.count();
        if (count >= 20) {
            return NextResponse.json(
                {
                    error: 'ระบบนี้เป็น Demo ไม่สามารถเพิ่มข้อมูลเกินจำนวน 20 รายการได้',
                },
                { status: 400 }
            );
        }

        if (!typeId || !emoji || !categoryName) {
            return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
        }

        const response = await prisma.category.create({
            data: {
                typeId,
                emoji,
                categoryName
            },
        });

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'ไม่สามารถเพิ่มหมวดหมู่ได้' }, { status: 500 });
    }
}
