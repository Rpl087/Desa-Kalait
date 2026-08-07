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

    // LocalStorage Data Sync System (Maintenance Mode)
    const DEFAULT_DATA = {
        demografi: {
            totalJiwa: 456,
            laki: 236,
            perempuan: 221,
            jaga: {
                total: [96, 92, 140, 128],
                laki: [51, 48, 65, 72],
                perempuan: [46, 44, 75, 56]
            }
        },
        pekerjaan: {
            petani: 393,
            wiraswasta: 43,
            pelajar: 83,
            pns: 8,
            buruh: 0
        },
        perangkat: {
            hukumtua: "Olce B. Tompoliu",
            sekdes: "Marni Rumengan",
            bendahara: "Ivana Tompoliu",
            kaur: "Gryvit Karuh",
            jaga1: "Raykal Saroinsong",
            jaga2: "Stevi Tompoliu",
            jaga3: "Jein Somba",
            jaga4: "Harto Karuh"
        },
        silsilah: [
            { no: 1, nama: "Abedneju Umboh", tahun: "1918-1926" },
            { no: 2, nama: "Yohanes Umboh", tahun: "1926-1933" },
            { no: 3, nama: "Johanis Pele", tahun: "1933-1950" },
            { no: 4, nama: "Emil Umboh", tahun: "1950-1951" },
            { no: 5, nama: "Luther Kaligis", tahun: "1951-1965" },
            { no: 6, nama: "Piet Rugian", tahun: "1965-1971" },
            { no: 7, nama: "Eduward Umboh", tahun: "1971-1974" },
            { no: 8, nama: "Yes Somba", tahun: "1974-1976" },
            { no: 9, nama: "Dagober Somba", tahun: "1976-1981" },
            { no: 10, nama: "M. Ch. Somba", tahun: "1981-1989" },
            { no: 11, nama: "Like Kindangen", tahun: "1989 & 1990" },
            { no: 12, nama: "Yosep Umboh", tahun: "1989-1990" },
            { no: 13, nama: "Boy Umboh", tahun: "1990" },
            { no: 14, nama: "Hien Tompoliu", tahun: "1990-1999" },
            { no: 15, nama: "Royke J. Somba", tahun: "1999-2006" },
            { no: 16, nama: "Adri Karuh", tahun: "2006-2012" },
            { no: 17, nama: "Olce Berty Tompoliu", tahun: "2012 - Sekarang", current: true }
        ]
    };

    function syncData() {
        let activeData = DEFAULT_DATA;
        try {
            const stored = localStorage.getItem('desa_kalait_data');
            if (stored) {
                activeData = JSON.parse(stored);
            } else {
                localStorage.setItem('desa_kalait_data', JSON.stringify(DEFAULT_DATA));
            }
        } catch (e) {
            console.error("Gagal membaca localStorage", e);
        }

        const setElText = (id, text) => {
            const el = document.getElementById(id);
            if (el) el.textContent = text;
        };

        // Render Demografi
        setElText('val-total-jiwa', activeData.demografi.totalJiwa);
        setElText('val-total-laki', activeData.demografi.laki);
        setElText('val-total-perempuan', activeData.demografi.perempuan);

        for (let i = 0; i < 4; i++) {
            setElText(`val-jaga-total-${i+1}`, `${activeData.demografi.jaga.total[i]} Orang`);
            setElText(`val-jaga-laki-${i+1}`, `${activeData.demografi.jaga.laki[i]} Orang`);
            setElText(`val-jaga-perempuan-${i+1}`, `${activeData.demografi.jaga.perempuan[i]} Orang`);
        }

        // Render Pekerjaan
        setElText('val-pekerjaan-petani', activeData.pekerjaan.petani);
        setElText('val-pekerjaan-wiraswasta', activeData.pekerjaan.wiraswasta);
        setElText('val-pekerjaan-pelajar', activeData.pekerjaan.pelajar);
        setElText('val-pekerjaan-pns', activeData.pekerjaan.pns);
        setElText('val-pekerjaan-buruh', activeData.pekerjaan.buruh);

        // Render Perangkat
        setElText('val-perangkat-hukumtua', activeData.perangkat.hukumtua);
        setElText('val-perangkat-sekdes', activeData.perangkat.sekdes);
        setElText('val-perangkat-bendahara', activeData.perangkat.bendahara);
        setElText('val-perangkat-kaur', activeData.perangkat.kaur);
        setElText('val-jaga-1', activeData.perangkat.jaga1);
        setElText('val-jaga-2', activeData.perangkat.jaga2);
        setElText('val-jaga-3', activeData.perangkat.jaga3);
        setElText('val-jaga-4', activeData.perangkat.jaga4);

        // Render Silsilah Hukum Tua
        const col1 = document.getElementById('silsilah-col-1');
        const col2 = document.getElementById('silsilah-col-2');
        if (col1 && col2) {
            col1.innerHTML = '';
            col2.innerHTML = '';
            
            const list = activeData.silsilah || [];
            const midpoint = Math.ceil(list.length / 2);
            
            list.forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                if (item.current) {
                    li.className += ' fw-bold text-success bg-light';
                }
                li.textContent = `${item.no || (index + 1)}. ${item.nama} (${item.tahun})`;
                
                if (index < midpoint) {
                    col1.appendChild(li);
                } else {
                    col2.appendChild(li);
                }
            });
        }
    }

    // Run Sync on Page Load
    syncData();
});