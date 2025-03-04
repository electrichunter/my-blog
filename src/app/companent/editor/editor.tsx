"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Başlık ve içerik boş olamaz!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      fetch("/api/pst/post", { method: "POST", body: formData });
      const response = await fetch("/api/pst/post", {

        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Başarıyla kaydedildi!");
        setTitle("");
        setContent("");
        setCoverImage(null);
        setPreview("");
      } else {
        alert(`Hata: ${result.error}`);
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

      {/* Kapak Resmi Yükleme */}
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />
      {preview && <img src={preview} alt="Kapak Resmi" className="mb-3 w-full h-48 object-cover rounded" />}

      {/* TinyMCE Editör */}
      <Editor
        apiKey="nvjiyfnc9gle051eoekjdgige6gnrnj23vp6gwlfg7nkr01g"
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
