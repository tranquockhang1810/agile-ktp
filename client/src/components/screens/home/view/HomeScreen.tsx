"use client";

import { useAuth } from "@/context/auth/useAuth";
import SwiperCard from "../component/swiper"; 

const Home = () => {
  const { user } = useAuth(); 

  return (
    <div>
      <div className="p-6"> 
        {user ? (
          <p className="mt-4">Xin chào, {user.name}! </p>
        ) : (
          <p className="mt-4">Bạn chưa đăng nhập. Vui lòng đăng nhập để muua hàng</p>
        )}
      </div>
      <SwiperCard />
    </div>
  );
};

export default Home;