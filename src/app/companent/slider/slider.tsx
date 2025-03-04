"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
// Add type declaration if still needed
declare module 'react-slick';
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Post {
  id: number;
  title: string;
  content: string;
  img: string;
  created_at: string;
}

export default function BlogSlider() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/pst/pst4")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Slider {...settings}>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
                <p className="text-gray-600 line-clamp-3 mt-2">{post.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
}
