/*
  Warnings:

  - You are about to drop the `safe_notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "safe_notes" DROP CONSTRAINT "safe_notes_userId_fkey";

-- DropTable
DROP TABLE "safe_notes";

-- CreateTable
CREATE TABLE "safenotes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "note" VARCHAR(1000) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "safenotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "safenotes" ADD CONSTRAINT "safenotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
