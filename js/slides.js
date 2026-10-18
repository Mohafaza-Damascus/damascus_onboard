window.DG = window.DG || {};

DG.slides = [
  {
    name: 'باب شرقي',
    text: 'يعود إلى العهد الروماني وما يزال محتفظاً بالكثير من ملامحه الأصلية.',
    id: 'bab-sharqi',
    media: { type: 'image', src: '../assets/bab-sharqi-gate.jfif' },
    gate: '../assets/شرقي.jfif',
    link: '#bab-sharqi',
    arch: 'round',
    scene: 'dawn'
  },
  {
    name: 'باب كيسان',
    text: 'يرتبط اسمه بقصة خروج القديس بولس من دمشق.',
    id: 'bab-kisan',
    media: { type: 'image', src: '../assets/bab-kisan-gate.jfif' },
    gate: '../assets/كيسان.jfif',
    link: '#bab-kisan',
    gateAnchor: { x: 0.475, y: 0.75 },
    arch: 'pointed',
    scene: 'morning'
  },
  {
    name: 'باب الصغير',
    text: 'من أبواب دمشق الجنوبية، وتجاوره مقبرة الباب الصغير.',
    id: 'bab-saghir',
    media: { type: 'image', src: '../assets/bab-saghir-gate.jfif' },
    gate: '../assets/الصغير2.jfif',
    link: '#bab-saghir',
    arch: 'pointed',
    scene: 'noon'
  },
  {
    name: 'باب الجابية',
    text: 'يقع في الطرف الغربي للشارع المستقيم.',
    id: 'bab-jabiya',
    media: { type: 'image', src: '../assets/bab-jabiya-gate.jfif' },
    gate: '../assets/الجابية.jfif',
    link: '#bab-jabiya',
    arch: 'pointed',
    scene: 'golden'
  },
  {
    name: 'باب الفراديس',
    text: 'يُعرف أيضاً بباب العمارة، ويقع شمال الجامع الأموي.',
    id: 'bab-faradis',
    media: { type: 'image', src: '../assets/bab-faradis-gate.jfif' },
    gate: '../assets/الفراديس2.jfif',
    link: '#bab-faradis',
    arch: 'pointed',
    scene: 'dusk'
  },
  {
    name: 'باب السلام',
    text: 'من أبواب دمشق التاريخية في السور الشمالي للمدينة القديمة.',
    id: 'bab-salam',
    media: { type: 'image', src: '../assets/bab-salam-gate.jfif' },
    gate: '../assets/السلام.jfif',
    link: '#bab-salam',
    arch: 'pointed',
    scene: 'night'
  },
  {
    name: 'باب توما',
    text: 'يحمل اسمه أحد أعرق أحياء دمشق القديمة.',
    id: 'bab-touma',
    media: { type: 'image', src: '../assets/bab-touma-gate.jfif' },
    gate: '../assets/توما2.jfif',
    link: '#bab-touma',
    arch: 'pointed',
    scene: 'bluehour'
  }
];

DG.config = {
  // التوقيتات بالميلي ثانية — مأخوذة من إعدادات القالب الأصلي
  timing: {
    bg: 1500,          // انتقال الخلفية (دائرة متموّجة) — power2.inOut
    gateOut: 1200,     // البوابة القديمة: تكبير ×6 + اختفاء + ضبابية — power4.in
    gateInDelay: 600,  // متى تبدأ البوابة الجديدة بالظهور
    gateIn: 900,       // البوابة الجديدة: من 0 إلى حجمها — power4.out
    textOut: 350,
    textInDelay: 650,
    textIn: 650,
    stagger: 70
  },
  gateScaleOut: 6,
  gateBlur: 10,
  glow: 0 // توهج على حافة دائرة الانتقال (0 = مثل الأصل، جرّب 0.15)
};
