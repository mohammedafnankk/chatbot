import bcrypt from "bcryptjs";
import crypto from "crypto";

async function test() {
    console.log("--- Testing Password Hashing ---");
    const password = "newpassword123";
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    
    const isValid = await bcrypt.compare(password, hashedPassword);
    console.log("Is password valid after hashing?", isValid);
    
    const isInvalid = await bcrypt.compare("wrongpassword", hashedPassword);
    console.log("Is wrong password invalid?", !isInvalid);

    console.log("\n--- Testing Token Generation ---");
    const token = crypto.randomBytes(32).toString("hex");
    console.log("Generated Token:", token);
    console.log("Token length:", token.length);
}

test().catch(console.error);
