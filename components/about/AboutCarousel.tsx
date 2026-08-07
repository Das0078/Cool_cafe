"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AboutCard } from "./AboutCard";
import { aboutCards } from "./aboutCards";

export function AboutCarousel() {
  const sliderRef = useRef<SwiperType | null>(null);

  const move = (direction: "next" | "previous") => {
    if (direction === "next") {
      sliderRef.current?.slideNext();
      return;
    }

    sliderRef.current?.slidePrev();
  };

  return (
    <div className="mt-9 overflow-hidden sm:mt-11">
      <Swiper
        modules={[A11y, Autoplay]}
        onSwiper={(swiper) => {
          sliderRef.current = swiper;
        }}
        loop
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView="auto"
        spaceBetween={16}
        grabCursor
        a11y={{
          prevSlideMessage: "Show the previous Cafe Cool story",
          nextSlideMessage: "Show the next Cafe Cool story",
        }}
        breakpoints={{
          640: { spaceBetween: 20 },
          768: { spaceBetween: 24 },
        }}
        className="about-card-slider !overflow-visible"
      >
        {aboutCards.map((card) => (
          <SwiperSlide key={card.id} className="!w-auto">
            <AboutCard image={card.image} title={card.title} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="about-card-controls">
        <button
          type="button"
          onClick={() => move("previous")}
          aria-label="Show previous card"
          className="about-card-control"
        >
          <ChevronLeft aria-hidden="true" size={28} strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={() => move("next")}
          aria-label="Show next card"
          className="about-card-control"
        >
          <ChevronRight aria-hidden="true" size={28} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
