import 'dotenv/config';
import {createAuthClient} from "better-auth/react";

export const authClient = createAuthClient({
    baseURL:process.env.AUTH_BASE_URL!
})