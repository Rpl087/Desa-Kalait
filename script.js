document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LOGIKA BACK TO TOP ---
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }

    // --- 2. FUNGSI PENGATUR MODAL (REUSABLE) ---
    function setupModal(triggerId, modalId, closeClass) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);
        
        // Cari tombol close di dalam modal spesifik ini
        // Jika closeClass tidak diisi, default cari ID 'closeBtn' (untuk modal pertama)
        let closeBtn;
        if (closeClass) {
            closeBtn = modal.querySelector('.' + closeClass);
        } else {
            closeBtn = document.getElementById('closeBtn');
        }

        if (trigger && modal && closeBtn) {
            // Buka Modal
            trigger.addEventListener('click', function() {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
            });

            // Tutup Modal (Tombol X)
            closeBtn.addEventListener('click', function() {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            });

            // Tutup Modal (Klik Luar)
            window.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            });
        }
    }

    // --- 3. AKTIFKAN KE-3 MODAL ---
    
    // A. Modal Total Penduduk (ID Trigger, ID Modal, null karena pakai ID closeBtn lama)
    setupModal('cardTrigger', 'infoModal', null);

    // B. Modal Laki-laki (ID Trigger, ID Modal, Class tombol close baru)
    setupModal('maleTrigger', 'maleModal', 'close-male');

    // C. Modal Perempuan (ID Trigger, ID Modal, Class tombol close baru)
    setupModal('femaleTrigger', 'femaleModal', 'close-female');


let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Mencegah error pada scroll elastis di HP (iOS)
        if (scrollTop < 0) { 
            scrollTop = 0; 
        }

        // Jika scroll ke bawah DAN posisi scroll sudah lebih dari tinggi header
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Sembunyikan Header
            header.classList.add('header-hidden');
        } else {
            // Tampilkan Header (Scroll ke atas)
            header.classList.remove('header-hidden');
        }
        
        lastScrollTop = scrollTop;
    });

});