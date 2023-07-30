-- CreateTable
CREATE TABLE "User" (
    "ong_id" SERIAL NOT NULL,
    "name_ong" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("ong_id")
);

-- CreateTable
CREATE TABLE "Cases" (
    "id" SERIAL NOT NULL,
    "case" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "userOng_id" INTEGER NOT NULL,

    CONSTRAINT "Cases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ong_id_key" ON "User"("ong_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_sessionId_key" ON "User"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Cases_id_key" ON "Cases"("id");

-- AddForeignKey
ALTER TABLE "Cases" ADD CONSTRAINT "Cases_userOng_id_fkey" FOREIGN KEY ("userOng_id") REFERENCES "User"("ong_id") ON DELETE RESTRICT ON UPDATE CASCADE;
