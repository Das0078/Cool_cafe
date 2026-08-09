import { Star } from "lucide-react";

const testimonials = [
  { name: "Rohan Sanghraika", initials: "RS", detail: "Customer · 2 months ago", quote: "Amazing food! Especially the Rava dosa, butter idli and cheese chilli mushroom pizza." },
  { name: "Nidhi Sharma", initials: "NS", detail: "Local Guide · 5 months ago", quote: "Beautiful location with a lovely ambience. The South Indian food is absolutely delicious, and for vegetarians it's truly a paradise." },
  { name: "Tanishq Halder", initials: "TH", detail: "Local Guide · 5 months ago", quote: "Rabindra tirtha type vibes. Excellent dosa, sambar n Vada, top top service." },
  { name: "Ria Mitra", initials: "RM", detail: "Customer · 7 months ago", quote: "Always the best option for South Indian food in Kolkata. Highly recommended!" },
] as const;

function TestimonialCard({ testimonial }: { testimonial: (typeof testimonials)[number] }) {
  return (
    <article className="flex min-h-[246px] w-[min(82vw,21.5rem)] flex-col rounded-[1.35rem] bg-[#422614] p-6 text-white shadow-[0_16px_35px_rgba(0,0,0,0.18)] sm:min-h-[258px] sm:w-[25rem] sm:p-7 lg:w-[28rem]">
      <header className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#b98058] text-sm font-extrabold text-[#fff8f2]">{testimonial.initials}</span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold sm:text-lg">{testimonial.name}</h3>
          <p className="mt-0.5 text-xs text-white/60 sm:text-sm">{testimonial.detail}</p>
        </div>
      </header>

      <div className="mt-5 flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" size={20} fill="#f5a40d" strokeWidth={0} className="text-[#f5a40d]" />)}
      </div>

      <p className="mt-5 text-[0.95rem] font-medium leading-relaxed text-white/90 sm:text-base">{testimonial.quote}</p>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="overflow-hidden bg-[#110a06] py-16 text-white sm:py-20 md:py-24">
      <div className="px-6 text-center sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b79d8b] sm:text-sm">Guest notes</p>
        <h2 id="testimonials-heading" className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl md:text-5xl">Loved by our guests</h2>
      </div>

      <div className="testimonial-marquee mt-9 sm:mt-11" aria-label="Customer testimonials">
        <div className="testimonial-marquee-track">
          {[false, true].map((isDuplicate) => (
            <div key={String(isDuplicate)} className="testimonial-marquee-group" aria-hidden={isDuplicate || undefined}>
              {testimonials.map((testimonial) => <TestimonialCard key={`${isDuplicate}-${testimonial.initials}`} testimonial={testimonial} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
