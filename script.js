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
    const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

    const syncHeaderOffset = () => {
        if (!header) {
            return;
        }

        const headerHeight = Math.ceil(header.getBoundingClientRect().height);
        const safeHeaderHeight = headerHeight + 14;
        document.documentElement.style.setProperty("--header-offset", safeHeaderHeight + "px");
    };

    const openMenu = () => {
        if (!mobileMenu || !backdrop || !menuBtn) {
            return;
        }

        mobileMenu.classList.add("is-open");
        backdrop.classList.add("is-open");
        body.classList.add("menu-open");
        menuBtn.setAttribute("aria-expanded", "true");
        syncHeaderOffset();
    };

    const closeMenu = () => {
        if (!mobileMenu || !backdrop || !menuBtn) {
            return;
        }

        mobileMenu.classList.remove("is-open");
        backdrop.classList.remove("is-open");
        body.classList.remove("menu-open");
        menuBtn.setAttribute("aria-expanded", "false");
        syncHeaderOffset();
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

    if (hasGSAP && !prefersReducedMotion) {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });

        gsap.from(".site-header", {
            y: -56,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out"
        });

        const revealGroups = [
            {
                trigger: "#hero",
                targets: [".hero-copy > *", ".hero-visual"]
            },
            {
                trigger: "#productos",
                targets: ["#productos .section-heading", "#productos .producto-card", "#productos .cta-strip"]
            },
            {
                trigger: "#como-comprar",
                targets: ["#como-comprar .section-heading", "#como-comprar .step-card"]
            },
            {
                trigger: "#destacados",
                targets: ["#destacados .section-heading", "#destacados .destacado-item"]
            },
            {
                trigger: "#testimonios",
                targets: ["#testimonios .section-heading", "#testimonios .testimonio-item"]
            },
            {
                trigger: "#contacto",
                targets: ["#contacto .contacto-panel", "#contacto .horario-atencion"]
            }
        ];

        revealGroups.forEach((group) => {
            const targetElements = gsap.utils.toArray(group.targets.join(", "));

            if (!targetElements.length) {
                return;
            }

            gsap.set(targetElements, {
                autoAlpha: 0,
                y: 38
            });

            gsap.to(targetElements, {
                autoAlpha: 1,
                y: 0,
                duration: 1.05,
                ease: "power3.out",
                stagger: {
                    each: 0.12,
                    from: "start"
                },
                overwrite: "auto",
                scrollTrigger: {
                    trigger: group.trigger,
                    start: "top 82%",
                    once: true
                }
            });
        });

        const isDesktop = window.matchMedia("(min-width: 821px)").matches;

        if (isDesktop) {
            gsap.to(".hero-logo-card", {
                y: -10,
                duration: 3.6,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            gsap.to(".ornament-a", {
                x: -18,
                y: 18,
                duration: 8,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            gsap.to(".ornament-b", {
                x: 14,
                y: -14,
                duration: 9.2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        }

        const highlightCards = gsap.utils.toArray(".producto-card, .step-card, .destacado-item, .testimonio-item");
        highlightCards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    rotateX: -2,
                    rotateY: 2,
                    transformPerspective: 900,
                    duration: 0.32,
                    ease: "power3.out"
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.38,
                    ease: "power3.out"
                });
            });
        });

        const ctaStrip = document.querySelector(".cta-strip");
        if (ctaStrip) {
            gsap.fromTo(
                ctaStrip,
                { boxShadow: "0 10px 30px rgba(20, 20, 20, 0.08)" },
                {
                    boxShadow: "0 24px 55px rgba(221, 105, 155, 0.25)",
                    duration: 2.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );
        }
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
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
        document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncHeaderOffset, { passive: true });
    window.addEventListener("orientationchange", syncHeaderOffset, { passive: true });
    window.addEventListener("load", syncHeaderOffset, { passive: true });
    onScroll();
    syncHeaderOffset();

    if (!prefersReducedMotion) {
        const clickableElements = document.querySelectorAll(".btn, .mobile-menu-btn, .mobile-menu-close, .mobile-nav-link");
        clickableElements.forEach((element) => {
            element.addEventListener("pointerdown", () => element.classList.add("is-pressed"));
            const release = () => element.classList.remove("is-pressed");
            element.addEventListener("pointerup", release);
            element.addEventListener("pointerleave", release);
            element.addEventListener("blur", release);
        });
    }

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(syncHeaderOffset);
    }

    const currentYearNode = document.getElementById("current-year");
    if (currentYearNode) {
        currentYearNode.textContent = String(new Date().getFullYear());
    }

    setActiveLink("hero");
});
