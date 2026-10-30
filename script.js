
document.addEventListener("DOMContentLoaded", function () {


    // =========================================
    // 1. SCROLL REVEAL ANIMATION
    // =========================================

    const revealElements = document.querySelectorAll(
        ".story, .iconic-row, .destination-card, .map-card, .review-card, .cta-content"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


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



    // =========================================
    // 2. ACTIVE NAVIGATION
    // =========================================

    const sections = document.querySelectorAll(
        "#keunggulan, #destinasi, #peta, #pesanan"
    );

    const navLinks = document.querySelectorAll(
        ".hero-nav a"
    );


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
            threshold: 0.25
        }

    );


    sections.forEach(section => {
        navObserver.observe(section);
    });



    // =========================================
    // 3. BACK TO TOP BUTTON
    // =========================================

    const backToTop = document.getElementById("backToTop");


    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            backToTop.classList.add("visible");

        } else {

            backToTop.classList.remove("visible");

        }

    }, {
        passive: true
    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });



    // =========================================
    // 4. PARALLAX SCROLLING
    // =========================================

    const parallaxItems = [

        {
            element: document.querySelector(".hero-reference"),
            section: document.querySelector(".hero"),
            speed: 0.25
        },

        {
            element: document.querySelector(".story-parallax img"),
            section: document.querySelector(".story"),
            speed: 0.12
        },

        {
            element: document.querySelector(".cta-parallax img"),
            section: document.querySelector(".cta"),
            speed: 0.16
        }

    ].filter(item => item.element && item.section);


    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (!reduceMotion) {

        let parallaxRunning = false;


        function updateParallax() {

            const windowHeight = window.innerHeight;


            parallaxItems.forEach(item => {

                const rect = item.section.getBoundingClientRect();

                const sectionCenter =
                    rect.top + rect.height / 2;

                const distance =
                    windowHeight / 2 - sectionCenter;

                const movement =
                    distance * item.speed;


                item.element.style.transform =
                    `translate3d(0, ${movement}px, 0) scale(1.08)`;

            });


            parallaxRunning = false;

        }


        function requestParallax() {

            if (!parallaxRunning) {

                requestAnimationFrame(updateParallax);

                parallaxRunning = true;

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
    // 5. DESTINATION CARD INTERACTION
    // =========================================

    const destinationCards = document.querySelectorAll(
        ".destination-card"
    );


    destinationCards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.style.zIndex = "2";

        });


        card.addEventListener("mouseleave", function () {

            this.style.zIndex = "1";

        });

    });



    // =========================================
    // 6. MAP CARD INTERACTION
    // =========================================

    const mapCards = document.querySelectorAll(
        ".map-card"
    );


    mapCards.forEach(card => {

        card.addEventListener("mouseenter", function () {

            this.classList.add("map-active");

        });


        card.addEventListener("mouseleave", function () {

            this.classList.remove("map-active");

        });

    });



    // =========================================
    // 7. SMOOTH NAVIGATION
    // =========================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");


            if (!targetId || targetId === "#") {
                return;
            }


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
    // 8. HERO IMAGE LOAD EFFECT
    // =========================================

    const heroImage = document.querySelector(
        ".hero-reference"
    );


    if (heroImage) {

        heroImage.addEventListener("load", function () {

            this.classList.add("image-loaded");

        });

    }

    // =========================================
    // 9. CONSOLE MESSAGE
    // =========================================

    console.log(

        "%c LOKA BLITAR ",

        "background:#21472f;color:white;padding:12px;font-size:18px;font-weight:bold;"

    );


    console.log(

        "Selamat datang di Loka Blitar! Jelajahi keindahan Bumi Proklamator."

    );


});
// =========================================
// 10. HERO AUTO SLIDER
// =========================================

const heroImage = document.querySelector(".hero-reference");
const heroCopy = document.querySelector(".hero-copy");
const heroLabel = document.querySelector(".hero-label");
const heroTitle = heroCopy?.querySelector("h1");
const heroDescription = heroCopy?.querySelector("p");

const heroDots = document.querySelector(".hero-slider-dots");
const heroPrev = document.querySelector(".hero-prev");
const heroNext = document.querySelector(".hero-next");

if (
    heroImage &&
    heroCopy &&
    heroLabel &&
    heroTitle &&
    heroDescription &&
    heroDots &&
    heroPrev &&
    heroNext
) {
    const heroSlides = [
        {
            image: "assets/bungkarno-hero.jpeg",
            label: "EXPLORE THE BEAUTY OF BLITAR",
            title: "BLITAR PUNYA LEBIH BANYAK CERITA DARI YANG KAMU KIRA",
            description: "Kota Blitar, Kota Bersejarah yang Penuh Pesona"
        },
        {
            image: "assets/istana gebang.jpeg",
            label: "DISCOVER THE HISTORY",
            title: "MENELUSURI JEJAK SEJARAH SANG PROKLAMATOR",
            description: "Kenali kisah dan warisan bersejarah di Istana Gebang."
        },
        {
            image: "assets/pantai pehpulo.jpeg",
            label: "EXPLORE THE NATURE",
            title: "TEMUKAN PESONA ALAM BLITAR YANG MEMIKAT",
            description: "Nikmati panorama pantai dan keindahan alam yang menenangkan."
        },
        {
            image: "assets/candi penataran.jpeg",
            label: "EXPERIENCE THE CULTURE",
            title: "WARISAN BUDAYA YANG MENYIMPAN RIBUAN CERITA",
            description: "Jelajahi peninggalan sejarah dan budaya di Bumi Blitar."
        }
    ];

    let currentSlide = 0;
    let sliderInterval;
    let transitionTimeout;
    let isChanging = false;

    const intervalDuration = 5000;
    const fadeDuration = 600;

    // Buat indikator sesuai jumlah slide
    heroSlides.forEach((slide, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "hero-dot";
        dot.setAttribute("aria-label", `Tampilkan slide ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
            restartSlider();
        });

        heroDots.appendChild(dot);
    });

    const dots = heroDots.querySelectorAll(".hero-dot");

    // Perbarui indikator slide aktif
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
            dot.setAttribute(
                "aria-current",
                index === currentSlide ? "true" : "false"
            );
        });
    }

    // Tampilkan slide yang dipilih
    function showSlide(index) {
        if (isChanging) return;

        currentSlide =
            (index + heroSlides.length) % heroSlides.length;

        const slide = heroSlides[currentSlide];

        isChanging = true;

        // Mulai transisi gambar
        heroImage.classList.add("slider-fade");
        heroCopy.classList.remove("slide-changing");

        clearTimeout(transitionTimeout);

        transitionTimeout = setTimeout(() => {
            // Ganti gambar dan teks
            heroImage.src = slide.image;
            heroImage.alt = slide.label;

            heroLabel.textContent = slide.label;
            heroTitle.textContent = slide.title;
            heroDescription.textContent = slide.description;

            updateDots();

            // Tampilkan gambar kembali setelah siap dimuat
            const revealImage = () => {
                heroImage.classList.remove("slider-fade");
                heroCopy.classList.remove("slide-changing");

                // Memicu ulang animasi teks
                void heroCopy.offsetWidth;
                heroCopy.classList.add("slide-changing");

                isChanging = false;
            };

            if (heroImage.complete && heroImage.naturalWidth > 0) {
                revealImage();
            } else {
                heroImage.addEventListener("load", revealImage, {
                    once: true
                });

                heroImage.addEventListener("error", () => {
                    heroImage.classList.remove("slider-fade");
                    isChanging = false;

                    console.error(
                        "Gagal memuat gambar hero:",
                        slide.image
                    );
                }, {
                    once: true
                });
            }
        }, fadeDuration);
    }

    // Slide berikutnya
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Slide sebelumnya
    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    // Mulai atau atur ulang timer
    function startSlider() {
        clearInterval(sliderInterval);

        sliderInterval = setInterval(() => {
            if (!document.hidden) {
                nextSlide();
            }
        }, intervalDuration);
    }

    function restartSlider() {
        startSlider();
    }

    // Tombol navigasi manual
    heroNext.addEventListener("click", () => {
        nextSlide();
        restartSlider();
    });

    heroPrev.addEventListener("click", () => {
        previousSlide();
        restartSlider();
    });

    // Hentikan timer saat tab tidak aktif
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            clearInterval(sliderInterval);
        } else {
            startSlider();
        }
    });

    // Inisialisasi slider
    updateDots();
    startSlider();
}