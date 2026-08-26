import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1767463130546-1e0bffcd906f?auto=format&fit=crop&w=1800&q=80";

const TEAM = [
  { name: "Марко Моев", role: "Развъдник и контакт" },
  { name: "Александър Несторов", role: "Грижа и отглеждане" },
];

export default function Contact() {
  return (
    <>
      <section className="relative min-h-[52svh] overflow-hidden bg-bg-deep text-foam">
        <img
          src={HERO_IMAGE}
          alt="Кокер шпаньол на тревиста земя"
          className="animate-fade absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/70 to-bg-deep/35" />
        <div className="relative z-10 mx-auto flex min-h-[52svh] max-w-6xl flex-col justify-end px-5 pb-12 pt-28 md:px-8 md:pb-16">
          <p className="animate-rise font-display text-5xl tracking-tight md:text-7xl">Кокчан</p>
          <h1 className="animate-rise-delay-1 mt-3 font-display text-2xl font-medium tracking-tight md:text-4xl">
            Контакт
          </h1>
          <p className="animate-rise-delay-2 mt-3 max-w-md text-foam/85">
            Свържете се с нас за кученца, наличност и въпроси около отглеждането.
          </p>
        </div>
      </section>

      <section className="site-grain">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <h2 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            Екипът на Кокчан
          </h2>
          <p className="mt-3 max-w-lg text-ink-soft">
            Хората зад развъдника — готови да ви помогнат да намерите подходящото кученце.
          </p>

          <ul className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
            {TEAM.map((member) => (
              <li
                key={member.name}
                className="flex flex-col gap-1 py-8 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <p className="font-display text-2xl tracking-tight text-ink md:text-3xl">
                  {member.name}
                </p>
                <p className="text-ink-soft md:text-right">{member.role}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 max-w-xl">
            <h3 className="font-display text-xl tracking-tight text-ink md:text-2xl">
              Как да ни намерите
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Пишете ни за предстоящи кучила, условия за осиновяване и срещи с кученцата. Ще ви
              отговорим възможно най-скоро.
            </p>
            <Link
              to="/"
              className="mt-8 inline-block bg-bg-deep px-6 py-3 text-sm font-medium text-foam transition-opacity hover:opacity-90"
            >
              Обратно към началото
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
