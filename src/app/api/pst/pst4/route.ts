import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db"; 

export async function GET() {
    let db;
    try {
        db = await getDBConnection(); // Bağlantıyı aç
        const [posts] = await db.execute(
            "SELECT id, title, content, cover_image AS img, created_at FROM posts WHERE is_deleted = FALSE AND status = 'published' ORDER BY created_at DESC LIMIT 4"
        );
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Veri çekme hatası:", error);
        return NextResponse.json({ error: "Veri çekme hatası" }, { status: 500 });
    } finally {
        if (db) db.end(); // Bağlantıyı kapat
    }
}
