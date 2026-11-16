document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");
  const service = getServiceById(id);

  if (!service) {
    document.getElementById("serviceLayout").classList.add("is-missing");
    document.getElementById("serviceName").textContent = "تعذّر عرض الخدمة";
    document.getElementById("serviceDescription").textContent =
      "لم يتم العثور على الخدمة. ارجع إلى دليل المعاملات واختر الخدمة من جديد.";
    return;
  }

  document.title = `${service.name} - محافظة دمشق`;
  document.getElementById("serviceName").textContent = service.name;
  document.getElementById("serviceDescription").textContent = service.description || "لا يوجد وصف لهذه الخدمة.";

  let facts = "";
  if (service.directorate) facts += factHtml("fa-solid fa-sitemap", "المديرية", service.directorate);
  facts += factHtml("fa-solid fa-building", "طريقة تقديم الطلب", "حضورياً في الدائرة المختصة");
  if (service.physicalPlace) facts += factHtml("fa-solid fa-location-dot", "مكان تقديم الطلب", service.physicalPlace);
  document.getElementById("serviceFacts").innerHTML = facts;

  showList("stepsList", service.stages, "لم تتم إضافة خطوات لهذه الخدمة.");
  showList("papersList", service.papers, "لم تتم إضافة أوراق مطلوبة لهذه الخدمة.");
  showList("feesList", service.fees, "لم تتم إضافة رسوم لهذه الخدمة.");

  document.getElementById("printBtn").addEventListener("click", () => window.print());

  const copyButton = document.getElementById("copyLinkBtn");
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(location.href);
    copyButton.querySelector("span").textContent = "تم نسخ الرابط";
  });

  function factHtml(icon, label, value) {
    return `
      <div class="sd-fact">
        <dt><i class="${icon}"></i> ${label}</dt>
        <dd>${escapeHtml(value)}</dd>
      </div>`;
  }

  function showList(elementId, text, emptyText) {
    const items = textToList(text);
    const list = document.getElementById(elementId);

    if (items.length) {
      list.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    } else {
      list.outerHTML = `<p class="sd-empty">${emptyText}</p>`;
    }
  }
});
