document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const service = getServiceById(id);

  if (!service) {
    document.getElementById("guideTitle").textContent = "تعذر العثور على الخدمة";
    document.getElementById("guideDescription").textContent = "ارجع إلى صفحة الخدمات الإلكترونية واختر الخدمة من جديد.";
    document.getElementById("missingServiceName").textContent = "الخدمة الإلكترونية";
    document.getElementById("guideMissing").hidden = false;
    document.getElementById("electronicServiceLayout").classList.add("is-missing");
    return;
  }

  document.title = `دليل ${service.name} - محافظة دمشق`;
  document.getElementById("guideTitle").textContent = `دليل ${service.name}`;
  document.getElementById("guideDescription").textContent = service.description || "لا يوجد وصف لهذه الخدمة.";
  document.getElementById("guideFacts").innerHTML = `
    <div class="sd-fact">
      <dt><i class="fa-solid fa-sitemap"></i> المديرية</dt>
      <dd>${escapeHtml(service.directorate || service.electronicDirectorate || "غير محددة")}</dd>
    </div>`;

  showList("guideFees", service.fees, "لم تتم إضافة الرسوم بعد.");
  showList("guidePapers", service.papers, "لم تتم إضافة الأوراق المطلوبة بعد.");
  showList("guideSteps", service.stages, "لم تتم إضافة الخطوات بعد.");

  const startButton = document.getElementById("startServiceBtn");
  if (service.serviceUrl) {
    startButton.href = service.serviceUrl;
    startButton.target = "_blank";
  } else {
    startButton.removeAttribute("href");
    startButton.classList.add("is-soon");
    startButton.textContent = "قريباً";
  }

  const copyButton = document.getElementById("copyGuideLinkBtn");
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(location.href);
    copyButton.querySelector("span").textContent = "تم نسخ الرابط";
  });

  function showList(elementId, text, emptyText) {
    const items = textToList(text);
    const list = document.getElementById(elementId);

    list.innerHTML = items.length
      ? items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
      : `<li class="sd-empty-item">${emptyText}</li>`;
  }
});
