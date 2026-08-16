import slide1Background from '@/assets/backgrounds/SLIDE1.png';
import slide2Background from '@/assets/backgrounds/SLIDE2.png';
import slide3Background from '@/assets/backgrounds/SLIDE3.png';

export const slides = [
  {
    id: 1,
    background: slide1Background,
    title: "COFFEE",
    mainImg: "/assets/Coffee_png.png",
    floatingImg: "/assets/Floating_coffee_beans.png",
    imageClass: "w-[60vw] md:w-[35vw] max-w-[500px]"
  },
  {
    id: 2,
    background: slide2Background,
    title: "BURGER",
    mainImg: "/assets/Burger_png.png",
    floatingImg: "/assets/Floating_french_fries.png",
    imageClass: "mt-25 w-[85vw] md:w-[55vw] max-w-[800px]"
  },
  {
    id: 3,
    background: slide3Background,
    title: "MOMO",
    mainImg: "/assets/Momo_png.png",
    floatingImg: "/assets/Floating_momo.png",
    imageClass: "mt-25 w-[90vw] md:w-[60vw] max-w-[800px]"
  }
];

export const heroImages: string[] = slides.flatMap((slide) => [
  slide.background.src,
  slide.mainImg,
  slide.floatingImg,
]);