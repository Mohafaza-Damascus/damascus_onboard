const DIRECTORATES = [
  "مديرية مكتب السيد المحافظ",
  "مديرية المعلوماتية",
  "مديرية دعم القرار والتخطيط الإقليمي",
  "مديرية الصحافة والثقافة والإعلام",
  "مديرية التنمية الإدارية",
  "مديرية شؤون الأملاك",
  "مديرية التنظيم والتخطيط العمراني",
  "مديرية المجالس المحلية ومكاتبها التنفيذية",
  "مديرية القضايا والشؤون القانونية",
  "مديرية الرقابة الداخلية",
  "مديرية مراكز خدمة المواطن",
  "قسم الجاهزية",
  "أمين اللجنة الاستشارية للقانون /8/",
  "مديرية العلاقات العامة",
  "مديرية الشؤون المالية",
  "مديرية الأنشطة الرياضية والثقافية (نادي المحافظة)",
  "قسم شرطة المحافظة",
  "مديرية مدينة دمشق القديمة",
  "مكتب التنمية المحلية",
  "مديرية إعادة الإعمار",
  "مديرية شؤون البيئة",
];

const CATEGORIES = [
  "الشكاوى",
  "مديرية التنظيم والتخطيط العمراني",
  "المهن والرخص",
  "مديرية السجل المؤقت",
  "مديرية المجالس",
  "مديرية المالية",
  "مكتب دفن الموتى",
  "مديرية الأملاك",
  "المرسوم 66",
  "دوائر الخدمات",
  "مديرية هندسة المرور",
];

const listView = document.getElementById("listView");
const formView = document.getElementById("formView");
const servicesList = document.getElementById("servicesList");
const searchInput = document.getElementById("searchInput");
const chips = document.getElementById("chips");
const form = document.getElementById("serviceForm");
const formError = document.getElementById("formError");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const removeImageBtn = document.getElementById("removeImageBtn");

let selectedType = "all";
let editingId = null;
let currentImage = "";
let pendingImage = null;

let saveQueue = Promise.resolve();
let pendingSaves = 0;

function applyService(list, service) {
  const index = list.findIndex((item) => String(item.id) === String(service.id));
  if (index === -1) list.push(service);
  else list[index] = { ...list[index], ...service };
}

function saveInBackground(change, doneMessage) {
  pendingSaves++;
  showToast("جارٍ الحفظ...", true);

  saveQueue = saveQueue
    .then(async () => {
      const list = await SiteFiles.read("services");
      const result = (await change(list)) || list;
      await SiteFiles.write("services", result);
      showToast(doneMessage);
    })
    .catch(async (error) => {
      showToast("تعذّر الحفظ: " + error.message);
      window.DAMASCUS_SERVICES = await SiteFiles.read("services");
    })
    .finally(() => {
      pendingSaves--;
      if (formView.hidden) renderList();
    });
}

async function refreshServices() {
  if (pendingSaves > 0 || !formView.hidden) return;
  window.DAMASCUS_SERVICES = await SiteFiles.read("services");
  renderList();
}

window.addEventListener("focus", refreshServices);

window.addEventListener("beforeunload", (event) => {
  if (pendingSaves > 0) event.preventDefault();
});

function renderList() {
  const services = getServices();
  const query = searchInput.value.trim();

  document.getElementById("countAll").textContent = services.length;
  document.getElementById("countPaper").textContent = services.filter((s) => !isElectronic(s)).length;
  document.getElementById("countElectronic").textContent = services.filter(isElectronic).length;

  const shown = services
    .filter((s) => selectedType === "all" || s.requestPlace === selectedType)
    .filter((s) => `${s.name} ${s.description} ${s.directorate}`.includes(query))
    .reverse();

  servicesList.innerHTML = shown.length
    ? shown.map(serviceRowHtml).join("")
    : `<p class="feed-empty">لا توجد خدمات.</p>`;
}

function serviceRowHtml(service) {
  const electronic = isElectronic(service);
  const siteLink = electronic
    ? `../electronic-service-guide.html?id=${encodeURIComponent(service.id)}`
    : `../services_details/guide-details.html?id=${encodeURIComponent(service.id)}`;

  return `
    <article class="item">
      <span class="item-img"><img src="${serviceImage(service)}" alt="" loading="lazy" /></span>
      <div class="item-body">
        <div class="item-meta">
          <span class="tag ${electronic ? "tag-activity" : "tag-decision"}">${electronic ? "إلكترونية" : "ورقية"}</span>
          <span class="date">${escapeHtml(service.directorate || "بدون مديرية")}</span>
        </div>
        <h3>${escapeHtml(service.name)}</h3>
        <p>${escapeHtml(service.description)}</p>
      </div>
      <div class="item-actions">
        <a class="icon-btn" href="${siteLink}" target="_blank" title="عرض على الموقع"><i class="fa-regular fa-eye"></i></a>
        <button type="button" class="icon-btn" data-edit="${escapeHtml(service.id)}" title="تعديل"><i class="fa-solid fa-pen"></i></button>
        <button type="button" class="icon-btn danger" data-delete="${escapeHtml(service.id)}" title="حذف"><i class="fa-solid fa-trash"></i></button>
      </div>
    </article>`;
}

servicesList.addEventListener("click", (event) => {
  const editBtn = event.target.closest("[data-edit]");
  const deleteBtn = event.target.closest("[data-delete]");

  if (editBtn) openForm(getServiceById(editBtn.dataset.edit));

  if (deleteBtn) {
    const service = getServiceById(deleteBtn.dataset.delete);
    if (confirm(`حذف الخدمة "${service.name}"؟`)) {
      const isDeleted = (item) => String(item.id) === String(service.id);
      window.DAMASCUS_SERVICES = getServices().filter((item) => !isDeleted(item));
      renderList();
      saveInBackground((list) => list.filter((item) => !isDeleted(item)), "تم الحذف.");
    }
  }
});

chips.addEventListener("click", (event) => {
  const chip = event.target.closest("[data-type]");
  if (!chip) return;
  event.preventDefault();

  selectedType = chip.dataset.type;
  chips.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
  renderList();
});

searchInput.addEventListener("input", renderList);

function fillSelect(select, options) {
  select.innerHTML =
    `<option value="">اختر...</option>` +
    options.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
}

function openForm(service) {
  form.reset();
  formError.hidden = true;
  editingId = service ? service.id : null;
  document.getElementById("formTitle").textContent = service ? "تعديل الخدمة" : "خدمة جديدة";

  if (service) {
    ["name", "description", "papers", "fees", "stages", "physicalPlace", "serviceUrl"].forEach((key) => {
      form.elements[key].value = service[key] || "";
    });
    setSelectValue(form.elements.directorate, service.directorate);
    setSelectValue(form.elements.electronicDirectorate, service.electronicDirectorate);
    form.elements.requestPlace.value = isElectronic(service) ? "إلكتروني" : "مكاني";
  }

  setImage(service && service.image ? service.image : "");
  togglePlaceFields();

  listView.hidden = true;
  formView.hidden = false;
  window.scrollTo(0, 0);
}

function setSelectValue(select, value) {
  if (value && ![...select.options].some((o) => o.value === value)) {
    select.add(new Option(value, value));
  }
  select.value = value || "";
}

function closeForm() {
  formView.hidden = true;
  listView.hidden = false;
  renderList();
}

function togglePlaceFields() {
  const electronic = form.elements.requestPlace.value === "إلكتروني";
  document.getElementById("paperFields").hidden = electronic;
  document.getElementById("electronicFields").hidden = !electronic;
}

form.querySelectorAll('[name="requestPlace"]').forEach((radio) => {
  radio.addEventListener("change", togglePlaceFields);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const f = form.elements;
  const electronic = f.requestPlace.value === "إلكتروني";

  const service = {
    id: editingId || String(Date.now()),
    name: f.name.value.trim(),
    directorate: f.directorate.value,
    description: f.description.value.trim(),
    papers: f.papers.value.trim(),
    fees: f.fees.value.trim(),
    stages: f.stages.value.trim(),
    requestPlace: f.requestPlace.value,
    physicalPlace: electronic ? "" : f.physicalPlace.value.trim(),
    electronicDirectorate: electronic ? f.electronicDirectorate.value : "",
    serviceUrl: electronic ? f.serviceUrl.value.trim() : "",
  };

  if (!service.name) return showError("يرجى كتابة اسم الخدمة.");
  if (!service.description) return showError("يرجى كتابة وصف الخدمة.");
  if (!electronic && !service.physicalPlace) return showError("يرجى كتابة مكان تقديم الطلب.");
  if (electronic && !service.electronicDirectorate) return showError("يرجى اختيار تصنيف الخدمة الإلكترونية.");

  const now = new Date().toISOString();
  const newImage = pendingImage;
  service.image = currentImage;
  service.updatedAt = now;
  if (!editingId) service.createdAt = now;

  applyService(getServices(), service);
  closeForm();

  saveInBackground(
    async (list) => {
      if (newImage) service.image = await SiteFiles.upload(newImage);
      applyService(list, service);
    },
    editingId ? "تم حفظ التعديلات." : "تمت إضافة الخدمة.",
  );
});

function showError(message) {
  formError.textContent = message;
  formError.hidden = false;
  formError.scrollIntoView({ behavior: "smooth", block: "center" });
}

function setImage(src) {
  currentImage = src;
  pendingImage = null;
  imagePreview.hidden = !src;
  imagePreview.src = src ? serviceImage({ image: src }) : "";
  removeImageBtn.hidden = !src;
}

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    const maxSize = 800;
    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        setImage(URL.createObjectURL(blob));
        pendingImage = blob;
      },
      "image/jpeg",
      0.75,
    );
  };
  img.src = URL.createObjectURL(file);
});

removeImageBtn.addEventListener("click", () => setImage(""));

document.getElementById("addBtn").addEventListener("click", () => openForm(null));
document.getElementById("cancelBtn").addEventListener("click", closeForm);

let toastTimer = null;

function showToast(message, keepOpen = false) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  if (!keepOpen) toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
}

async function start() {
  await SiteFiles.ready();
  window.DAMASCUS_SERVICES = await SiteFiles.read("services");
  fillSelect(form.elements.directorate, DIRECTORATES);
  fillSelect(form.elements.electronicDirectorate, CATEGORIES);
  renderList();
}

start();
