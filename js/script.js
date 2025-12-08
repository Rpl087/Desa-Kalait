document.addEventListener('DOMContentLoaded', () => {
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

    initModal('cardTrigger', 'infoModal');
    initModal('maleTrigger', 'maleModal');
    initModal('femaleTrigger', 'femaleModal');
    initModal('asalUsulTrigger', 'asalUsulModal');

    const potensiCards = document.querySelectorAll('.card-potensi-grid');

    potensiCards.forEach(card => {
        const video = card.querySelector('video');
        if (video) {
            video.pause();

            card.addEventListener('mouseenter', () => {
                video.play().catch(() => { });
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });
});