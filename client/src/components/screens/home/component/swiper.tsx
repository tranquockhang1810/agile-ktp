import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const SwiperCard = () => {
  return (
    <div className="flex">
      {/* LEFT: Text section */}
      <div className=" py-12 px-6 flex-1">
        <h2 className="text-5xl font-bold leading-snug text-black">
          Mua Sách Với <span className="text-blue-700">Giá Tốt Nhất</span>
        </h2>
        <p className="text-gray-700 mt-4">
          Khám phá bộ sưu tập sách phong phú từ các thể loại khác nhau, từ văn
          học, kinh doanh đến sách thiếu nhi. Mua sách với chất lượng đảm bảo và
          giao hàng tận nơi. Tìm ngay cuốn sách bạn yêu thích!
        </p>
      </div>

      {/* RIGHT: Swiper section */}
      <div className="flex-1 flex justify-center items-center py-12 px-6">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          style={{ width: "280px", height: "350px" }}
        >
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide1.jpg')` }}
          />
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide2.jpg')` }}
          />{" "}
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide3.jpg')` }}
          />{" "}
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide4.jpg')` }}
          />{" "}
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide5.jpg')` }}
          />{" "}
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide6.jpg')` }}
          />{" "}
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide7.jpg')` }}
          />{" "}
          <SwiperSlide
            className="w-[280px] h-[350px] rounded-xl shadow-xl bg-cover bg-center  border-white"
            style={{ backgroundImage: `url('/image/slide8.jpg')` }}
          />
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperCard;
