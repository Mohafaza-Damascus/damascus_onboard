const PLACEHOLDER = "../assets/10.png";

const CATEGORY_NAMES = {
  damascus_facilities: "مرافق دمشق",
  gov_buildings: "المباني الحكومية",
  economy: "الاقتصاد",
  health: "الصحة",
  services: "الخدمات",
  transport: "النقل",
  public_facilities: "المرافق العامة",
  security: "الأمن",
  education: "التعليم",
  tourism: "السياحة",
};

const CATEGORY_ICONS = {
  damascus_facilities: {
    service_departments: { emoji: "🏢", color: "#2980b9" },
    citizen_service_centers: { emoji: "🤝", color: "#27ae60" },
    governorate_directorates: { emoji: "🏛️", color: "#8e44ad" },
    exhibition_city: { emoji: "🎪", color: "#e67e22" },
  },
  gov_buildings: {
    ministries: { emoji: "🏛️", color: "#c0392b" },
    courts: { emoji: "⚖️", color: "#2c3e50" },
    civil_registry: { emoji: "🪪", color: "#16a085" },
    syndicates: { emoji: "👥", color: "#d35400" },
    associations: { emoji: "🤝", color: "#f39c12" },
    immigration: { emoji: "🛂", color: "#34495e" },
  },
  economy: {
    banks: { emoji: "🏦", color: "#27ae60" },
    exchange: { emoji: "💱", color: "#f1c40f" },
    remittance: { emoji: "💸", color: "#2ecc71" },
    shipping: { emoji: "📦", color: "#d35400" },
    atm: { emoji: "🏧", color: "#3498db" },
  },
  health: {
    hospitals: { emoji: "🏥", color: "#e74c3c" },
    health_centers: { emoji: "🏨", color: "#2980b9" },
    pharmacies: { emoji: "💊", color: "#27ae60" },
    medical_equipment: { emoji: "🩼", color: "#8e44ad" },
    blood_banks: { emoji: "🩸", color: "#c0392b" },
  },
  services: {
    post: { emoji: "✉️", color: "#f39c12" },
    telecom: { emoji: "📡", color: "#1abc9c" },
  },
  transport: {
    departure_garages: { emoji: "🚌", color: "#e67e22" },
    parking: { emoji: "🅿️", color: "#3498db" },
    bus_stops: { emoji: "🚏", color: "#f39c12" },
    traffic_nodes: { emoji: "🚦", color: "#e74c3c" },
  },
  public_facilities: {
    squares: { emoji: "⛲", color: "#2ecc71" },
    bridges: { emoji: "🌉", color: "#7f8c8d" },
    parks: { emoji: "🌳", color: "#27ae60" },
    tunnels: { emoji: "🚇", color: "#34495e" },
  },
  security: {
    police: { emoji: "🚔", color: "#2c3e50" },
    checkpoints: { emoji: "🚧", color: "#e67e22" },
    civil_defense: { emoji: "🚒", color: "#e74c3c" },
  },
  education: {
    universities: { emoji: "🎓", color: "#2980b9" },
    institutes: { emoji: "📚", color: "#e67e22" },
    schools: { emoji: "🏫", color: "#27ae60" },
    kindergartens: { emoji: "🌸", color: "#e91e8c" },
  },
  tourism: {
    archaeological_sites: { emoji: "🕌", color: "#c0392b" },
    museums: { emoji: "🏛️", color: "#9b59b6" },
    hotels: { emoji: "🏨", color: "#f39c12" },
    markets: { emoji: "🛍️", color: "#16a085" },
    tourist_facilities: { emoji: "🎡", color: "#e74c3c" },
  },
};

const categoriesData = {
  damascus_facilities: {
    filters: [
      { label: "دوائر الخدمات", value: "service_departments", pk: 42 },
      { label: "مراكز خدمة المواطن", value: "citizen_service_centers", pk: 43 },
      { label: "مديريات المحافظة", value: "governorate_directorates", pk: 44 },
      { label: "مدينة المعارض", value: "exhibition_city", pk: 45 },
    ],
    locationSets: {
      service_departments: [
        [36.30209, 33.52503, "دائرة خدمات ساروجا", "./assets/10.png", "ساروجا", 8, 15, "مبنى مخصص لتقديم الخدمات البلدية للمواطنين في دمشق القديمة"],
        [36.23304, 33.53279, "دائرة خدمات الشام الجديدة", "./assets/10.png", "مشروع دمر", 8, 15, "مبنى مخصص لتقديم الخدمات البلدية للمواطنين"],
        [36.3029, 33.49963, "دائرة خدمات باب مصلى", "./assets/10.png", "باب مصلى", 8, 15, "مبنى مخصص لتقديم الخدمات البلدية للمواطنين"],
        [36.2798, 33.49462, "دائرة خدمات كفرسوسة", "./assets/10.png", "كفرسوسة", 8, 15, "مبنى مخصص لتقديم الخدمات البلدية للمواطنين"],
        [36.29787, 33.50683, "دائرة خدمة القنوات", "./assets/10.png", "القنوات", 8, 15, "مبنى مخصص لتقديم الخدمات البلدية للمواطنين"],
      ],
      citizen_service_centers: [
        [36.24723, 33.50205, "مركز خدمة المواطن كفرسوسة", "./assets/10.png", "كفرسوسة", 8, 15, "يقدم خدمات توثيق العقود واستقبال طلبات الرخص"],
        [36.3138, 33.51802, "مركز خدمة المواطن القصاع", "./assets/10.png", "القصاع", 8, 15, "يقدم خدمات توثيق عقود الإيجار وإصدار وثائق غير موظف"],
        [36.29666, 33.52077, "مركز خدمة المواطن ساحة السبع بحرات", "./assets/10.png", "السبع بحرات", 8, 15, "يقدم خدمات توثيق عقود الإيجار واستقبال طلبات الرخص"],
        [36.28267, 33.51042, "مركز خدمة المواطن البرامكة", "./assets/10.png", "البرامكة", 8, 15, "يقدم خدمات إصدار الوثائق الرسمية"],
        [36.30036, 33.49856, "مركز خدمة المواطن الميدان", "./assets/10.png", "الميدان", 8, 15, "يقدم خدمات توثيق العقود واستقبال طلبات الرخص"],
      ],
      governorate_directorates: [
        [36.29, 33.51, "دائرة خدمات دمشق القديمة", PLACEHOLDER, "دمشق القديمة", 8, 15, "مبنى مخصص لتقديم الخدمات البلدية للمواطنين"],
      ],
      exhibition_city: [
        [36.39187, 33.42722, "مدينة المعارض", "./assets/10.png", "طريق المطار", 8, 15, "تحتوي المدينة على قاعات مؤتمرات ومراكز أعمال ومطاعم"],
      ],
    },
  },
  gov_buildings: {
    filters: [
      { label: "وزارات", value: "ministries", pk: 1 },
      { label: "المحاكم", value: "courts", pk: 2 },
      { label: "النفوس", value: "civil_registry", pk: 3 },
      { label: "النقابات", value: "syndicates", pk: 4 },
      { label: "رابطات", value: "associations", pk: 5 },
      { label: "الهجرة والجوازات", value: "immigration", pk: 6 },
    ],
    locationSets: {
      ministries: [
        [36.27872, 33.50524, "وزارة الداخلية", "./assets/10.png", "كفرسوسة", 8, 20, "المبنى المركزي لوزارة الداخلية السورية"],
        [36.26971, 33.50222, "وزارة الخارجية", "./assets/10.png", "17 نيسان", 8, 20, "المبنى المركزي لوزارة الخارجية السورية"],
        [36.24845, 33.49867, "وزارة العدل", "./assets/10.png", "المزة", 8, 20, "المبنى المركزي لوزارة العدل السورية"],
        [36.28091, 33.50508, "وزارة الادارة المحلية", "./assets/10.png", "17 نيسان", 8, 20, "المبنى المركزي لوزارة الادارة المحلية السورية"],
        [36.27369, 33.51158, "وزارة التعليم العالي", "./assets/10.png", "المزة", 8, 20, "المبنى المركزي لوزارة التعليم العالي"],
      ],
      courts: [
        [36.29976, 33.51087, "قصر العدل القنوات", "./assets/10.png", "القنوات", 8, 20, "مجمع المحاكم المركزي"],
        [36.29902, 33.51108, "المحكمة الشرعية", "./assets/10.png", "القنوات", 8, 20, "المحكمة الشرعية المركزية بدمشق"],
        [36.24796, 33.49839, "قصر العدل المزة", "./assets/10.png", "المزة", 8, 20, "مجمع محاكم المزة"],
      ],
      civil_registry: [
        [36.30108, 33.50836, "دائرة نفوس باب سريجة", "./assets/10.png", "باب سريجة", 8, 20, "تسجيل المواليد والوفيات وإصدار البطاقات الشخصية"],
        [36.30125, 33.51492, "مديرية النفوس", "./assets/10.png", "شارع الثورة", 8, 20, "المديرية العامة للشؤون المدنية"],
      ],
      syndicates: [
        [36.26026, 33.50478, "نقابة المهندسين", "./assets/10.png", "المزة", 8, 20, "المؤسسة الرسمية لتنظيم العمل الهندسي"],
        [36.29304, 33.51664, "نقابة المحامين", "./assets/10.png", "ميسلون", 8, 20, "تنظيم مهنة المحاماة والدفاع عن حقوق الأعضاء"],
      ],
      associations: [
        [36.29685, 33.51019, "رابطة الفلاحين", "./assets/10.png", "القنوات", 8, 20, "قيادة الفلاحين وتمثيلهم في المجالس الزراعية"],
        [36.29397, 33.51735, "الاتحاد العام للعمال", "./assets/10.png", "الصالحية", 8, 20, "الاتحاد العام لنقابات العمال"],
      ],
      immigration: [
        [36.30211, 33.53777, "الهجرة و الجوازات", "./assets/10.png", "ركن الدين", 8, 20, "إصدار وتجديد جوازات السفر والإقامات"],
        [36.29792, 33.5138, "مجمع يلبغا", "./assets/10.png", "المرجة", 8, 20, "فرع الهجرة والجوازات بدمشق"],
      ],
    },
  },
  economy: {
    filters: [
      { label: "البنوك", value: "banks", pk: 11 },
      { label: "مكاتب الصرافة", value: "exchange", pk: 12 },
      { label: "شركات الحوالات", value: "remittance", pk: 13 },
      { label: "شركات الشحن", value: "shipping", pk: 46 },
      { label: "ATM", value: "atm", pk: 14 },
    ],
    locationSets: {
      banks: [
        [36.29611, 33.52094, "مصرف سورية المركزي", "./assets/10.png", "ساحة السبع بحرات", 8, 20, "إصدار النقد الوطني وإدارة السياسة النقدية"],
        [36.30329, 33.51083, "بنك سوريا الدولي الاسلامي", "./assets/10.png", "الحميدية", 8, 20, "خدمات مصرفية إسلامية شاملة للأفراد والشركات"],
      ],
      exchange: [
        [36.28278, 33.5211, "شركة الخواجة", "./assets/10.png", "ساحة الروضة", 8, 20, "صرافة العملات الأجنبية وتحويل الأموال"],
        [36.30188, 33.51012, "شركة شامنا", "./assets/10.png", "الحريقة", 8, 20, "حوالات مالية لكافة المحافظات السورية"],
      ],
      remittance: [
        [36.28293, 33.52071, "الهرم", "./assets/10.png", "ساحة الروضة", 8, 20, "تحويل مالي داخلي سريع وتسديد فواتير"],
        [36.28025, 33.52471, "الفؤاد", "./assets/10.png", "المهاجرين", 8, 20, "حوالات داخلية وخارجية عبر شبكة واسعة"],
      ],
      shipping: [
        [36.29014, 33.50638, "القدموس", "./assets/10.png", "البرامكة", 8, 20, "شحن البضائع والطرود وخدمات البريد السريع"],
        [36.28305, 33.51019, "الاهلية", "./assets/10.png", "البرامكة", 8, 20, "شحن طرود بريدية وخدمات سياحة وسفر"],
      ],
      atm: [
        [36.28965, 33.51607, "ATM بنك شام", "./assets/10.png", "ساحة النجمة", 8, 20, "سحب وإيداع نقدي على مدار الساعة"],
        [36.29504, 33.51713, "ATM البنك العقاري", "./assets/10.png", "ساحة يوسف العظمة", 8, 20, "خدمات مصرفية سريعة ودفع فواتير"],
      ],
    },
  },
  health: {
    filters: [
      { label: "المشافي", value: "hospitals", pk: 15 },
      { label: "المراكز الصحية", value: "health_centers", pk: 16 },
      { label: "الصيدليات", value: "pharmacies", pk: 17 },
      { label: "التجهيزات الطبية", value: "medical_equipment", pk: 18 },
      { label: "بنوك الدم", value: "blood_banks", pk: 19 },
    ],
    locationSets: {
      hospitals: [
        [36.32186, 33.52212, "مشفى العباسيين", "./assets/10.png", "العباسيين", 8, 20, "مشفى تخصصي يقدم خدمات طبية متنوعة"],
        [36.29537, 33.5002, "مشفى دمشق (المجتهد)", "./assets/10.png", "المجتهد", 0, 24, "مشفى حكومي عام يعمل على مدار الساعة"],
        [36.26331, 33.51231, "مشفى المواساة الجامعي", "./assets/10.png", "المواساة", 0, 24, "مشفى جامعي يقدم الرعاية الإسعافية والجراحية"],
        [36.26216, 33.51185, "مشفى الاطفال", "./assets/10.png", "المواساة", 0, 24, "مشفى تخصصي للأطفال متاح 24 ساعة"],
        [36.26968, 33.50553, "المشفى الوطني الجامعي", "./assets/10.png", "17 نيسان", 0, 24, "مشفى وطني متاح على مدار الساعة"],
      ],
      health_centers: [
        [36.2899, 33.52357, "مركز سوريانا الطبي", "./assets/10.png", "عرنوس", 0, 24, "عيادات شاملة ليزر وأسنان وأطفال"],
        [36.28642, 33.5221, "مركز الروضة الطبي", "./assets/10.png", "الروضة", 0, 24, "مركز طبي تخصصي للعيون والليزر"],
      ],
      pharmacies: [
        [36.29277, 33.5245, "صيدلية الشهبندر", "./assets/10.png", "ساحة الشهبندر", 0, 24, "صيدلية مناوبة على مدار 24 ساعة"],
        [36.29149, 33.52223, "صيدلية دار الداء المركزية", "./assets/10.png", "عرنوس", 8, 20, "صيدلية مركزية توفر كافة الأدوية والمستلزمات"],
      ],
      medical_equipment: [
        [36.29528, 33.52125, "السلامة للتجهيزات الطبية", "./assets/10.png", "السبع بحرات", 0, 24, "أدوات طبية ومستودعات تجهيزات"],
        [36.26254, 33.5107, "داماسكو للتجهيزات الطبية", "./assets/10.png", "المواساة", 0, 24, "أدوات طبية ومستلزمات المشافي"],
      ],
      blood_banks: [
        [36.26261, 33.5158, "بنك الدم المزة", "./assets/10.png", "المزة", 0, 24, "تأمين الوحدات الدموية لمشافي دمشق"],
        [36.30223, 33.50002, "بنك دم الرشيد", "./assets/10.png", "باب مصلى", 0, 24, "مركز رئيسي لتأمين وحدات الدم ومشتقاته"],
      ],
    },
  },
  services: {
    filters: [
      { label: "البريد", value: "post", pk: 20 },
      { label: "شركات الاتصالات", value: "telecom", pk: 21 },
    ],
    locationSets: {
      post: [
        [36.29481, 33.51238, "البريد المركزي", "./assets/10.png", "ساحة الحجاز", 0, 24, "خدمات بريدية وسجل عدلي وبيان عائلي"],
        [36.28389, 33.52036, "مكتب بريد الجلاء", "./assets/10.png", "الجلاء", 0, 24, "حوالات مالية ودفع رواتب المتقاعدين"],
      ],
      telecom: [
        [36.31833, 33.52365, "مركز خدمة MTN", "./assets/10.png", "ساحة العباسيين", 0, 24, "خدمات الخطوط والدعم الفني"],
        [36.29716, 33.51292, "مركز خدمة SYRIATEL", "./assets/10.png", "الفيحاء", 0, 24, "خدمات الخطوط وتحديث البيانات"],
      ],
    },
  },
  transport: {
    filters: [
      { label: "كراجات الانطلاق", value: "departure_garages", pk: 22 },
      { label: "المرائب", value: "parking", pk: 23 },
      { label: "مواقف الباصات", value: "bus_stops", pk: 24 },
      { label: "العقد المرورية", value: "traffic_nodes", pk: 25 },
    ],
    locationSets: {
      departure_garages: [
        [36.338846, 33.5388, "كراج البولمن", "./assets/10.png", "القابون", 0, 24, "انطلاق الرحلات اليومية لجميع المحافظات"],
        [36.32508, 33.53011, "كراج العباسيين", "./assets/10.png", "العباسيين", 0, 24, "مركز انطلاق ريف دمشق والمحافظات"],
      ],
      parking: [
        [36.29101, 33.51949, "مراب الحمراء الطابقي", "./assets/10.png", "الصالحية", 0, 24, "مرآب طابقي لسيارات رواد السوق التجاري"],
        [36.362926, 33.51216, "مرآب النعناع الطابقي للسيارات", "./assets/10.png", "الحلبوني", 0, 24, "مرآب طابقي في مركز الحلبوني"],
      ],
      bus_stops: [
        [36.288942, 33.513489, "موقف باص جسر الحرية", "./assets/10.png", "البرامكة", 0, 24, "محطة رئيسية للميكروباصات والباصات"],
      ],
      traffic_nodes: [
        [36.27653, 33.51413, "عقدة ساحة الأمويين", "./assets/10.png", "البرامكة", 0, 24, "تربط مركز المدينة بالطرق السريعة"],
      ],
    },
  },
  public_facilities: {
    filters: [
      { label: "الساحات", value: "squares", pk: 26 },
      { label: "الجسور", value: "bridges", pk: 27 },
      { label: "الحدائق", value: "parks", pk: 28 },
      { label: "الانفاق", value: "tunnels", pk: 29 },
    ],
    locationSets: {
      squares: [
        [36.29518, 33.51637, "ساحة يوسف العظمة", "./assets/10.png", "الصالحية", 0, 24, "أحد الساحات الهامة في وسط العاصمة دمشق"],
        [36.31522, 33.51375, "ساحة باب توما", "./assets/10.png", "باب توما", 0, 24, "ساحة تحيط بباب توما الأثري"],
      ],
      bridges: [
        [36.29549, 33.51387, "جسر فكتوريا", "./assets/10.png", "شكري القوتلي", 0, 24, "أول جسر للسيارات بجانب بردى"],
        [36.30198, 33.526, "جسر العدوي", "./assets/10.png", "العدوي", 0, 24, "صلة وصل رئيسية بين وسط المدينة ومداخلها"],
      ],
      parks: [
        [36.26805, 33.52251, "حديقة النيربين", "./assets/10.png", "ساحة ذي قار", 0, 24, "حديقة عريقة بإطلالة بانورامية"],
        [36.27997, 33.51762, "حديقة الجاحظ", "./assets/10.png", "ابو رمانة", 0, 24, "أشهر المعالم الطبيعية في حي أبو رمانة"],
      ],
      tunnels: [
        [36.26288, 33.51072, "نفق المواساة", "./assets/10.png", "المواساة", 0, 24, "مشروع حيوي لتخفيف الازدحام في المنطقة الطبية"],
        [36.27589, 33.51344, "نفق المزة", "./assets/10.png", "الامويين", 0, 24, "يربط بين أوتوستراد المزة وساحة الأمويين"],
      ],
    },
  },
  security: {
    filters: [
      { label: "مراكز الشرطة", value: "police", pk: 30 },
      { label: "النقاط الامنية", value: "checkpoints", pk: 31 },
      { label: "الدفاع المدني", value: "civil_defense", pk: 32 },
    ],
    locationSets: {
      police: [
        [36.29675, 33.49185, "قسم شرطة الميدان", "./assets/10.png", "الميدان", 0, 24, "حفظ الأمن والنظام ومكافحة الجرائم"],
        [36.27847, 33.50048, "قسم شرطة كفرسوسة", "./assets/10.png", "كفرسوسة", 0, 24, "حفظ النظام العام وتنفيذ المذكرات القضائية"],
      ],
      checkpoints: [
        [36.3162, 33.49092, "نقطة تفتيش مخيم جرمانا", "./assets/10.png", "المتحلق الجنوبي", 0, 24, "نقطة مراقبة أمنية"],
      ],
      civil_defense: [
        [36.32985, 33.50548, "مديرية الدفاع المدني", "./assets/10.png", "المتحلق الجنوبي", 0, 24, "عمليات الإنقاذ والإسعاف والإطفاء"],
      ],
    },
  },
  education: {
    filters: [
      { label: "الجامعات", value: "universities", pk: 33 },
      { label: "المعاهد", value: "institutes", pk: 24 },
      { label: "المدارس", value: "schools", pk: 35 },
      { label: "رياض الاطفال", value: "kindergartens", pk: 26 },
    ],
    locationSets: {
      universities: [
        [36.31796, 33.49318, "كلية الهندسة المعلوماتية", "./assets/10.png", "الهمك", 0, 24, "أول كلية تخصصية بالمعلوماتية بجامعة دمشق"],
        [36.2882, 33.51083, "جامعة دمشق", "./assets/10.png", "البرامكة", 0, 24, "أقدم وأكبر جامعة حكومية في سوريا"],
      ],
      institutes: [
        [36.2956, 33.51958, "معهد الادريسي للعلوم و اللغات", "./assets/10.png", "الصالحية", 0, 24, "دورات تدريبية للغات والمجالات المهنية"],
      ],
      schools: [
        [36.298094, 33.512644, "مدرسة ابن كثير الابتدائية", "./assets/10.png", "المزة", 0, 24, "مدرسة تعليم رسمي للمرحلة الابتدائية"],
      ],
      kindergartens: [
        [36.29245, 33.52786, "روضة الفرسان الصغار", "./assets/10.png", "الميسات", 0, 24, "تعليم وترفيه وبناء القيم للأطفال"],
      ],
    },
  },
  tourism: {
    filters: [
      { label: "المواقع الاثرية", value: "archaeological_sites", pk: 27 },
      { label: "المتاحف", value: "museums", pk: 38 },
      { label: "الفنادق", value: "hotels", pk: 39 },
      { label: "الاسواق", value: "markets", pk: 40 },
      { label: "مرافق سياحية", value: "tourist_facilities", pk: 41 },
    ],
    locationSets: {
      archaeological_sites: [
        [36.30688, 33.51031, "قصر العظم", "./assets/10.png", "الحميدية", 0, 24, "تحفة معمارية دمشقية من القرن الثامن عشر"],
        [36.30114, 33.51161, "قلعة دمشق", "./assets/10.png", "مركز المدينة", 0, 24, "حصن أثري بارز في الركن الشمالي الغربي للأسوار"],
      ],
      museums: [
        [36.28988, 33.51281, "المتحف الوطني", "./assets/10.png", "شكري القوتلي", 0, 24, "عميد المتاحف السورية وأكبرها"],
      ],
      hotels: [
        [36.29341, 33.51696, "فندق الشام", "./assets/10.png", "ميسلون", 0, 24, "فندق 5 نجوم استراتيجي في قلب العاصمة"],
        [36.29157, 33.5141, "فندق فور سيزون", "./assets/10.png", "شكري القوتلي", 0, 24, "أفخم فنادق العاصمة بإطلالة على بردى وقاسيون"],
      ],
      markets: [
        [36.3037, 33.51126, "سوق الحميدية", "./assets/10.png", "الحميدية", 0, 24, "أشهر الأسواق التراثية بطول 600 متر"],
      ],
      tourist_facilities: [
        [36.2914, 33.51227, "التكية السليمانية", "./assets/10.png", "شكري القوتلي", 0, 24, "تحفة معمارية عثمانية شيدها سنان باشا"],
        [36.28721, 33.54627, "جبل قاسيون", "./assets/10.png", "جبل قاسيون", 0, 24, "إطلالة بانورامية كاشفة لأحياء دمشق كاملة"],
      ],
    },
  },
};

const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      esri_satellite: {
        type: "raster",
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
        tileSize: 256,
        attribution: "Esri",
      },
      google_labels_clean: {
        type: "raster",
        tiles: ["https://mt1.google.com/vt/lyrs=h&apistyle=s.t:81|p.v:off,s.t:82|p.v:off,s.t:5|p.v:off,s.t:3|p.v:on&x={x}&y={y}&z={z}&hl=ar"],
        tileSize: 256,
      },
      google_roadmap: {
        type: "raster",
        tiles: ["https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl=ar"],
        tileSize: 256,
        attribution: "Google",
      },
    },
    layers: [
      { id: "google-roadmap-layer", type: "raster", source: "google_roadmap" },
      { id: "satellite-layer", type: "raster", source: "esri_satellite", layout: { visibility: "none" } },
      { id: "labels-layer", type: "raster", source: "google_labels_clean", layout: { visibility: "none" } },
    ],
  },
  center: [36.2765, 33.5138],
  zoom: 12,
});

map.addControl(new maplibregl.NavigationControl(), "top-left");
map.addControl(new maplibregl.ScaleControl(), "bottom-left");

let activeMarkers = [];
let activePopup = null;
let activePlacePanel = null;

let activeCategory = "damascus_facilities";
let activeFilter = "service_departments";
let activeDistrict = "all";
let activeSecondary = "all";
let userPosition = null;

function isOpenNow(openHour, closeHour) {
  const h = new Date().getHours();
  if (openHour === 0 && closeHour === 24) return true;
  if (openHour < closeHour) return h >= openHour && h < closeHour;
  return h >= openHour || h < closeHour;
}

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function applyFilters(rawLocations) {
  let locs = [...rawLocations];
  if (activeDistrict !== "all") {
    locs = locs.filter((loc) => loc[4] === activeDistrict);
  }
  if (activeCategory === "health") {
    if (activeSecondary === "open_now") {
      locs = locs.filter((loc) => isOpenNow(loc[5], loc[6]));
    }
    if (activeSecondary === "nearest" && userPosition) {
      locs = locs.slice().sort((a, b) => {
        const da = distanceKm(userPosition.lat, userPosition.lng, a[1], a[0]);
        const db = distanceKm(userPosition.lat, userPosition.lng, b[1], b[0]);
        return da - db;
      });
    }
  }
  return locs;
}

function getIconStyle() {
  if (CATEGORY_ICONS[activeCategory] && CATEGORY_ICONS[activeCategory][activeFilter]) {
    return CATEGORY_ICONS[activeCategory][activeFilter];
  }
  return { emoji: "📍", color: "#ea4335" };
}

function createMarkerEl(iconStyle, isHighlighted = false) {
  const wrapper = document.createElement("div");
  wrapper.className = "marker-wrapper" + (isHighlighted ? " highlighted" : "");
  const color = iconStyle ? iconStyle.color : "#ea4335";
  const emoji = iconStyle ? iconStyle.emoji : "📍";

  wrapper.style.setProperty("--marker-color", color);
  wrapper.innerHTML = `
    <div class="marker-content">
      <div class="pin-head">
        <div class="pin-dot"></div>
        <span class="marker-emoji">${emoji}</span>
      </div>
      <div class="pin-point"></div>
    </div>
  `;
  return wrapper;
}

function clearMarkers() {
  activeMarkers.forEach(({ marker }) => marker.remove());
  activeMarkers = [];
  if (activePopup) {
    activePopup.remove();
    activePopup = null;
  }
  hidePlacePanel();
}

function highlightMarker(targetIndex) {
  activeMarkers.forEach(({ el, index }) => {
    if (index === targetIndex) {
      el.classList.add("highlighted");
    } else {
      el.classList.remove("highlighted");
    }
  });
}

function renderMarkers(locations) {
  clearMarkers();
  const filtered = applyFilters(locations);
  const iconStyle = getIconStyle();

  filtered.forEach((loc, index) => {
    const [lng, lat, name, img, district, openH, closeH, description] = loc;
    const el = createMarkerEl(iconStyle);
    el.style.animationDelay = `${index * 60}ms`;
    const marker = new maplibregl.Marker({ element: el, anchor: "bottom" })
      .setLngLat([lng, lat])
      .addTo(map);

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      highlightMarker(index);
      showPlaceDetails(lng, lat, name, img, district, openH, closeH, description);
    });

    activeMarkers.push({ marker, el, loc, index });
  });
}

function ensurePlacePanel() {
  if (activePlacePanel) return activePlacePanel;
  const mapWrapper = document.getElementById("map-container");
  const panel = document.createElement("aside");
  panel.className = "google-place-panel";
  panel.dir = "rtl";
  panel.innerHTML = `
    <button class="google-place-panel__close" type="button" aria-label="إغلاق">×</button>
    <img class="google-place-panel__image" src="${PLACEHOLDER}" alt="">
    <div class="google-place-panel__body">
      <h2 class="google-place-panel__title"></h2>
      <div class="google-place-panel__meta">
        <span class="google-place-panel__category"></span>
        <span class="google-place-panel__status"></span>
      </div>
      <div class="google-place-panel__row">
        <p class="google-place-panel__district"></p>
      </div>
      <div class="google-place-panel__row">
        <p class="google-place-panel__hours"></p>
      </div>
      <p class="google-place-panel__description"></p>
    </div>
  `;

  panel.querySelector(".google-place-panel__close").addEventListener("click", hidePlacePanel);
  mapWrapper.appendChild(panel);
  activePlacePanel = panel;
  return panel;
}

function hidePlacePanel() {
  if (!activePlacePanel) return;
  activePlacePanel.classList.remove("is-visible");
}

function showPlaceDetails(lng, lat, name, image, district, openH, closeH, description) {
  if (activePopup) {
    activePopup.remove();
    activePopup = null;
  }

  const panel = ensurePlacePanel();
  const isOpen = isOpenNow(openH, closeH);
  panel.querySelector(".google-place-panel__image").src = image || PLACEHOLDER;
  panel.querySelector(".google-place-panel__image").alt = name;
  panel.querySelector(".google-place-panel__title").innerText = name;
  panel.querySelector(".google-place-panel__category").innerText = district || "دمشق";
  panel.querySelector(".google-place-panel__status").innerText = isOpen ? "مفتوح الآن" : "مغلق الآن";
  panel.querySelector(".google-place-panel__status").classList.toggle("is-open", isOpen);
  panel.querySelector(".google-place-panel__district").innerText = `المنطقة: ${district || "غير محدد"}`;
  panel.querySelector(".google-place-panel__hours").innerText =
    openH === 0 && closeH === 24 ? "مفتوح على مدار الساعة" : `من ${openH}:00 حتى ${closeH}:00`;
  panel.querySelector(".google-place-panel__description").innerText = description || "";
  panel.classList.add("is-visible");

  map.flyTo({
    center: [lng, lat],
    zoom: Math.max(map.getZoom(), 15),
    duration: 900,
  });
}

function renderImageCards(locations) {
  const container = document.getElementById("imageCardsContainer");
  container.innerHTML = "";
  const filtered = applyFilters(locations);

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.style.cssText = "color:#aaa;padding:1rem;text-align:center;width:100%;";
    empty.innerText = "لا توجد نتائج";
    container.appendChild(empty);
    renderMarkers([]);
    return;
  }

  filtered.forEach((loc, index) => {
    const [lng, lat, name, img, district, openH, closeH, description] = loc;
    const card = document.createElement("div");
    card.className = "image_card";
    card.title = name;

    const image = document.createElement("img");
    image.src = img;
    image.alt = name;
    image.onerror = () => { image.src = PLACEHOLDER; };

    const label = document.createElement("p");
    label.innerText = name;

    card.appendChild(image);
    card.appendChild(label);

    if (activeCategory === "health" && activeSecondary === "nearest" && userPosition) {
      const km = distanceKm(userPosition.lat, userPosition.lng, lat, lng);
      const distEl = document.createElement("span");
      distEl.style.cssText = "font-size:.65rem;color:#222;display:block;";
      distEl.innerText = km < 1 ? `${Math.round(km * 1000)} م` : `${km.toFixed(1)} كم`;
      label.appendChild(distEl);
    }

    card.addEventListener("click", () => {
      document.querySelectorAll(".image_card").forEach((c) => {
        c.style.borderColor = "transparent";
      });
      card.style.borderColor = "#fae5af";

      map.flyTo({ center: [lng, lat], zoom: 16, duration: 1200 });
      highlightMarker(index);
      showPlaceDetails(lng, lat, name, img, district, openH, closeH, description);
    });

    container.appendChild(card);
  });

  renderMarkers(locations);
}

function requestLocation(cb) {
  if (!navigator.geolocation) {
    alert("المتصفح لا يدعم تحديد الموقع");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      cb();
    },
    () => {
      alert("لم يتم السماح بالوصول للموقع");
      activeSecondary = "all";
      cb();
    }
  );
}

// بناء شريط الفلاتر العلوي (المنطقة + شرط إظهار الحالة لقسم الصحة)
function renderTopFilters(rawLocations) {
  const bar = document.getElementById("topFiltersBar");
  if (!bar) return;
  bar.innerHTML = "";

  // 1. فلتر المنطقة (يظهر لجميع الأقسام)
  const districts = ["all", ...new Set(rawLocations.map((l) => l[4]))];
  const distWrap = document.createElement("div");
  distWrap.className = "filter_select_wrap";

  const distLabel = document.createElement("label");
  distLabel.innerText = "المنطقة:";

  const distSel = document.createElement("select");
  distSel.className = "filter_select";

  districts.forEach((d) => {
    const opt = document.createElement("option");
    opt.value = d;
    opt.innerText = d === "all" ? "كل المناطق" : d;
    if (d === activeDistrict) opt.selected = true;
    distSel.appendChild(opt);
  });

  distSel.addEventListener("change", () => {
    activeDistrict = distSel.value;
    renderImageCards(rawLocations);
  });

  distWrap.appendChild(distLabel);
  distWrap.appendChild(distSel);
  bar.appendChild(distWrap);

  // 2. فلتر الحالة (يظهر حصراً عند اختيار قسم الصحة)
  if (activeCategory === "health") {
    const secWrap = document.createElement("div");
    secWrap.className = "filter_select_wrap";

    const secLabel = document.createElement("label");
    secLabel.innerText = "الحالة:";

    const secSel = document.createElement("select");
    secSel.className = "filter_select";

    const secOptions = [
      { value: "all", label: "كل الحالات" },
      { value: "open_now", label: "مفتوح الآن" },
      { value: "nearest", label: "الأقرب أولاً" },
    ];

    secOptions.forEach((o) => {
      const opt = document.createElement("option");
      opt.value = o.value;
      opt.innerText = o.label;
      if (o.value === activeSecondary) opt.selected = true;
      secSel.appendChild(opt);
    });

    secSel.addEventListener("change", () => {
      activeSecondary = secSel.value;
      if (activeSecondary === "nearest" && !userPosition) {
        requestLocation(() => renderImageCards(rawLocations));
      } else {
        renderImageCards(rawLocations);
      }
    });

    secWrap.appendChild(secLabel);
    secWrap.appendChild(secSel);
    bar.appendChild(secWrap);
  }
}

// بناء القائمة الجانبية المتمددة (Accordion Nav)
function renderAccordionNav() {
  const container = document.getElementById("categoryAccordion");
  if (!container) return;
  container.innerHTML = "";

  Object.keys(categoriesData).forEach((catKey) => {
    const catData = categoriesData[catKey];
    const item = document.createElement("div");
    const isCurrent = catKey === activeCategory;
    item.className = `category_accordion_item ${isCurrent ? "open" : ""}`;

    const mainBtn = document.createElement("button");
    mainBtn.className = `map_btn ${isCurrent ? "active" : ""}`;
    mainBtn.innerHTML = `
      <span>${CATEGORY_NAMES[catKey] || catKey}</span>
      <span class="chevron_arrow">▼</span>
    `;

    const subList = document.createElement("div");
    subList.className = "category_sub_list";

    catData.filters.forEach((filter) => {
      const subBtn = document.createElement("button");
      const isSubActive = isCurrent && filter.value === activeFilter;
      subBtn.className = `sub_filter_btn ${isSubActive ? "active" : ""}`;
      subBtn.innerText = filter.label;

      subBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".sub_filter_btn").forEach((b) => b.classList.remove("active"));
        subBtn.classList.add("active");

        activeFilter = filter.value;
        activeDistrict = "all";
        activeSecondary = "all";

        const locs = catData.locationSets[activeFilter] || [];
        renderTopFilters(locs);
        renderImageCards(locs);
      });

      subList.appendChild(subBtn);
    });

    mainBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".category_accordion_item").forEach((el) => {
        el.classList.remove("open");
        el.querySelector(".map_btn").classList.remove("active");
      });

      if (!isOpen) {
        item.classList.add("open");
        mainBtn.classList.add("active");
        activeCategory = catKey;
        activeFilter = catData.filters[0].value;
        activeDistrict = "all";
        activeSecondary = "all";

        const firstSubBtn = subList.querySelector(".sub_filter_btn");
        if (firstSubBtn) {
          document.querySelectorAll(".sub_filter_btn").forEach((b) => b.classList.remove("active"));
          firstSubBtn.classList.add("active");
        }

        const locs = catData.locationSets[activeFilter] || [];
        renderTopFilters(locs);
        renderImageCards(locs);
      }
    });

    item.appendChild(mainBtn);
    item.appendChild(subList);
    container.appendChild(item);
  });
}

function initializeGuideMapUi() {
  renderAccordionNav();
  const initLocs = categoriesData[activeCategory].locationSets[activeFilter] || [];
  renderTopFilters(initLocs);
  renderImageCards(initLocs);
}

map.on("load", initializeGuideMapUi);