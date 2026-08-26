// ==========================================
// navbar.js — Global Header & Navbar
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
	// await injectScriptsAndStyles();
    injectHeader();
    //injectFooter();
    //setActiveNavItem();
});

function injectHeader() {

      const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './services-styles.css';
       
        document.head.appendChild(link);
    const headerHTML = `
        <div class="header" id="mainHeader" style="justify-content: start">
            <div class="logo">
                <img class="logoimg" src="/assests/img/3d.png" alt="محافظة دمشق" onclick="window.location.href='/platform/home.html'">
            </div>
            <!--<div class="navbar">
                <ul>
                    <li><a href="/platform/home.html">الرئيسية</a></li>
                    <li><a href="/platform/news.html">الأخبار</a></li>
                    <li><a href="/platform/culture.html">نظرة ثقافية</a></li>
                    <li><a href="/platform/services.html">الخدمات</a></li>
                    <li><a href="/platform/guide.html">دليل دمشق</a></li>
                    <li><a href="https://qasioundev.tamkeensy.com">الاستثمارات</a></li>
                    <li><a href="/platform/projects.html">المشاريع</a></li>
                    <li><a href="/platform/contact.html">اقتراحات</a></li>
                    <li>
                        <a class="nav-account-btn" onclick="_govSignin()">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-left:5px;">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                <circle cx="12" cy="7" r="4"/>
                            </svg>
                            تسجيل الدخول
                        </a>
                    </li>
                </ul>
            </div>-->
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    


}

function injectFooter() {
    if (document.getElementById('mainFooter')) return;

    const footerHTML = `
        <div class="footersec" id="mainFooter">
            <div class="f">
                <div class="fa">
                    <div class="fimg"><img src="./assests/img/logo-en.png" alt="محافظة دمشق"></div>
                    <div class="fparagraph">
                       
                    </div>
                </div>

                <div class="fb">
                    <div class="bb">
                        <p>روابط سريعة</p>
                        <br>
                        <a class="link" href="/platform/culture.html">نظرة ثقافية</a>
                        <a class="link" href="https://qasioundev.tamkeensy.com">رحلة قاسيون</a>
                        <a class="link" href="/platform/services.html">الخدمات</a>
                        <a class="link" href="/platform/contact.html">اقتراحات</a>
                    </div>

                    <div class="bc">
                        <div class="footer-contact-row">
                            <div class="footer-contact-icon" style="background-image: url(./assests/img/phone.png);"></div>
                            <p><a class="footer-contact-link" href="tel:+96311223344"><bdi dir="ltr">+963 11 22 33 44</bdi></a></p>
                        </div>
                        <div class="footer-contact-row">
                            <div class="footer-contact-icon" style="background-image: url(./assests/img/email.png);"></div>
                            <p><a class="footer-contact-link" href="mailto:damascus@moi.gov.sy"><bdi dir="ltr">damascus@moi.gov.sy</bdi></a></p>
                        </div>
                        <div class="footer-contact-row">
                            <div class="footer-contact-icon" style="background-image: url(./assests/img/location.png);"></div>
                            <p>دمشق - ساحة يوسف العظمة</p>
                        </div>
                        <br>
                        <div class="iconcontainer">
                            <a href="https://t.me/DamascusGov1" class="btn" aria-label="Telegram">
                                <img src="./assests/img/telegram.png" alt="">
                            </a>
                            <a href="https://x.com/DamascusGov1?fbclid=IwdGRjcAR_oc9jbGNrBH-hymV4dG4DYWVtAjExAHNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHrxH_GOjpQsKClmxI8nRn9FVTQP5MjlrqgxvC_S5WxwgzjIxWBTMRYCUfRch_aem_Nnp76voBypGebyQjhVZ7Zw" class="btn" aria-label="X">
                                <img src="./assests/img/twitter.png" alt="">
                            </a>
                            <a href="https://www.facebook.com/share/1BRhkDQ92D/" class="btn" aria-label="Facebook">
                                <img src="./assests/img/facebook.png" alt="">
                            </a>
                            <a href="https://www.instagram.com/damascusgov1?igsh=ZWdvYjQwemQ4dG5h" class="btn" aria-label="Instagram">
                                <img src="./assests/img/instagram.png" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="fc">
                    <p id="footerText">جميع الحقوق محفوظة - محافظة دمشق © 2026</p>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function refreshNavbar() {
	//await injectScriptsAndStyles();
    const oldHeader = document.getElementById('mainHeader');
    if (oldHeader) oldHeader.remove();
    injectHeader();
    injectFooter();
    setActiveNavItem();
}

function setActiveNavItem() {
    const links   = document.querySelectorAll('.navbar ul li a');
    const current = window.location.pathname.split('/').pop() || 'home.html';

    links.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.includes(current)) {
            link.closest('li').classList.add('active');
        }
    });

	var user = USER();
	if (user) {
		onLoginSuccess(user);
	}
}

function onLoginSuccess(user) {
	console.log(user);
    // 1. Find the parent list and the specific login item
    const navList = document.querySelector('.navbar ul');
    const loginItem = document.querySelector('.nav-account-btn').parentElement;

    // 2. Create the new list item containing the menu
    const userMenuLi = document.createElement('li');
    userMenuLi.className = 'user-menu-wrapper'; // Useful for CSS styling
    
    userMenuLi.innerHTML = `
		<div class="user-dropdown">
			<button class="nav-account-btn">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-left:5px;">
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
					<circle cx="12" cy="7" r="4"/>
				</svg>
			${user.USER_NAME.split(' ')[0]}</button>
			<div class="dropdown-panel">
				<span class="dropdown-item" onclick="_govOpenFrame(89, 0)">حسابي</span>
				<span class="dropdown-item" onclick="_govOpenFrame(91, 0)">الملف الشخصي</span>
				<span class="dropdown-item logout-red" onclick="_govLogout()">تسجيل الخروج</span>
			</div>
		</div>
	`;

    // 3. Replace the old login li with the new menu li
    navList.replaceChild(userMenuLi, loginItem);
}

window.getOuterContext = function() { return 'Bwork'; };
historyManager();

const chatButtonText = `
<!-- =================== FLOATING CHAT BUTTON =================== -->
<button id="ai-chat-btn" aria-label="مساعد ذكي">
  <span class="notif">1</span>
  <!-- chat bubble icon -->
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6V10h12v2zm0-3H6V7h12v2z"/>
  </svg>
</button>
`;

const botPanelText = `
<!-- =================== CHAT PANEL =================== -->
<div id="ai-chat-panel" role="dialog" aria-modal="true" aria-label="المساعد الذكي">

  <!-- Header -->
  <div id="chat-header">
    <div class="avatar">
      <svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z"/></svg>
    </div>
    <div class="info">
      <div class="name">مساعد البوابة الذكي</div>
      <div class="status">متاح الآن</div>
    </div>
    <button id="chat-close-btn" aria-label="إغلاق">✕</button>
  </div>

  <!-- Quick chips -->
  <div id="chat-chips">
    <span class="chip" data-q="ما هي خدماتكم؟">خدماتنا</span>
    <span class="chip" data-q="كيف أتقدم بطلب رخصة؟">المهن والرخص</span>
    <span class="chip" data-q="كيف أقدم شكوى؟">الشكاوى</span>
    <span class="chip" data-q="ما هو الدفع الإلكتروني؟">الدفع</span>
    <span class="chip" data-q="عن الشؤون المالية؟">الشؤون المالية</span>
  </div>

  <!-- Messages -->
  <div id="chat-messages"></div>

  <!-- Input -->
  <div id="chat-input-area">
    <button id="chat-send-btn" aria-label="إرسال">
      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </button>
    <textarea id="chat-input" placeholder="اكتب سؤالك هنا..." rows="1"></textarea>
  </div>
</div>
`;

/* ============================================================
   AI CHAT HELPER  –  called via window.onload
   ============================================================ */
function initAIChatHelper() {
	const chatBtn = document.createElement('button');
	chatBtn.innerHTML = chatButtonText;
	document.body.appendChild(chatBtn);

	const botPanelDiv = document.createElement('div');
	botPanelDiv.innerHTML = botPanelText;
	document.body.appendChild(botPanelDiv);

  /* ---------- knowledge base ---------- */
  const KB = [
    {
      keywords: ['خدمات', 'تقدم', 'ماذا', 'ما هي', 'عن الموقع', 'تعرف', 'نبذة'],
      answer: `مرحباً! 👋 تقدم البوابة مجموعة من الخدمات الإلكترونية الحكومية، تشمل:\n\n• **الشؤون المالية** – إدارة المدفوعات والرسوم\n• **التنظيم والتخطيط العمراني** – تراخيص البناء والتخطيط\n• **المهن والرخص** – استخراج وتجديد التراخيص المهنية\n• **الشكاوى** – تقديم وتتبع الشكاوى\n• **الخدمات الخارجية** – خدمات متنوعة للمتعاملين الخارجيين\n• **الدفع الإلكتروني** – سداد الرسوم بأمان\n• **المرسوم 66** – خدمات مرتبطة بالمرسوم التنظيمي رقم 66\n• **السجل المؤقت** – تسجيل مؤقت للمنشآت والأنشطة\n• **تصريح فعالية** – استخراج تصاريح إقامة الفعاليات\n\nهل تريد التفاصيل عن خدمة بعينها؟`
    },
    {
      keywords: ['مالية', 'شؤون مالية', 'رسوم', 'مدفوعات'],
      answer: `💰 **الشؤون المالية**\n\nتتيح لك هذه الخدمة:\n• الاطلاع على الرسوم والمستحقات المالية\n• سداد الفواتير الحكومية\n• الاستعلام عن حالة الدفعات\n• طباعة الإيصالات والفواتير\n\nيمكنك الوصول إلى هذه الخدمة مباشرةً من لوحة الخدمات الرئيسية. هل تحتاج مساعدة إضافية؟`
    },
    {
      keywords: ['تخطيط', 'عمراني', 'تنظيم', 'بناء'],
      answer: `🏙️ **التنظيم والتخطيط العمراني**\n\nتشمل هذه الخدمة:\n• طلبات تراخيص البناء والهدم\n• الاستعلام عن مخططات التنظيم\n• اعتماد المخططات الهندسية\n• متابعة طلبات التخطيط العمراني\n\nيرجى تجهيز المستندات اللازمة (الهوية، عقد الملكية، المخططات) عند تقديم طلبك.`
    },
    {
      keywords: ['رخصة', 'ترخيص', 'مهن', 'رخص', 'تجديد رخصة', 'مهنة'],
      answer: `📄 **المهن والرخص**\n\nمن خلال هذه الخدمة يمكنك:\n• تقديم طلب استخراج رخصة مهنية جديدة\n• تجديد رخصة قائمة\n• الاستعلام عن حالة الطلب\n• دفع رسوم الترخيص إلكترونياً\n\n**الخطوات:**\n1. تسجيل الدخول بحساب المتعامل\n2. اختيار "المهن والرخص"\n3. تعبئة النموذج ورفع المستندات\n4. سداد الرسوم والمتابعة\n\nهل لديك استفسار محدد؟`
    },
    {
      keywords: ['شكوى', 'شكاوى', 'تقديم شكوى', 'بلاغ'],
      answer: `📋 **الشكاوى والبلاغات**\n\nيتيح نظام الشكاوى:\n• تقديم شكوى جديدة بسهولة\n• متابعة حالة الشكوى المقدمة\n• تلقّي إشعارات بآخر المستجدات\n• إرفاق المستندات والصور الداعمة\n\n**للتقديم:** اضغط على خدمة "الشكاوى" من الصفحة الرئيسية، أدخل بياناتك واشرح مشكلتك بالتفصيل.\n\nملاحظة: سيتم الرد خلال 5–7 أيام عمل.`
    },
    {
      keywords: ['دفع', 'الدفع الإلكتروني', 'بطاقة', 'سداد', 'فاتورة'],
      answer: `💳 **الدفع الإلكتروني**\n\nنوفر بيئة دفع آمنة تدعم:\n• **بطاقات الائتمان والخصم** (Visa / MasterCard)\n• **التحويل البنكي** المباشر\n• **محافظ الدفع الإلكتروني**\n\nجميع المعاملات مشفّرة ومؤمّنة. يمكنك طباعة الإيصال فور اكتمال الدفع.\n\nهل تواجه مشكلة في عملية الدفع؟`
    },
    {
      keywords: ['مرسوم', '66', 'مرسوم 66'],
      answer: `📜 **المرسوم 66**\n\nيُنظّم هذا المرسوم عدداً من الأنشطة والمنشآت. تتيح لك الخدمة:\n• الاطلاع على نص المرسوم ولوائحه التنفيذية\n• تقديم طلبات مرتبطة بالمرسوم\n• الاستعلام عن الامتثال والاشتراطات\n• تسجيل المنشأة وفق أحكام المرسوم\n\nللمزيد من التفاصيل يُرجى التواصل مع الجهة المختصة أو زيارة الخدمة مباشرةً.`
    },
    {
      keywords: ['سجل', 'مؤقت', 'السجل المؤقت', 'تسجيل مؤقت'],
      answer: `🗂️ **السجل المؤقت**\n\nيُتيح لك هذا السجل:\n• تسجيل منشأة أو نشاط تجاري بصورة مؤقتة ريثما تكتمل الإجراءات الرسمية\n• الحصول على رقم سجل للتعامل مع الجهات الأخرى\n• تحديث البيانات وإكمال التسجيل الدائم لاحقاً\n\nمدة السجل المؤقت قابلة للتمديد وفق اللوائح المعمول بها.`
    },
    {
      keywords: ['فعالية', 'تصريح', 'حفل', 'مناسبة', 'مهرجان', 'ترخيص فعالية'],
      answer: `🎪 **تصريح فعالية**\n\nهل تخطط لإقامة فعالية؟ الخدمة تتيح لك:\n• تقديم طلب تصريح لإقامة فعاليات عامة أو خاصة\n• تحديد تفاصيل الفعالية (النوع، الموقع، المدة)\n• رفع الوثائق الداعمة (تأمين، خطط الأمن، وغيرها)\n• استلام التصريح إلكترونياً عند الموافقة\n\nيُنصح بتقديم الطلب قبل موعد الفعالية بـ 14 يوم عمل على الأقل.`
    },
    {
      keywords: ['خارجية', 'خدمات خارجية'],
      answer: `🌐 **الخدمات الخارجية**\n\nتشمل هذه الخدمة:\n• التعامل مع الجهات والشركاء الخارجيين\n• خدمات للمقيمين والزوار من خارج النطاق المحلي\n• ربط الإجراءات مع جهات حكومية أخرى\n\nيُرجى تجهيز الوثائق اللازمة وتسجيل الدخول للاستفادة من هذه الخدمات.`
    },
    {
      keywords: ['ساعات', 'وقت', 'دوام', 'متاح', 'عمل'],
      answer: `🕐 **أوقات الخدمة**\n\nالبوابة الإلكترونية متاحة **24 ساعة / 7 أيام** طوال الأسبوع.\n\nأما الدعم البشري فيعمل خلال:\n• الأحد – الخميس: 8 صباحاً – 3 مساءً\n\nللطوارئ تواصل عبر البريد الإلكتروني أو الخط الساخن.`
    },
    {
      keywords: ['تسجيل', 'حساب', 'اشتراك', 'دخول', 'كلمة مرور'],
      answer: `🔐 **تسجيل الدخول والحساب**\n\nللاستفادة من الخدمات:\n1. اضغط "تسجيل الدخول" في أعلى الصفحة\n2. أدخل اسم المستخدم وكلمة المرور\n3. أو سجّل حساباً جديداً إن كنت تزور البوابة لأول مرة\n\nإذا نسيت كلمة المرور، استخدم خيار "نسيت كلمة المرور" وسيصلك رمز التحقق على الجوال.`
    },
    {
      keywords: ['شكرا', 'شكراً', 'ممتاز', 'رائع', 'جيد', 'حسنا', 'حسناً'],
      answer: `😊 على الرحب والسعة! يسعدنا خدمتك دائماً.\nإذا كان لديك أي استفسار آخر فلا تتردد في السؤال. 🌟`
    },
    {
      keywords: ['مرحبا', 'مرحباً', 'السلام', 'اهلا', 'أهلاً', 'هلا', 'هاي', 'hi', 'hello'],
      answer: `أهلاً وسهلاً! 👋 أنا مساعد البوابة الذكي.\nيمكنني مساعدتك في:\n• التعرف على خدمات البوابة\n• الإرشاد لكيفية تقديم الطلبات\n• الإجابة على أسئلتك حول الرسوم والإجراءات\n\nما الذي يمكنني مساعدتك به اليوم؟`
    },
  ];

  /* ---------- fallback ---------- */
  const FALLBACK = `شكراً على سؤالك 🙏\nلم أتمكن من فهم استفساركم بشكل كامل، لكن يمكنني مساعدتك في الخدمات التالية:\n\n• المهن والرخص\n• الشكاوى\n• الدفع الإلكتروني\n• التنظيم العمراني\n• المرسوم 66\n• تصريح فعالية\n\nيُرجى إعادة صياغة سؤالك أو اختيار إحدى الخدمات أعلاه.`;

  /* ---------- elements ---------- */
  const btn        = document.getElementById('ai-chat-btn');
  const panel      = document.getElementById('ai-chat-panel');
  const closeBtn   = document.getElementById('chat-close-btn');
  const messagesEl = document.getElementById('chat-messages');
  const inputEl    = document.getElementById('chat-input');
  const sendBtn    = document.getElementById('chat-send-btn');
  const chipsEl    = document.getElementById('chat-chips');
  const notifDot   = btn.querySelector('.notif');

  let isOpen   = false;
  let isTyping = false;

  /* ---------- helpers ---------- */
  function getTime() {
    const d = new Date();
    return d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  }

  function scrollToBottom() {
    setTimeout(() => { messagesEl.scrollTop = messagesEl.scrollHeight; }, 50);
  }

  function appendTimestamp() {
    const t = document.createElement('div');
    t.className = 'msg-time';
    t.textContent = getTime();
    messagesEl.appendChild(t);
  }

  function formatText(text) {
    // bold **text**
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function addMessage(text, sender) {
    const row = document.createElement('div');
    row.className = `msg-row ${sender}`;

    const av = document.createElement('div');
    av.className = `msg-avatar ${sender === 'bot' ? 'bot-av' : 'user-av'}`;
    av.textContent = sender === 'bot' ? '🤖' : 'أنت';

    const bubble = document.createElement('div');
    bubble.className = `bubble ${sender}`;
    bubble.innerHTML = formatText(text);

    row.appendChild(av);
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    appendTimestamp();
    scrollToBottom();
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'msg-row bot';
    row.id = 'typing-indicator';

    const av = document.createElement('div');
    av.className = 'msg-avatar bot-av';
    av.textContent = '🤖';

    const typing = document.createElement('div');
    typing.className = 'typing-bubble';
    typing.innerHTML = '<span></span><span></span><span></span>';

    row.appendChild(av);
    row.appendChild(typing);
    messagesEl.appendChild(row);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  /* ---------- AI respond ---------- */
  function getBotAnswer(query) {
    const q = query.toLowerCase().trim();
    for (const entry of KB) {
      if (entry.keywords.some(kw => q.includes(kw.toLowerCase()))) {
        return entry.answer;
      }
    }
    return FALLBACK;
  }

  function botRespond(userText) {
    if (isTyping) return;
    isTyping = true;

    showTyping();
    const delay = 900 + Math.random() * 700;

    setTimeout(() => {
      hideTyping();
      const answer = getBotAnswer(userText);
      addMessage(answer, 'bot');
      isTyping = false;
    }, delay);
  }

  /* ---------- send ---------- */
  function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isTyping) return;

    addMessage(text, 'user');
    inputEl.value = '';
    inputEl.style.height = 'auto';
    botRespond(text);
  }

  /* ---------- toggle panel ---------- */
  function openPanel() {
    panel.classList.add('open');
    isOpen = true;
    if (notifDot) notifDot.style.display = 'none';
    setTimeout(() => inputEl.focus(), 300);
  }

  function closePanel() {
    panel.classList.remove('open');
    isOpen = false;
  }

  /* ---------- event listeners ---------- */
  btn.addEventListener('click', () => { isOpen ? closePanel() : openPanel(); });
  closeBtn.addEventListener('click', closePanel);

  sendBtn.addEventListener('click', sendMessage);

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  // auto-resize textarea
  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + 'px';
  });

  // chips
  chipsEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const q = chip.dataset.q;
    inputEl.value = q;
    sendMessage();
  });

  // close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
      closePanel();
    }
  });

  /* ---------- welcome message ---------- */
  setTimeout(() => {
    addMessage('أهلاً بك في البوابة الإلكترونية! 👋\nأنا مساعدك الذكي، يمكنني الإجابة على أسئلتك حول خدماتنا.\nاضغط على أحد الاختيارات أدناه أو اكتب سؤالك مباشرةً.', 'bot');
  }, 400);
}

window.onload = function () {
  initAIChatHelper();
};