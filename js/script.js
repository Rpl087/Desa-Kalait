document.addEventListener('DOMContentLoaded', () => {
    // Header Hide/Show on Scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    if (header) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop < 0) scrollTop = 0;

            if (scrollTop > lastScrollTop && scrollTop > 120) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop;
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Custom Modal System with Smooth Fade/Scale Animations
    function initModal(triggerId, modalId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);

        if (!trigger || !modal) return;

        const closeBtn = modal.querySelector('.custom-close-btn');

        const openModal = () => {
            modal.style.display = "flex";
            // Force reflow for opacity transition
            void modal.offsetWidth;
            modal.classList.add('active');
            document.body.style.overflow = "hidden";
        };

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = "";
            }, 300);
        };

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    initModal('cardTrigger', 'infoModal');
    initModal('maleTrigger', 'maleModal');
    initModal('femaleTrigger', 'femaleModal');
    initModal('asalUsulTrigger', 'asalUsulModal');

    // Potensi Cards Video Playback on Hover & Mobile Scroll
    const potensiCards = document.querySelectorAll('.card-potensi-grid');

    potensiCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            video.pause();

            card.addEventListener('mouseenter', () => {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => { });
                }
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });

            // Touch support for mobile devices
            card.addEventListener('touchstart', () => {
                if (video.paused) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            }, { passive: true });
        }
    });

    // Close collapsed navbar on mobile after clicking a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
});