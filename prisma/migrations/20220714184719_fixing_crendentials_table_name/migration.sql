/*
  Warnings:

  - You are about to drop the `credencials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "credencials" DROP CONSTRAINT "credencials_userId_fkey";

-- DropTable
DROP TABLE "credencials";

-- CreateTable
CREATE TABLE "credentials" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "credentials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
