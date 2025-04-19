import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";

const SwiperCard = () => {

  return (
    <div className="bg-blue-100 flex">
    {/* LEFT: Text section */}
    <div className=" py-12 px-6 flex-1">
      <h2 className="text-5xl font-bold leading-snug text-black">
        Mua Sách Với <span className="text-blue-700">Giá Tốt Nhất</span>
      </h2>
      <p className="text-gray-700 mt-4">
        Khám phá bộ sưu tập sách phong phú từ các thể loại khác nhau, từ văn học, kinh doanh đến sách thiếu nhi.
        Mua sách với chất lượng đảm bảo và giao hàng tận nơi. Tìm ngay cuốn sách bạn yêu thích!
      </p>
    </div>
  
    {/* RIGHT: Swiper section */}
    <div className="flex-1 flex justify-center items-center py-12 px-6">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        style={{ width: "300px", height: "400px" }}
      >
        <SwiperSlide>
          <img src="/image/Aneyeforaneye.jpg" alt="Aneyeforaneye" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/Madwomen.jpg" alt="Madwomen" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/The intelligent.jpg" alt="The intelligent" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/The golden road.jpg" alt="The golden road" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/image/The bookshop women.jpg" alt="The bookshop women" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
  
  );
};

export default SwiperCard;

const styles = {
  swiper: {
    width: 240,
    height: 320,
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    color: "#fff",
  },
  slideText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  
};
