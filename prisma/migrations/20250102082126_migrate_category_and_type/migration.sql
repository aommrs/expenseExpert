/*
  Warnings:

  - You are about to drop the column `type` on the `Category` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "type",
ADD COLUMN     "typeId" BIGINT NOT NULL;

-- CreateTable
CREATE TABLE "Type" (
    "id" BIGSERIAL NOT NULL,
    "type_name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
