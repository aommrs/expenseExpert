-- CreateTable
CREATE TABLE "Category" (
    "id" BIGSERIAL NOT NULL,
    "type" BIGINT NOT NULL,
    "category_name" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
