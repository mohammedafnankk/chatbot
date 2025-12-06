
import { pgTable , varchar ,integer ,uuid ,date} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users",{
    id: uuid().primaryKey().notNull().defaultRandom(),
    role:varchar().notNull().default("user"),
    googleId:varchar(),
    name:varchar({length:225}).notNull(),
    age:integer().notNull(),
    email:varchar({length:225}).notNull().unique(),
    dob:date().defaultNow()
})