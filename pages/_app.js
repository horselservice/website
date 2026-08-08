import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "../styles/global.css";
import styles from "../styles/header.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PriceProvider } from "../context/priceContext";
import CustomerTypeToggle from "../components/customerTypeToggle/customerTypeToggle";
import Logo from "../components/logo/logo";

const navItems = [
  { href: "/about", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

const productItems = [
  { href: "/passiva-horselskydd", label: "Passiva hörselskydd" },
  { href: "/bluetooth-horselskydd", label: "Aktiva hörselskydd" },
  { href: "/ljudutjamningssystem", label: "Ljudutjämningssystem" },
];

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const isAdminRoute = router.pathname.startsWith("/admin");

  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const closeMenus = () => {
    setIsOpen(false);
    setIsProductsOpen(false);
  };

  useEffect(() => {
    closeMenus();
  }, [router.asPath]);

  if (isAdminRoute) {
    return (
      <>
        <ToastContainer />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <PriceProvider>
      <div>
        <header className={styles.shell}>
          <div className={styles.inner}>
            <Link
              href="/"
              className={styles.brand}
              aria-label="Hörselservice startsida"
              onClick={closeMenus}
            >
              <Logo />
            </Link>

            <nav className={styles.desktopNav} aria-label="Huvudnavigation">
              <div
                className={styles.dropdown}
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <Link
                  href="/produkter"
                  className={styles.dropdownTrigger}
                  onFocus={() => setIsProductsOpen(true)}
                  onClick={closeMenus}
                  aria-expanded={isProductsOpen}
                  aria-haspopup="true"
                >
                  Produkter
                </Link>

                {isProductsOpen ? (
                  <div className={styles.dropdownMenu}>
                    {productItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMenus}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>

              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenus}>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className={styles.right}>
              <CustomerTypeToggle />

              <button
                type="button"
                className={styles.menuButton}
                onClick={() => setIsOpen((value) => !value)}
                aria-expanded={isOpen}
                aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
              >
                ☰
              </button>
            </div>
          </div>

          {isOpen ? (
            <div className={styles.mobilePanel}>
              <nav className={styles.mobileNav} aria-label="Mobilnavigation">
                <Link href="/produkter" onClick={closeMenus}>
                  Produkter
                </Link>

                {productItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenus}>
                    {item.label}
                  </Link>
                ))}

                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenus}>
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className={styles.mobileToggle}>
                <CustomerTypeToggle />
              </div>
            </div>
          ) : null}
        </header>

        <ToastContainer />
        <Component {...pageProps} />

        <footer className={styles.footer}>
          <strong>Hörselservice i Kronoberg</strong>
          <span>
            Formgjutna hörselskydd, aktiva hörselskydd och ljudutjämningssystem.
          </span>
        </footer>
      </div>
    </PriceProvider>
  );
}
