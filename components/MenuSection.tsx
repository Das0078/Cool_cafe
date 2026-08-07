"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const menuItems = [
  {
    id: "pasta",
    eyebrow: "A little indulgence",
    title: "Truffle pasta",
    description:
      "Silky tagliatelle folded through a creamy truffle sauce, wild mushrooms and a snowfall of parmesan.",
    price: "₹485",
    image: "/assets/menu/truffle-pasta.png",
    background: "#d9d0f5",
    cardBackground: "#c9bce9",
    ink: "#2e2340",
  },
  {
    id: "burger",
    eyebrow: "Big flavour energy",
    title: "Korean crunch burger",
    description:
      "A shatter-crisp chicken fillet with gochujang glaze, pickles and fresh lettuce in a pillowy brioche bun.",
    price: "₹395",
    image: "/assets/menu/korean-chicken-burger.png",
    background: "#f3c6b6",
    cardBackground: "#edb09c",
    ink: "#4c241a",
  },
  {
    id: "tiramisu",
    eyebrow: "Save room for this",
    title: "Cloud tiramisu",
    description:
      "Velvety mascarpone, espresso-soaked sponge and cocoa in a soft, spoonable little cloud.",
    price: "₹285",
    image: "/assets/menu/tiramisu.png",
    background: "#f3d2ca",
    cardBackground: "#edb9ae",
    ink: "#562c27",
  },
  {
    id: "ramen",
    eyebrow: "Warm things up",
    title: "Spicy veggie ramen",
    description:
      "Slow-simmered chilli broth, noodles, garden greens and a jammy egg with a warming kick.",
    price: "₹365",
    image: "/assets/menu/spicy-ramen.png",
    background: "#bfd9c2",
    cardBackground: "#a9cba9",
    ink: "#173a25",
  },
  {
    id: "matcha",
    eyebrow: "Cool by nature",
    title: "Berry matcha float",
    description:
      "Iced matcha, strawberry milk and cream stacked in bright, dreamy layers for an easy pick-me-up.",
    price: "₹245",
    image: "/assets/menu/berry-matcha.png",
    background: "#d2e2c2",
    cardBackground: "#bfd3ab",
    ink: "#254121",
  },
] as const;

// Keep enough cards in the source track for the widest breakpoint to loop without
// ever revealing an empty end of the carousel.
const sliderItems = Array.from({ length: 3 }, (_, groupIndex) =>
  menuItems.map((item) => ({
    item,
    key: `${item.id}-${groupIndex}`,
  })),
).flat();

export default function MenuSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [hoveredSlideIndex, setHoveredSlideIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const activeIndex = activeSlideIndex % menuItems.length;
  const activeItem = menuItems[activeIndex];

  useEffect(() => {
    const autoplay = swiperRef.current?.autoplay;

    if (hoveredSlideIndex === activeSlideIndex) {
      autoplay?.stop();
    } else {
      autoplay?.start();
    }
  }, [activeSlideIndex, hoveredSlideIndex]);

  const selectItem = (slideIndex: number) => {
    swiperRef.current?.slideToLoop(slideIndex);
  };

  return (
    <section
      id="menu"
      aria-label="Cafe Cool menu"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#d9d0f5] px-4 pb-7 pt-24 sm:px-7 md:px-12 md:pb-10 md:pt-28"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={activeItem.id}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.52, ease: "easeInOut" }}
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: activeItem.background }}
        />
      </AnimatePresence>

      <div className="mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-6xl flex-col justify-between gap-8">
        <div className="grid flex-1 items-center gap-1 md:grid-cols-[minmax(0,0.95fr)_minmax(340px,1.05fr)] md:gap-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`copy-${activeItem.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="relative z-10 max-w-lg pt-2 md:pt-0"
              style={{ color: activeItem.ink }}
            >
              <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.2em] opacity-65 md:mb-5">
                {activeItem.eyebrow}
              </p>
              <h2 className="max-w-md font-oswald text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.035em] sm:text-6xl md:text-6xl">
                {activeItem.title}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 opacity-80 md:mt-6 md:text-base md:leading-7">
                {activeItem.description}
              </p>
              <div className="mt-5 inline-flex items-center rounded-full border border-current/20 bg-white/25 px-4 py-2.5 text-sm font-bold backdrop-blur-md md:mt-8">
                {activeItem.price}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`image-${activeItem.id}`}
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.06, rotate: 2 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto flex h-[25svh] min-h-[190px] w-full max-w-md items-center justify-center md:h-[46svh] md:max-w-xl"
            >
              <div className="absolute h-[78%] w-[78%] rounded-full bg-white/25 blur-3xl" />
              <motion.img
                src={activeItem.image}
                alt={activeItem.title}
                draggable={false}
                className="relative z-10 h-[112%] w-[112%] object-contain drop-shadow-[0_24px_24px_rgba(47,32,26,0.19)] md:h-full md:w-full"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-20 -mx-4 pb-1 sm:-mx-7 md:-mx-12">
          <Swiper
            modules={[Autoplay]}
            loop
            loopAdditionalSlides={menuItems.length}
            speed={700}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
            spaceBetween={12}
            slidesPerView={1.35}
            centeredSlides
            breakpoints={{
              480: { slidesPerView: 1.85, spaceBetween: 14 },
              640: { slidesPerView: 2.55, spaceBetween: 16 },
              1024: { slidesPerView: 3.45, spaceBetween: 18 },
              1280: { slidesPerView: 4.15, spaceBetween: 20 },
            }}
            className="!overflow-visible !px-4 sm:!px-7 md:!px-12"
          >
            {sliderItems.map(({ item, key }, slideIndex) => {
              const isActive = slideIndex === activeSlideIndex;

              return (
                <SwiperSlide key={key} className="!h-auto">
                  <button
                    type="button"
                    onClick={() => selectItem(slideIndex)}
                    onMouseEnter={() => setHoveredSlideIndex(slideIndex)}
                    onMouseLeave={() =>
                      setHoveredSlideIndex((currentSlideIndex) =>
                        currentSlideIndex === slideIndex ? null : currentSlideIndex,
                      )
                    }
                    aria-label={`View ${item.title}`}
                    aria-pressed={isActive}
                    className="group relative flex h-[122px] w-full items-center overflow-hidden rounded-[1.65rem] border border-white/55 p-3 text-left shadow-[0_14px_32px_rgba(45,31,30,0.12)] backdrop-blur-2xl transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current sm:h-[146px] sm:rounded-[2rem] sm:p-4"
                    style={{
                      backgroundColor: "#582f0e",
                      transform: isActive ? "translateY(-8px)" : "translateY(0)",
                    }}
                  >
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="relative z-10 h-full w-[47%] object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between self-stretch py-1 pl-1">
                      <p className="line-clamp-2 font-oswald text-lg font-semibold uppercase leading-[0.92] tracking-[-0.025em] text-white sm:text-xl">
                        {item.title}
                      </p>
                      <span className="w-fit rounded-full bg-white/55 px-2.5 py-1 text-xs font-bold text-[#582f0e] backdrop-blur-md">
                        {item.price}
                      </span>
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* <div className='border-2 border-red-500 h-[400px] w-[350px]'>hello</div> */}
      </div>
    </section>+---
  );
}
