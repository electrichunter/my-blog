import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (email === "test@example.com" && password === "Test1234") {
            const token = jwt.sign({ email }, "your_secret_key", { expiresIn: "1h" });
            return NextResponse.json({ token });
        } else {
            return NextResponse.json({ error: "Geçersiz giriş bilgileri" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
