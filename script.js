document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. HEADER HIDE/SHOW ON SCROLL
       ========================================= */
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    if (header) {
        window.addEventListener('scroll', () => {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop < 0) scrollTop = 0;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollTop = scrollTop;
        });
    }

    /* =========================================
       2. TOMBOL BACK TO TOP
       ========================================= */
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

    /* =========================================
       3. LOGIKA MODAL POP-UP
       ========================================= */
    
    function initModal(triggerId, modalId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);

        if (!trigger || !modal) return;

        const closeBtn = modal.querySelector('.custom-close-btn');

        const closeModal = () => {
            modal.style.display = "none";
            document.body.style.overflow = ""; 
        };

        trigger.addEventListener('click', (e) => {
            e.preventDefault(); 
            modal.style.display = "flex";
            document.body.style.overflow = "hidden"; 
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    // --- Inisialisasi Modal ---
    initModal('cardTrigger', 'infoModal');       // Total Penduduk
    initModal('maleTrigger', 'maleModal');       // Laki-laki
    initModal('femaleTrigger', 'femaleModal');   // Perempuan
    initModal('asalUsulTrigger', 'asalUsulModal'); // Asal Usul

    /* =========================================
       4. LOGIKA VIDEO HOVER (Play/Pause)
       ========================================= */
    const potensiCards = document.querySelectorAll('.card-potensi-grid');

    potensiCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            // Pastikan video pause saat awal
            video.pause();

            card.addEventListener('mouseenter', () => {
                video.play().catch(error => {
                    // Penanganan error autoplay (opsional)
                    console.log("Autoplay dicegah oleh browser:", error);
                });
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0; // Opsi: Reset ke awal saat keluar
            });
        }
    });

});