import Image, { type StaticImageData } from "next/image";

type AboutCardProps = {
  image: StaticImageData;
  title: string;
};

export function AboutCard({ image, title }: AboutCardProps) {
  return (
    <article className="group relative h-[320px] w-[280px] overflow-hidden rounded-[1.8rem] bg-black shadow-[0_18px_35px_rgba(17,10,6,0.2)] sm:h-[366px] sm:w-[320px] sm:rounded-[2rem] md:h-[400px] md:w-[350px]">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 639px) 280px, (max-width: 767px) 320px, 350px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      />
    </article>
  );
}
