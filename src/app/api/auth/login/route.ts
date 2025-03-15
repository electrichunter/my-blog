import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
 
import { getDBConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        const db = await getDBConnection();

        // Kullanıcıyı veritabanından al
        const [rows]: any = await db.execute(
            "SELECT id, email, password_hash FROM users WHERE email = ?",
            [email]
        );

        // Kullanıcı var mı kontrol et
        if (rows.length === 0) {
            return NextResponse.json({ error: "Geçersiz giriş bilgileri" }, { status: 401 });
        }

        const user = rows[0];

        // Şifreyi doğrula
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Geçersiz giriş bilgileri" }, { status: 401 });
        }

        // JWT oluştur
        const token = jwt.sign({ id: user.id, email: user.email }, "your_secret_key", { expiresIn: "1h" });

        return NextResponse.json({ token });

    } catch (error) {
        console.error("Login API Hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
// Compare this snippet from my-blog/src/app/api/auth/login/route.ts:
// import { NextRequest, NextResponse } from "next/server";