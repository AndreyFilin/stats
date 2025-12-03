-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_categories" (
    "id" VARCHAR(36) NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(80) NOT NULL,
    "sys_name" VARCHAR(80) NOT NULL,

    CONSTRAINT "transaction_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "title" VARCHAR(80) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "category" VARCHAR(36) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "login" VARCHAR(30) NOT NULL,
    "password" VARCHAR(32) NOT NULL,
    "token" VARCHAR(36),
    "token_created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "role" VARCHAR(26) DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_login" ON "users"("login");
