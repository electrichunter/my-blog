import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDBConnection } from "@/lib/db";

export async function POST(req: NextRequest) {

    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "E-posta ve şifre gereklidir" }, { status: 400 });
        }

        const db = await getDBConnection();

        // Kullanıcı zaten var mı?
        const [existingUsers] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
        if (Array.isArray(existingUsers) && existingUsers.length > 0) {
            return NextResponse.json({ error: "Bu e-posta zaten kullanılıyor" }, { status: 400 });
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);

        // Kullanıcıyı kaydet
        await db.execute("INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, NOW())", [email, hashedPassword]);

        return NextResponse.json({ message: "Kayıt başarılı" }, { status: 201 });

    } catch (error) {
        console.error("Register API Hatası:", error);
        return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
    }
}
