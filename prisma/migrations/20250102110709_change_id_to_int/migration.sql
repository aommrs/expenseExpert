/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `typeId` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `Type` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Type` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- Create Sequences
CREATE SEQUENCE Category_id_seq START 1;
CREATE SEQUENCE Type_id_seq START 1;

-- Drop Foreign Key Constraint
ALTER TABLE "Category" DROP CONSTRAINT "Category_typeId_fkey";

-- Alter Category Table (id and typeId columns)
ALTER TABLE "Category" 
  DROP CONSTRAINT "Category_pkey",  -- Drop the existing primary key constraint
  ALTER COLUMN "id" TYPE INTEGER,   -- Change id type from BigInt to Integer
  ALTER COLUMN "id" SET DEFAULT nextval('Category_id_seq'::regclass),  -- Set the default to the next sequence value
  ALTER COLUMN "typeId" SET DATA TYPE INTEGER,  -- Change typeId type from BigInt to Integer
  ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");  -- Re-add the primary key constraint

-- Alter Type Table (id column)
ALTER TABLE "Type"
  DROP CONSTRAINT "Type_pkey",  -- Drop the existing primary key constraint
  ALTER COLUMN "id" TYPE INTEGER,  -- Change id type from BigInt to Integer
  ALTER COLUMN "id" SET DEFAULT nextval('Type_id_seq'::regclass),  -- Set the default to the next sequence value
  ADD CONSTRAINT "Type_pkey" PRIMARY KEY ("id");  -- Re-add the primary key constraint

-- Add Foreign Key Constraint on Category
ALTER TABLE "Category" 
  ADD CONSTRAINT "Category_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


