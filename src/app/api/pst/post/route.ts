import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const coverImage = formData.get('coverImage') as File | null;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { success: false, error: "Başlık ve içerik gerekli" }, 
        { status: 400 }
      );
    }

    let imagePath = null;
    if (coverImage) {
      const bytes = await coverImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const newFileName = `${Date.now()}_${coverImage.name}`;
      const uploadDir = path.join(process.cwd(), "public/uploads");
      
      await fs.mkdir(uploadDir, { recursive: true });
      
      const newPath = path.join(uploadDir, newFileName);
      await fs.writeFile(newPath, buffer);
      imagePath = `/uploads/${newFileName}`;
    }

    const db = await getDBConnection();
    await db.execute(
      "INSERT INTO posts (title, content, img) VALUES (?, ?, ?)",
      [title, content, imagePath]
    );
    await db.end();

    return NextResponse.json({
      success: true,
      message: "Gönderi eklendi",
      imagePath
    });

  } catch (error) {
    console.error("Gönderi ekleme hatası:", error);
    return NextResponse.json(
      { success: false, error: "Gönderi ekleme hatası" },
      { status: 500 }
    );
  }
}
