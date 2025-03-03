"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Başlık ve içerik boş olamaz!");
      return;
    }

    try {
      const response = await fetch("/api/pst/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert("Başarıyla kaydedildi!");
        setTitle("");
        setContent("");
      } else {
        alert("Kayıt başarısız!");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      {/* Başlık */}
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-3"
      />

      {/* TinyMCE Editör */}
      <Editor
        apiKey="your-api-key"  
        value={content}
        onEditorChange={(newContent) => setContent(newContent)}
        init={{
          height: 400,
          menubar: true,
          plugins: "image media table lists advlist code",
          toolbar:
            "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | image media table code",
          automatic_uploads: true,
        }}
      />

      {/* Kaydet Butonu */}
      <button
        onClick={handleSave}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Kaydet
      </button>
    </div>
  );
};

export default TinyMCEEditor;
