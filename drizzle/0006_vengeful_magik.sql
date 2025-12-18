ALTER TABLE "conversation" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "conversation" ALTER COLUMN "user_id" SET DATA TYPE text;