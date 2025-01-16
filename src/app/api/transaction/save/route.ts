import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { id, categoryId, amount, transactionCode, transactionDesc, transDate } = await request.json();

        if (!id && (!categoryId || !amount || !transactionDesc)) {
            return NextResponse.json({ error: 'กรุณากรอกข้อมูลให้ครบ' }, { status: 400 });
        }

        let response;

        if (id) {
            response = await prisma.transaction.update({
                where: { id },
                data: {
                    categoryId,
                    amount,
                    transactionCode,
                    transactionDesc,
                    transDate,
                },
            });
        } else {
            const count = await prisma.transaction.count();
            if (count >= 20) {
                return NextResponse.json(
                    { error: 'ระบบนี้เป็น Demo ไม่สามารถเพิ่มข้อมูลเกินจำนวน 20 รายการได้' },
                    { status: 400 }
                );
            }

            response = await prisma.transaction.create({
                data: {
                    categoryId,
                    amount,
                    transactionCode,
                    transactionDesc,
                    transDate,
                },
            });
        }

        return NextResponse.json(response, { status: id ? 200 : 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'ไม่สามารถเพิ่มรายการได้' }, { status: 500 });
    }
}
