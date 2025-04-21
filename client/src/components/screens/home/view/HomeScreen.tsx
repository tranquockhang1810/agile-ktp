"use client";

import { useAuth } from "@/context/auth/useAuth"; 
import SwiperCard from "../component/swiper";
import { useEffect } from "react";
const Home = () => {
  const { user } = useAuth();  
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);
  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Chào mừng đến với Trang chủ!</h1>
        {user ? (
          <p className="mt-4">Xin chào, {user.name}! Đây là thông tin của bạn:</p>
        ) : (
          <p className="mt-4">Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin.</p>
        )}
      </div>
      <SwiperCard />
    </div>
  );
};

export default Home;