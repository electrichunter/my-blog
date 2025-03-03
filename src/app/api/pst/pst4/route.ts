import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db"; 

export async function GET() {
    try {
        const db = await getDBConnection();
        const [posts] = await db.execute(
            "SELECT id, title, content, created_at FROM posts WHERE is_deleted = 0 ORDER BY created_at DESC LIMIT 4"
        );
        db.end();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Veri çekme hatası" }, { status: 500 });
    }
}
