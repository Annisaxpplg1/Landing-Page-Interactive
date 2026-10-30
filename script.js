
document.addEventListener("DOMContentLoaded", function () {

    // =========================================
    // 1. HERO SLIDER
    // =========================================

    const hero = document.querySelector(".hero");

    if (hero) {

        const images = Array.from(
            hero.querySelectorAll(".hero-image")
        );

        const label = hero.querySelector(".hero-label");
        const title = hero.querySelector(".hero-copy h1");
        const description = hero.querySelector(".hero-copy p");

        const dotsContainer = hero.querySelector(".hero-slider-dots");
        const nextButton = hero.querySelector(".hero-next");
        const prevButton = hero.querySelector(".hero-prev");

        const interval = Number(hero.dataset.interval) || 5000;

        let currentSlide = 0;
        let sliderTimer = null;

        if (images.length > 0) {

            // Buat titik navigasi
            images.forEach((image, index) => {

                const dot = document.createElement("button");

                dot.type = "button";
                dot.className = "hero-dot";

                dot.setAttribute(
                    "aria-label",
                    "Pilih gambar " + (index + 1)
                );

                dot.addEventListener("click", function () {
                    showSlide(index);
                    restartSlider();
                });

                dotsContainer.appendChild(dot);

            });

            const dots = dotsContainer.querySelectorAll(".hero-dot");


            // Fungsi mengganti gambar
            function showSlide(index) {

                currentSlide =
                    (index + images.length) % images.length;

                images.forEach((image, i) => {

                    image.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                });

                const activeImage = images[currentSlide];

                // Mengambil teks langsung dari HTML
                label.textContent =
                    activeImage.dataset.label || "";

                title.textContent =
                    activeImage.dataset.title || "";

                description.textContent =
                    activeImage.dataset.description || "";

                // Mengaktifkan titik navigasi
                dots.forEach((dot, i) => {

                    dot.classList.toggle(
                        "active",
                        i === currentSlide
                    );

                });

            }


            // Slide berikutnya
            function nextSlide() {
                showSlide(currentSlide + 1);
            }


            // Slide sebelumnya
            function previousSlide() {
                showSlide(currentSlide - 1);
            }


            // Timer otomatis
            function startSlider() {

                clearInterval(sliderTimer);

                if (images.length > 1) {

                    sliderTimer = setInterval(function () {

                        if (!document.hidden) {
                            nextSlide();
                        }

                    }, interval);

                }

            }


            // Reset timer setelah klik
            function restartSlider() {
                startSlider();
            }


            // Tombol kanan
            nextButton.addEventListener("click", function () {

                nextSlide();
                restartSlider();

            });


            // Tombol kiri
            prevButton.addEventListener("click", function () {

                previousSlide();
                restartSlider();

            });


            // Hentikan timer ketika tab tidak aktif
            document.addEventListener("visibilitychange", function () {

                if (document.hidden) {
                    clearInterval(sliderTimer);
                } else {
                    startSlider();
                }

            });


            // Jalankan gambar pertama
            showSlide(0);
            startSlider();

        }

    }


    // =========================================
    // 2. SCROLL REVEAL
    // =========================================

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    // =========================================
    // 3. NAVIGATION ACTIVE STATE
    // =========================================

    const sections = document.querySelectorAll(
        "#keunggulan, #destinasi, #peta, #pesanan"
    );

    const navLinks = document.querySelectorAll(
        ".hero-nav a"
    );

    if ("IntersectionObserver" in window) {

        const navObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + entry.target.id
                            ) {

                                link.classList.add("active");

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        sections.forEach(section => {
            navObserver.observe(section);
        });

    }


    // =========================================
    // 4. BACK TO TOP
    // =========================================

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                backToTop.classList.add("visible");

            } else {

                backToTop.classList.remove("visible");

            }

        }, { passive: true });


        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // =========================================
    // 5. PARALLAX SCROLLING
    // =========================================

    const parallaxItems = [

        {
            image: document.querySelector(".story-parallax img"),
            section: document.querySelector(".story"),
            speed: 0.12
        },

        {
            image: document.querySelector(".cta-parallax img"),
            section: document.querySelector(".cta"),
            speed: 0.16
        }

    ].filter(item => item.image && item.section);


    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (!reduceMotion) {

        let ticking = false;

        function updateParallax() {

            const windowHeight = window.innerHeight;

            parallaxItems.forEach(item => {

                const rect = item.section.getBoundingClientRect();

                const center = rect.top + rect.height / 2;

                const distance = windowHeight / 2 - center;

                const movement = distance * item.speed;

                item.image.style.transform =
                    `translate3d(0, ${movement}px, 0) scale(1.08)`;

            });

            ticking = false;

        }


        function requestParallax() {

            if (!ticking) {

                window.requestAnimationFrame(updateParallax);

                ticking = true;

            }

        }


        window.addEventListener(
            "scroll",
            requestParallax,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            requestParallax
        );

        updateParallax();

    }


    // =========================================
    // 6. DESTINATION CARD INTERACTION
    // =========================================

    document.querySelectorAll(".destination-card").forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.zIndex = "2";

        });

        card.addEventListener("mouseleave", function () {

            this.style.zIndex = "1";

        });

    });


    // =========================================
    // 7. MAP CARD INTERACTION
    // =========================================

    document.querySelectorAll(".map-card").forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.classList.add("map-active");

        });

        card.addEventListener("mouseleave", function () {

            this.classList.remove("map-active");

        });

    });


    // =========================================
    // 8. SMOOTH SCROLL
    // =========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =========================================
    // 9. CONSOLE
    // =========================================

    console.log(
        "%c LOKA BLITAR ",
        "background:#21472f;color:white;padding:12px;font-size:18px;font-weight:bold;"
    );

    console.log(
        "Website Loka Blitar berhasil dijalankan."
    );

});
