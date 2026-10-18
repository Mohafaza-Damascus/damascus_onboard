document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-album]');
    if (!root) return;

    const camera = root.querySelector('[data-camera]');
    const gallery = root.querySelector('[data-gallery]');
    const archesContainer = root.querySelector('[data-arches]');
    const dustContainer = root.querySelector('[data-dust]');
    const intro = root.querySelector('[data-intro]');
    const enterButton = root.querySelector('[data-enter]');
    const currentLabel = root.querySelector('[data-current]');
    const totalLabel = root.querySelector('[data-total]');
    const progressBar = root.querySelector('[data-progress]');
    const locationLabel = root.querySelector('[data-location]');
    const hint = root.querySelector('[data-hint]');

    const emotionBanner = root.querySelector('[data-emotion-banner]');
    const emotionText = root.querySelector('[data-emotion-text]');
    const stationDotsContainer = root.querySelector('[data-station-dots]');
    const prevStationBtn = root.querySelector('[data-prev-station]');
    const nextStationBtn = root.querySelector('[data-next-station]');

    const modal = root.querySelector('[data-modal]');
    const modalImg = root.querySelector('[data-modal-img]');
    const modalTag = root.querySelector('[data-modal-tag]');
    const modalTitle = root.querySelector('[data-modal-title]');
    const modalQuote = root.querySelector('[data-modal-quote]');
    const modalDesc = root.querySelector('[data-modal-desc]');

    if (!camera || !gallery) return;

    const data = [
        {
            title: 'المدينة القديمة',
            image: '../assets/damascus-heritage.jfif',
            description: 'في أزقة دمشق القديمة تتجاور البيوت العربية والأفنية الداخلية والأسواق، وتبقى الذاكرة جزءاً من تفاصيل الحياة اليومية.',
            tag: 'الذاكرة العمرانية',
            quote: '«حاراتٌ تهمسُ بالياسمين وتتنفّسُ عبقَ الأجداد»'
        },
        {
            title: 'الجامع الأموي',
            image: '../assets/damascus-umayyad.jfif',
            description: 'في قلب دمشق يقف الجامع الأموي بوصفه أحد أبرز معالمها الدينية والعمرانية، وشاهداً على تعاقب العصور.',
            tag: 'المكان والروح',
            quote: '«فسيفساءُ الذهبِ تحرسُ صحنَ التاريخ منذُ ثلاثة عشر قرناً»'
        },
        {
            title: 'الأسواق الدمشقية',
            image: '../assets/damascus-mamluk.jfif',
            description: 'مساحات للحرفة والتجارة والتعارف، تحفظ الأسواق تفاصيل الحياة الدمشقية وأصواتها وروائحها.',
            tag: 'الحرفة والحياة اليومية',
            quote: '«تحتَ القناطرِ المسقوفةِ تلتقي اليدُ الصانعةُ بالذاكرةِ الحيّة»'
        },
        {
            title: 'دمشق العثمانية',
            image: '../assets/damascus-ottoman.jfif',
            description: 'تظهر آثار هذه المرحلة في العمارة وتنظيم الأسواق والتفاصيل التي تجمع بين الوظيفة والجمال.',
            tag: 'طبقات التاريخ',
            quote: '«تناغمُ الحجرِ الأبلقِ بينَ الخاناتِ والقصورِ والتكايا»'
        },
        {
            title: 'دمشق الحديثة',
            image: '../assets/damascus-modern.jfif',
            description: 'اتسعت المدينة وتغيرت شوارعها وأحياؤها، بينما بقي الماضي حاضراً في ملامحها.',
            tag: 'التحول العمراني',
            quote: '«مدينةٌ تمتدُّ نحوَ المستقبلِ وجذورُها راسخةٌ في التاريخ»'
        },
        {
            title: 'دمشق اليوم',
            image: '../assets/damascus-today.jfif',
            description: 'مدينة تجمع بين الذاكرة والتغير، وبين الحكايات الموروثة والأفكار التي تصنعها كل يوم.',
            tag: 'مدينة مستمرة',
            quote: '«أقدمُ عواصمِ العالم.. حكايةٌ تُكتَبُ فصولُها كلَّ صباح»'
        }
    ];

    const pad = value => String(value).padStart(2, '0');
    const firstCardDepth = 450;
    const cardDepthSpacing = 900;
    const cameraEndOffset = 350;

    /* 1. توليد ذرات الضوء العائمة في القاعة */
    if (dustContainer) {
        for (let i = 0; i < 22; i++) {
            const p = document.createElement('span');
            p.className = 'dust-particle';
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${15 + Math.random() * 75}%`;
            p.style.setProperty('--size', `${3 + Math.random() * 5}px`);
            p.style.setProperty('--dur', `${9 + Math.random() * 9}s`);
            p.style.setProperty('--delay', `${-Math.random() * 10}s`);
            p.style.setProperty('--drift', `${(Math.random() - 0.5) * 70}px`);
            p.style.setProperty('--alpha', `${0.3 + Math.random() * 0.45}`);
            dustContainer.appendChild(p);
        }
    }

    /* 2. توليد القناطر الدمشقية ثلاثية الأبعاد على طول الممر */
    if (archesContainer) {
        [-250, -1150, -2050, -2950, -3850, -4750].forEach(zDepth => {
            const arch = document.createElement('div');
            arch.className = 'room-arch';
            arch.style.transform = `translate3d(0, 0, ${zDepth}px)`;
            archesContainer.appendChild(arch);
        });
    }

    /* 3. إنشاء كروت الصور فقط (بدون كروت الشرح المقابلة) */
    const cards = data.map((item, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const depth = -(firstCardDepth + index * cardDepthSpacing);

        const card = document.createElement('article');
        card.className = `gallery-card side-${side}`;
        card.style.setProperty('--depth', `${depth}px`);
        card.style.transform =
            `translate3d(-50%, -50%, ${depth}px) ` +
            `rotateY(${side === 'left' ? 12 : -12}deg)`;

        const badge = document.createElement('span');
        badge.className = 'gallery-card__inspect-badge';
        badge.textContent = '';

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        image.loading = index < 2 ? 'eager' : 'lazy';
        image.draggable = false;

        const caption = document.createElement('div');
        caption.className = 'gallery-card-caption';

        const tag = document.createElement('span');
        tag.textContent = `${pad(index + 1)} · ${item.tag}`;

        const title = document.createElement('strong');
        title.textContent = item.title;

        const description = document.createElement('p');
        description.textContent = item.description;

        caption.append(tag, title, description);
        card.append(badge, image, caption);
        gallery.appendChild(card);

        card.addEventListener('click', () => {
            if (activeIndex === index) {
                openArtworkModal(item);
            } else {
                scrollToStation(index);
            }
        });

        return {
            element: card,
            item,
            depth
        };
    });

    totalLabel.textContent = pad(data.length);

    /* 4. إنشاء نقاط المحطات السفلية */
    const stationDots = data.map((item, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'station-dot';
        dot.setAttribute('aria-label', item.title);
        dot.addEventListener('click', () => scrollToStation(idx));
        stationDotsContainer?.appendChild(dot);
        return dot;
    });

    const lastCardDepth = Math.abs(cards[cards.length - 1].depth);
    const cameraTravelDistance = lastCardDepth + cameraEndOffset;
    const cameraStartPosition = 150;

    const maxScroll = () =>
        Math.max(1, root.offsetHeight - window.innerHeight);

    function scrollToStation(index) {
        const safeIdx = Math.max(0, Math.min(data.length - 1, index));
        const targetZ = Math.abs(cards[safeIdx].depth) - 240;
        const targetProgress = Math.max(
            0.03,
            Math.min(1, (targetZ - cameraStartPosition) / cameraTravelDistance)
        );

        window.scrollTo({
            top: root.offsetTop + targetProgress * maxScroll(),
            behavior: 'smooth'
        });
    }

    function openArtworkModal(item) {
        if (!modal) return;
        modalImg.src = item.image;
        modalImg.alt = item.title;
        modalTag.textContent = item.tag;
        modalTitle.textContent = item.title;
        modalQuote.textContent = item.quote;
        modalDesc.textContent = item.description;
        modal.hidden = false;
    }

    root.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (modal) modal.hidden = true;
        });
    });

    /* 5. نظام الحركة السلسة */
    let targetProgress = 0;
    let currentProgress = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let activeIndex = -1;

    window.addEventListener('pointermove', e => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function syncTargetScroll() {
        const rect = root.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        targetProgress = Math.min(1, scrolled / maxScroll());
    }

    window.addEventListener('scroll', syncTargetScroll, { passive: true });
    window.addEventListener('resize', syncTargetScroll);

    function tick() {
        currentProgress += (targetProgress - currentProgress) * 0.085;
        currentMouseX += (targetMouseX - currentMouseX) * 0.06;
        currentMouseY += (targetMouseY - currentMouseY) * 0.06;

        const velocity = Math.abs(targetProgress - currentProgress);
        const cameraZ = cameraStartPosition + currentProgress * cameraTravelDistance;

        const walkBobY = Math.sin(cameraZ * 0.018) * Math.min(1, velocity * 45) * 6;
        const yaw = -currentMouseX * 3.2;
        const pitch = currentMouseY * 1.8;
        const shiftX = -currentMouseX * 22;

        camera.style.transform =
            `translate3d(${shiftX.toFixed(1)}px, ${walkBobY.toFixed(1)}px, ${cameraZ.toFixed(1)}px) ` +
            `rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg)`;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach(({ depth }, index) => {
            const dist = Math.abs(Math.abs(depth) - (cameraZ + 220));
            if (dist < closestDistance) {
                closestDistance = dist;
                closestIndex = index;
            }
        });

        const scrolledPx = currentProgress * maxScroll();

        if (scrolledPx < 35) {
            if (activeIndex !== -1) {
                activeIndex = -1;
                intro?.classList.remove('is-hidden');
                emotionBanner?.classList.remove('is-visible');
                currentLabel.textContent = '00';
                locationLabel.textContent = 'مدخل الغرفة';
                if (hint) hint.innerHTML = 'مرّر للأسفل للتقدم داخل الغرفة <span>↓</span>';
                cards.forEach(c => c.element.classList.remove('is-active'));
                stationDots.forEach(d => d.classList.remove('is-active'));
            }
            progressBar.style.width = '0%';
        } else {
            intro?.classList.add('is-hidden');
            emotionBanner?.classList.add('is-visible');

            if (activeIndex !== closestIndex) {
                activeIndex = closestIndex;
                const item = data[activeIndex];

                currentLabel.textContent = pad(activeIndex + 1);
                locationLabel.textContent = item.title;
                if (emotionText) emotionText.textContent = item.quote;
                if (hint) hint.innerHTML = `${item.tag} · اضغط على اللوحة للتأمل <span>↓</span>`;

                cards.forEach((c, idx) =>
                    c.element.classList.toggle('is-active', idx === activeIndex)
                );
                stationDots.forEach((d, idx) =>
                    d.classList.toggle('is-active', idx === activeIndex)
                );
            }

            progressBar.style.width = `${(currentProgress * 100).toFixed(1)}%`;

            if (currentProgress >= 0.98 && hint) {
                hint.textContent = 'وصلت إلى نهاية الجولة';
            }
        }

        requestAnimationFrame(tick);
    }

    enterButton?.addEventListener('click', () => scrollToStation(0));
    prevStationBtn?.addEventListener('click', () => scrollToStation(Math.max(0, activeIndex - 1)));
    nextStationBtn?.addEventListener('click', () => scrollToStation(Math.min(data.length - 1, activeIndex + 1)));

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal && !modal.hidden) {
            modal.hidden = true;
            return;
        }
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            scrollToStation(activeIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            scrollToStation(activeIndex - 1);
        }
    });

    syncTargetScroll();
    requestAnimationFrame(tick);
});