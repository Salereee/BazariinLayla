document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector(".site-header");
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const backdrop = document.querySelector(".mobile-backdrop");
    const closeMenuTriggers = document.querySelectorAll("[data-close-menu]");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");
    const allAnchors = document.querySelectorAll("a[href^='#']");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const openMenu = () => {
        if (!mobileMenu || !backdrop || !menuBtn) {
            return;
        }

        mobileMenu.classList.add("is-open");
        backdrop.classList.add("is-open");
        body.classList.add("menu-open");
        menuBtn.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
        if (!mobileMenu || !backdrop || !menuBtn) {
            return;
        }

        mobileMenu.classList.remove("is-open");
        backdrop.classList.remove("is-open");
        body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
    };

    if (menuBtn) {
        menuBtn.addEventListener("click", openMenu);
    }

    closeMenuTriggers.forEach((trigger) => {
        trigger.addEventListener("click", closeMenu);
    });

    mobileLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    allAnchors.forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            const offset = header ? header.offsetHeight + 10 : 90;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    });

    const revealElements = document.querySelectorAll(".reveal");

    revealElements.forEach((element, index) => {
        const delay = (index % 8) * 70;
        element.style.setProperty("--reveal-delay", delay + "ms");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        requestAnimationFrame(() => {
            revealElements.forEach((element) => element.classList.add("visible"));
        });
    }

    const sectionIds = ["hero", "productos", "destacados", "testimonios", "contacto"];
    const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter(Boolean);

    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === "#" + id;
            link.classList.toggle("is-active", isCurrent);
        });
    };

    if ("IntersectionObserver" in window && sections.length) {
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveLink(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-45% 0px -45% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => navObserver.observe(section));
    }

    const onScroll = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const currentYearNode = document.getElementById("current-year");
    if (currentYearNode) {
        currentYearNode.textContent = String(new Date().getFullYear());
    }

    setActiveLink("hero");
});
