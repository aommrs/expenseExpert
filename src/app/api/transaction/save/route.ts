import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { id, categoryId, amount, transactionCode, transactionDesc, transDate } = await request.json();

        let response;

        if (id) {
            response = await prisma.transaction.update({
                where: { id },
                data: {
                    categoryId,
                    amount,
                    transactionCode,
                    transactionDesc,
                    transDate
                },
            });
        } else {
            if (!categoryId || !amount || !transactionDesc) {
                return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
            }
            response = await prisma.transaction.create({
                data: {
                    categoryId,
                    amount,
                    transactionCode,
                    transactionDesc,
                    transDate
                },
            });
        }

        return NextResponse.json(response, { status: id ? 200 : 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to process transaction' }, { status: 500 });
    }
}
