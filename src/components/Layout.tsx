import { Link, Outlet, useLocation } from "react-router-dom";

const navLinks = [
  { href: "/#za-nas", label: "За нас", hash: true },
  { href: "/#kuchentsa", label: "Кученца", hash: true },
  { href: "/kontakt", label: "Контакт", hash: false },
];

export default function Layout() {
  const { pathname } = useLocation();
  const isContact = pathname === "/kontakt";

  return (
    <div className="flex min-h-full flex-col antialiased">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
          <Link
            to="/"
            className="font-display text-2xl tracking-tight text-foam md:text-[1.75rem]"
          >
            Кокчан
          </Link>
          <nav aria-label="Основна навигация" className="flex items-center gap-5 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm text-foam/85 transition-colors hover:text-foam md:text-[0.95rem] ${
                  link.hash ? "hidden sm:inline" : ""
                } ${!link.hash && isContact ? "text-foam" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-bg-deep text-foam">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="font-display text-3xl tracking-tight">Кокчан</p>
            <p className="mt-2 max-w-sm text-foam/70">
              Развъдник за кокер шпаньоли с грижа, характер и верен домашен дух.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-foam/75 md:items-end">
            <Link to="/kontakt" className="transition-colors hover:text-foam">
              Свържете се с нас
            </Link>
            <p>© {new Date().getFullYear()} Кокчан</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
