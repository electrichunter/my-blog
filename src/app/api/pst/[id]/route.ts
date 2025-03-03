import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

// 📌 Belirli bir ID'ye sahip gönderiyi getir
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await getDBConnection();
        const [posts] = await db.execute("SELECT id, title, content, created_at FROM posts WHERE id = ? AND is_deleted = 0", [params.id]);
        db.end();

        if ((posts as any[]).length === 0) {
            return NextResponse.json({ error: "Gönderi bulunamadı" }, { status: 404 });
        }

        return NextResponse.json((posts as any[])[0]);
    } catch (error) {
        return NextResponse.json({ error: "Veri çekme hatası" }, { status: 500 });
    }
}

// 📌 Gönderiyi güncelle
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { title, content } = await req.json();
        if (!title || !content) {
            return NextResponse.json({ error: "Başlık ve içerik gerekli" }, { status: 400 });
        }

        const db = await getDBConnection();
        const [result] = await db.execute("UPDATE posts SET title = ?, content = ? WHERE id = ?", [title, content, params.id]);
        db.end();

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Gönderi bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ message: "Gönderi güncellendi" });
    } catch (error) {
        return NextResponse.json({ error: "Güncelleme hatası" }, { status: 500 });
    }
}

// 📌 Soft delete: Gönderiyi tamamen silmek yerine is_deleted = 1 yap
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const db = await getDBConnection();
        const [result] = await db.execute("UPDATE posts SET is_deleted = 1 WHERE id = ?", [params.id]);
        db.end();

        if ((result as any).affectedRows === 0) {
            return NextResponse.json({ error: "Gönderi bulunamadı" }, { status: 404 });
        }

        return NextResponse.json({ message: "Gönderi silindi" });
    } catch (error) {
        return NextResponse.json({ error: "Silme hatası" }, { status: 500 });
    }
}
