ALTER TABLE "users" ALTER COLUMN "dob" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" varchar DEFAULT 'user' NOT NULL;