-- CreateTable
CREATE TABLE "security_events" (
    "id" SERIAL NOT NULL,
    "client_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "details" JSONB NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "security_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "event_type_idx" ON "security_events"("event_type");

-- CreateIndex
CREATE INDEX "occurred_at_idx" ON "security_events"("occurred_at");
