import { Link } from "react-router-dom";

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1750924378381-3fbdfcdc67bb?auto=format&fit=crop&w=2400&q=80",
  about: "https://images.unsplash.com/photo-1759745063508-cb193519f3ae?auto=format&fit=crop&w=1600&q=80",
  puppies: "https://images.unsplash.com/photo-1754816969746-f660e23c56cb?auto=format&fit=crop&w=1600&q=80",
};

export default function Home() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-bg-deep text-foam">
        <img
          src={IMAGES.hero}
          alt="Кокер шпаньол на открито"
          className="animate-kenburns absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24">
          <p className="animate-rise font-display text-5xl leading-none tracking-tight text-foam sm:text-6xl md:text-8xl lg:text-9xl">
            Кокчан
          </p>
          <h1 className="animate-rise-delay-1 mt-5 max-w-xl font-display text-2xl font-medium leading-snug tracking-tight text-foam sm:text-3xl md:text-4xl">
            Развъдник за кокер шпаньоли
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-foam/85 md:text-lg">
            Отглеждаме кученца с весел характер, здрава линия и място в семейството още от
            първия ден.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link
              to="/kontakt"
              className="bg-copper px-6 py-3 text-sm font-medium text-foam transition-colors hover:bg-copper-deep md:text-base"
            >
              Свържете се с нас
            </Link>
            <a
              href="#za-nas"
              className="border border-foam/40 px-6 py-3 text-sm font-medium text-foam transition-colors hover:border-foam hover:bg-foam/10 md:text-base"
            >
              Научете повече
            </a>
          </div>
        </div>
      </section>

      <section id="za-nas" className="site-grain">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-ink md:text-5xl">За Кокчан</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft md:text-lg">
              Кокчан е дом за кокер шпаньоли — порода с мек поглед, жив темперамент и силна
              връзка с хората. Работим спокойно, с внимание към здравето, социализацията и
              характера на всяко кученце.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
            <img
              src={IMAGES.about}
              alt="Млад златист кокер шпаньол на трева"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section id="kuchentsa" className="bg-bg-mid text-foam">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div className="relative order-2 aspect-[5/4] overflow-hidden md:order-1">
            <img
              src={IMAGES.puppies}
              alt="Портрет на златист кокер шпаньол"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="font-display text-3xl tracking-tight md:text-5xl">Нашите кученца</h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foam/80 md:text-lg">
              Всяко кученце израства сред хора, с игри, грижа и ранно опознаване на света.
              Търсим подходящи семейства, които ще продължат тази връзка с любов и отговорност.
            </p>
            <Link
              to="/kontakt"
              className="mt-8 inline-block border border-gold-soft/50 px-6 py-3 text-sm font-medium text-gold-soft transition-colors hover:border-gold-soft hover:bg-gold-soft/10 md:text-base"
            >
              Попитайте за наличност
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-foam">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <h2 className="max-w-2xl font-display text-3xl tracking-tight text-ink md:text-5xl">
            Готови сте за нов член на семейството?
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
            Пишете ни — ще ви разкажем повече за линията, грижите и предстоящите кучила.
          </p>
          <Link
            to="/kontakt"
            className="mt-8 inline-block bg-bg-deep px-6 py-3 text-sm font-medium text-foam transition-opacity hover:opacity-90 md:text-base"
          >
            Към контакти
          </Link>
        </div>
      </section>
    </>
  );
}
