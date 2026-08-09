import { AboutCarousel } from "./AboutCarousel";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-[#F9B637] py-16 text-[#110a06] sm:py-20 md:py-24"
    >
      <div className="about-section-heading">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#110a06]/60 sm:text-sm">
          Cafe Cool, since 2022
        </p>
        <h2
          id="about-heading"
          className="max-w-3xl text-4xl font-medium tracking-[-0.055em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Get to know us
        </h2>
      </div>

      <AboutCarousel />
    </section>
  );
}
