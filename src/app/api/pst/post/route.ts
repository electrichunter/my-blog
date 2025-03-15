import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get("content-type");
        let title: string, content: string, coverImage: string | null = null;
        let authorId: number = 1; // 🛠️ Varsayılan olarak 1 yapıldı

        if (contentType?.includes("multipart/form-data")) {
            // 🖼️ FormData ile Dosya Yükleme
            const formData = await req.formData();
            title = formData.get("title") as string;
            content = formData.get("content") as string;
            const file = formData.get("coverImage") as File | null;

            if (file) {
                coverImage = `/uploads/${file.name}`;
            }
        } else {
            // 📜 JSON formatında POST isteği
            const body = await req.json();
            title = body.title;
            content = body.content;
            coverImage = body.coverImage || null;
        }

        // 🚀 MySQL'e ekleme (HATA DÜZELTİLDİ: `author_id` artık varsayılan olarak 1)
        const db = await getDBConnection();
        await db.execute(
            "INSERT INTO posts (title, content, cover_image, author_id) VALUES (?, ?, ?, ?)",
            [title, content, coverImage, authorId]
        );

        db.end();
        return NextResponse.json({ success: true, message: "Post başarıyla eklendi!" });
    } catch (error) {
        console.error("Gönderi ekleme hatası:", error);
        return NextResponse.json({ error: "Post eklenirken hata oluştu" }, { status: 500 });
    }
}
