-- CreateTable
CREATE TABLE "User" (
    "ong_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name_ong" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsApp" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL NOT NULL,
    "userOng_id" INTEGER NOT NULL,
    CONSTRAINT "Cases_userOng_id_fkey" FOREIGN KEY ("userOng_id") REFERENCES "User" ("ong_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ong_id_key" ON "User"("ong_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_sessionId_key" ON "User"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Cases_id_key" ON "Cases"("id");
