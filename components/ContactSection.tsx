"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import pattern from "@/assets/svg_bg.png";
import CurvedLoop from "@/components/CurvedLoop";

/* ─── social icons for the marquee ─── */
const socialIcons = [
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com/" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/" },
  { icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/918877664455" },
  { icon: FaEnvelope, label: "Email", href: "mailto:coolcafe@gmail.com" },
];

/* ─── contact card data ─── */
const contactInfo = {
  image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop&q=80",
  heading: "Good food, Good mood",
  subheading: "Kolkata, West Bengal",
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-visible bg-[#110a06]"
    >
      <div
        className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-[7vw] md:py-24"
        style={{
          background:
            "linear-gradient(160deg, rgb(226, 97, 104) 0%, rgb(242, 156, 87))",
        }}
      >
        {/* pattern overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-repeat opacity-45"
          style={{
            backgroundImage: `url(${pattern.src})`,
            backgroundSize: "min(38vw, 520px) auto",
          }}
        />

        <h2 id="contact-heading" className="sr-only">
          Contact Cafe Cool
        </h2>

        {/* ── CURVED MARQUEE TEXT (behind card) ── */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 z-[1] -translate-y-1/2 opacity-20"
        >
          <CurvedLoop
            marqueeText="✦  cafe cool  ✦   since 2022  ✦   we pride at  ✦   what we serve"
            speed={2}
            curveAmount={-60}
            direction="right"
            interactive={false}
            className="fill-[#110a06] tracking-[0.2em] text-[5rem]"
          />
        </div>

        {/* ── CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="contact-card relative z-10 mx-auto flex w-full max-w-[420px] flex-col overflow-hidden rounded-[1.5rem] bg-[#110a06]/90 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-sm md:max-w-3xl"
        >
          {/* ── TOP: coral info area ── */}
          <div
            className="relative flex items-center gap-4 px-5 py-5 sm:gap-5 sm:px-7 sm:py-6 md:px-8 md:py-7"
            style={{
              background:
                "linear-gradient(135deg, #e26168 0%, #f29c57 100%)",
            }}
          >
            {/* rounded profile image */}
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#110a06]/30 shadow-lg sm:h-16 sm:w-16 md:h-[72px] md:w-[72px] md:rounded-2xl">
              <img
                src={contactInfo.image}
                alt="Cafe Cool"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* text lines */}
            <div className="flex min-w-0 flex-col gap-1">
              <span className="truncate text-lg font-extrabold tracking-tight text-[#110a06] sm:text-xl md:text-2xl">
                {contactInfo.heading}
              </span>
              <span className="truncate text-sm font-semibold text-[#110a06]/70 sm:text-base">
                {contactInfo.subheading}
              </span>
            </div>
          </div>

          {/* ── MIDDLE: Google Maps ── */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Cafe+Cool+Kolkata"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Cafe Cool location in Google Maps"
            className="group relative block flex-1"
          >
            <div className="contact-map-container relative h-full overflow-hidden">
              <iframe
                title="Cafe Cool location map"
                src="https://www.google.com/maps?q=Cafe+Cool+Kolkata&output=embed"
                loading="lazy"
                className="pointer-events-none h-full w-full border-0 grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[#110a06]/85 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#e26168] sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
                Open in Google Maps
              </span>
            </div>
          </a>

          {/* ── BOTTOM: Social icons marquee ── */}
          <div className="social-marquee-wrapper relative overflow-hidden border-t border-white/5 px-0 py-4 sm:py-5">
            {/* fade edges */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            />

            {/* marquee track */}
            <div className="social-marquee-track flex w-max">
              {/* duplicate set for seamless loop */}
              {[0, 1].map((setIdx) => (
                <div
                  key={setIdx}
                  className="social-marquee-group flex items-center"
                >
                  {socialIcons.map(({ icon: Icon, label, href }) => (
                    <a
                      key={`${setIdx}-${label}`}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="group/icon mx-4 flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:scale-110 sm:mx-5"
                    >
                      <Icon className="h-6 w-6 text-[#e26168] transition-colors duration-300 group-hover/icon:text-[#f29c57] sm:h-7 sm:w-7" />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
