CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(225) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(225) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
