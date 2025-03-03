import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

// 📌 Tüm gönderileri (is_deleted = false olanları) getir
export async function GET() {
    let db;
    try {
        db = await getDBConnection();
        const [posts]: any = await db.execute(
            "SELECT id, title, content, created_at FROM posts WHERE is_deleted = 0 ORDER BY created_at DESC"
        );
        return NextResponse.json({ success: true, posts });
    } catch (error) {
        console.error("Veri çekme hatası:", error);
        return NextResponse.json({ success: false, error: "Veri çekme hatası" }, { status: 500 });
    } finally {
        if (db) await db.end();
    }
}

// 📌 Yeni gönderi ekle
export async function POST(req: NextRequest) {
    let db;
    try {
        const { title, content } = await req.json();
        if (!title.trim() || !content.trim()) {
            return NextResponse.json({ success: false, error: "Başlık ve içerik gerekli" }, { status: 400 });
        }

        db = await getDBConnection();
        await db.execute("INSERT INTO posts (title, content) VALUES (?, ?)", [title, content]);

        return NextResponse.json({ success: true, message: "Gönderi eklendi" });
    } catch (error) {
        console.error("Gönderi ekleme hatası:", error);
        return NextResponse.json({ success: false, error: "Gönderi ekleme hatası" }, { status: 500 });
    } finally {
        if (db) await db.end();
    }
}
