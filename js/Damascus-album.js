
document.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('[data-album]');
    if (!root) return;

    const camera = root.querySelector('[data-camera]');
    const gallery = root.querySelector('[data-gallery]');
    const intro = root.querySelector('[data-intro]');
    const enterButton = root.querySelector('[data-enter]');
    const currentLabel = root.querySelector('[data-current]');
    const totalLabel = root.querySelector('[data-total]');
    const progressBar = root.querySelector('[data-progress]');
    const locationLabel = root.querySelector('[data-location]');
    const hint = root.querySelector('[data-hint]');

    if (!camera || !gallery) return;

    const data = [
        {
            title: 'المدينة القديمة',
            image: '../assets/damascus-heritage.jfif',
            description: 'في أزقة دمشق القديمة تتجاور البيوت العربية والأفنية الداخلية والأسواق، وتبقى الذاكرة جزءاً من تفاصيل الحياة اليومية.',
            tag: 'الذاكرة العمرانية'
        },
        {
            title: 'الجامع الأموي',
            image: '../assets/damascus-umayyad.jfif',
            description: 'في قلب دمشق يقف الجامع الأموي بوصفه أحد أبرز معالمها الدينية والعمرانية، وشاهداً على تعاقب العصور.',
            tag: 'المكان والروح'
        },
        {
            title: 'الأسواق الدمشقية',
            image: '../assets/damascus-mamluk.jfif',
            description: 'مساحات للحرفة والتجارة والتعارف، تحفظ الأسواق تفاصيل الحياة الدمشقية وأصواتها وروائحها.',
            tag: 'الحرفة والحياة اليومية'
        },
        {
            title: 'دمشق العثمانية',
            image: '../assets/damascus-ottoman.jfif',
            description: 'تظهر آثار هذه المرحلة في العمارة وتنظيم الأسواق والتفاصيل التي تجمع بين الوظيفة والجمال.',
            tag: 'طبقات التاريخ'
        },
        {
            title: 'دمشق الحديثة',
            image: '../assets/damascus-modern.jfif',
            description: 'اتسعت المدينة وتغيرت شوارعها وأحياؤها، بينما بقي الماضي حاضراً في ملامحها.',
            tag: 'التحول العمراني'
        },
        {
            title: 'دمشق اليوم',
            image: '../assets/damascus-today.jfif',
            description: 'مدينة تجمع بين الذاكرة والتغير، وبين الحكايات الموروثة والأفكار التي تصنعها كل يوم.',
            tag: 'مدينة مستمرة'
        }
    ];

    const pad = value => String(value).padStart(2, '0');

    /*
     * إعدادات توزيع اللوحات.
     * يجب أن تتوافق هذه القيم مع أبعاد الغرفة في CSS.
     */
    const firstCardDepth = 450;
    const cardDepthSpacing = 900;
    const cameraEndOffset = 350;

    /*
     * إنشاء اللوحات وتوزيعها بالتناوب بين الجدارين.
     */
    const cards = data.map((item, index) => {
        const card = document.createElement('article');
        const side = index % 2 === 0 ? 'left' : 'right';

        const depth = -(
            firstCardDepth + index * cardDepthSpacing
        );

        card.className = `gallery-card side-${side}`;

        card.style.setProperty('--depth', `${depth}px`);

        card.style.transform =
            `translate3d(-50%, -50%, ${depth}px) ` +
            `rotateY(${side === 'left' ? 12 : -12}deg)`;

        /*
         * يعتمد الموضع الأفقي على CSS:
         * الكمبيوتر: 300px عن المركز.
         * الموبايل: 100px عن المركز.
         *
         * لذلك لا نضع left بقيمة inline حتى لا تتعطل
         * قواعد الموبايل الموجودة في ملف CSS.
         */

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        image.loading = index < 2 ? 'eager' : 'lazy';
        image.draggable = false;

        const caption = document.createElement('div');
        caption.className = 'gallery-card-caption';

        const tag = document.createElement('span');
        tag.textContent = item.tag;

        const title = document.createElement('strong');
        title.textContent = item.title;

        const description = document.createElement('p');
        description.textContent = item.description;

        // caption.append(tag, title, description);
        // card.append(image, caption);
        // gallery.appendChild(card);

        
caption.append(tag, title, description);
card.append(image, caption);

gallery.appendChild(card);

// إنشاء كارت الوصف على الجهة المقابلة للصورة
const descriptionPanel = document.createElement('article');

const oppositeSide = side === 'left' ? 'right' : 'left';

descriptionPanel.className = `gallery-description side-${oppositeSide}`;
descriptionPanel.style.setProperty('--depth', `${depth}px`);

const panelTag = document.createElement('span');
panelTag.textContent = item.tag;

const panelTitle = document.createElement('h2');
panelTitle.textContent = item.title;

const panelText = document.createElement('p');
panelText.textContent = item.description;

descriptionPanel.append(panelTag, panelTitle, panelText);
gallery.appendChild(descriptionPanel);

return {
    element: card,
    descriptionElement: descriptionPanel,
    item,
    depth
};


    });

    totalLabel.textContent = pad(data.length);

    /*
     * حساب نهاية حركة الكاميرا من موقع آخر لوحة،
     * بدلاً من استخدام مسافة ثابتة لا تتناسب مع توزيعها.
     */
    const lastCardDepth = Math.abs(cards[cards.length - 1].depth);
    const cameraTravelDistance = lastCardDepth + cameraEndOffset;

    const maxScroll = () =>
        Math.max(1, root.offsetHeight - window.innerHeight);

    let scrollProgress = 0;
    let activeIndex = -1;
    let animationFrame = null;

    function updateScene() {
        animationFrame = null;

        const rect = root.getBoundingClientRect();
        const scrolled = Math.max(0, -rect.top);
        const max = maxScroll();

        scrollProgress = Math.min(1, scrolled / max);

        
const cameraStartPosition = 150;

const cameraDistance =
    cameraStartPosition + scrollProgress * cameraTravelDistance;

camera.style.transform =
    `translate3d(0, 0, ${cameraDistance}px)`;

const cameraZ = cameraDistance;

        /*
         * تحديد اللوحة الأقرب إلى الكاميرا.
         * جميع اللوحات تبقى ظاهرة طوال الجولة.
         */
        let closestIndex = 0;
        let closestDistance = Infinity;


cards.forEach(({ element, descriptionElement, depth }, index) => {
    const distance = Math.abs(Math.abs(depth) - cameraZ);

    if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
    }

    // إبقاء الصورة ظاهرة
    element.style.visibility = 'visible';

    if (!descriptionElement) return;

    // تدرج ظهور الوصف بحسب قرب الكاميرا
    const fadeStart = 680;
    const fadeEnd = 180;

    const opacity = Math.max(
        0,
        Math.min(
            1,
            (fadeStart - distance) / (fadeStart - fadeEnd)
        )
    );

    descriptionElement.style.opacity = opacity;
    descriptionElement.style.visibility =
        opacity > 0.01 ? 'visible' : 'hidden';
});


        /*
         * شاشة البداية.
         */
        if (scrolled < 40) {
            activeIndex = -1;

            if (intro) {
                intro.classList.remove('is-hidden');
            }

            currentLabel.textContent = '00';
            locationLabel.textContent = 'مدخل الغرفة';
            progressBar.style.width = '0%';

            if (hint) {
                hint.innerHTML =
                    'مرّر للأسفل للتقدم داخل الغرفة <span>↓</span>';
            }

            return;
        }

        if (intro) {
            intro.classList.add('is-hidden');
        }

        /*
         * تحديث معلومات اللوحة الحالية عند تغيرها.
         */
        if (activeIndex !== closestIndex) {
            activeIndex = closestIndex;

            const item = data[activeIndex];

            currentLabel.textContent = pad(activeIndex + 1);
            locationLabel.textContent = item.title;

            if (hint) {
                hint.innerHTML = `${item.tag} <span>↓</span>`;
            }
        }

        /*
         * تحديث شريط التقدم.
         */
        progressBar.style.width = `${scrollProgress * 100}%`;

        if (scrolled >= max - 10 && hint) {
            hint.textContent = 'وصلت إلى نهاية الجولة';
        }
    }

    function requestUpdate() {
        if (animationFrame !== null) return;

        animationFrame = window.requestAnimationFrame(updateScene);
    }

    window.addEventListener('scroll', requestUpdate, {
        passive: true
    });

    window.addEventListener('resize', requestUpdate);

    /*
     * زر بدء الجولة.
     */
    enterButton?.addEventListener('click', () => {
        window.scrollTo({
            top: root.offsetTop + window.innerHeight * 0.35,
            behavior: 'smooth'
        });
    });

    /*
     * التنقل بين اللوحات باستخدام الأسهم.
     */
    document.addEventListener('keydown', event => {
        if (
            event.key !== 'ArrowDown' &&
            event.key !== 'ArrowUp'
        ) {
            return;
        }

        const nextIndex = event.key === 'ArrowDown'
            ? Math.min(
                data.length - 1,
                Math.max(0, activeIndex + 1)
            )
            : Math.max(0, activeIndex - 1);

        /*
         * تحريك الكاميرا إلى موضع اللوحة المستهدفة.
         */
        const targetDepth = Math.abs(
            cards[nextIndex].depth
        );

        const targetProgress = Math.min(
            1,
            targetDepth / cameraTravelDistance
        );

        window.scrollTo({
            top: root.offsetTop + targetProgress * maxScroll(),
            behavior: 'smooth'
        });
    });

    /*
     * تحديث المشهد عند تحميل الصفحة.
     */
    updateScene();
});
