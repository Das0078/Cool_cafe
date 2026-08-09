"use client";

import Image from "next/image";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import chef from "@/assets/chef_png.png";
import pattern from "@/assets/svg_bg.png";

const contactLinks = [
  {
    label: "Instagram",
    value: "cool@cafe",
    href: "https://www.instagram.com/",
    icon: Instagram,
    iconClassName: "text-[#ff914d]",
    valueClassName: "text-[#d70867]",
  },
  {
    label: "WhatsApp",
    value: "+918877664455",
    href: "https://wa.me/918877664455",
    icon: Phone,
    iconClassName: "text-[#ff914d]",
    valueClassName: "text-[#23bd21]",
  },
  {
    label: "Email",
    value: "coolcafe@gmail.com",
    href: "mailto:coolcafe@gmail.com",
    icon: Mail,
    iconClassName: "text-[#ff914d]",
    valueClassName: "text-[#d70867]",
  },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, delay: 0.24 + index * 0.2, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-visible bg-[#110a06]">
      <div className="relative overflow-hidden bg-[#ff8b48] px-5 py-16 sm:px-8 sm:py-20 md:min-h-[650px] md:px-[7vw] md:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-repeat opacity-45"
          style={{ backgroundImage: `url(${pattern.src})`, backgroundSize: "min(38vw, 520px) auto" }}
        />

        <h2 id="contact-heading" className="sr-only">Contact Cafe Cool</h2>

        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-7 md:grid-cols-[minmax(0,1fr)_minmax(18rem,25rem)] md:gap-12">
          <motion.a
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            href="https://www.google.com/maps/search/?api=1&query=Cafe+Cool+Kolkata"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Cafe Cool location in Google Maps"
            className="group relative block h-[230px] overflow-hidden rounded-[1.25rem] border border-[#110a06]/20 bg-[#2c1a0e] shadow-[0_14px_25px_rgba(72,31,8,0.18)] sm:h-[300px] md:h-[390px]"
          >
            <iframe
              title="Cafe Cool location map"
              src="https://www.google.com/maps?q=Cafe+Cool+Kolkata&output=embed"
              loading="lazy"
              className="pointer-events-none h-full w-full border-0 grayscale transition duration-500 group-hover:grayscale-0"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-[#110a06]/90 px-3 py-1.5 text-xs font-semibold text-white shadow-lg sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
              Open in Google Maps
            </span>
          </motion.a>

          <div className="mx-auto flex w-full max-w-[25rem] flex-col gap-4 md:mx-0 md:gap-5">
            {contactLinks.map(({ label, value, href, icon: Icon, iconClassName, valueClassName }, index) => (
              <motion.a
                key={label}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`${label}: ${value}`}
                className="group flex min-h-[78px] items-center gap-3 rounded-[1rem] bg-[#110a06] px-4 py-3 shadow-[0_14px_25px_rgba(72,31,8,0.18)] transition-transform duration-300 hover:-translate-y-1 sm:min-h-[86px] sm:gap-5 sm:px-5"
              >
                <Icon aria-hidden="true" strokeWidth={2.6} className={`h-9 w-9 shrink-0 sm:h-11 sm:w-11 ${iconClassName}`} />
                <span className={`min-w-0 break-words text-[clamp(1.3rem,3.2vw,2rem)] font-extrabold tracking-[-0.055em] ${valueClassName}`}>
                  {value}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative min-h-[158px] overflow-visible bg-[#110a06] px-6 py-10 sm:min-h-[175px] md:px-[12vw] md:py-12">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-repeat opacity-35"
          style={{ backgroundImage: `url(${pattern.src})`, backgroundSize: "min(32vw, 420px) auto" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex items-center justify-center gap-2 pr-20 text-center text-[clamp(1.7rem,4vw,2.55rem)] font-extrabold tracking-[-0.045em] text-[#ff8b48] sm:pr-32"
        >
          <span>Find your perfect dish here</span>
          <MapPin aria-hidden="true" fill="currentColor" className="h-9 w-9 shrink-0 sm:h-11 sm:w-11" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.05, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-0 right-1 z-30 w-[112px] sm:right-[4vw] sm:w-[188px] md:right-[6vw] md:w-[236px]"
        >
          <Image src={chef} alt="" aria-hidden="true" priority={false} className="h-[16.5vh] md:h-[35vh] z-[99] w-full" />
        </motion.div>
      </div>

    </section>
  );
}
