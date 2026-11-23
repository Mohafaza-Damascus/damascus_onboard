const SITE_ROOT = new URL("../../", document.currentScript.src).href;
const DEFAULT_SERVICE_IMAGE = SITE_ROOT + "images/brand/governorate.png";

function getServices() {
  return window.DAMASCUS_SERVICES || [];
}

function getServiceById(id) {
  return getServices().find((service) => String(service.id) === String(id));
}

function isElectronic(service) {
  return service.requestPlace === "إلكتروني";
}

function serviceImage(service) {
  const image = service.image || "";

  if (!image) return DEFAULT_SERVICE_IMAGE;
  if (/^(data:|blob:|https?:)/.test(image)) return image;

  return SITE_ROOT + image.replace(/^(\.\.\/|\/)+/, "");
}

function textToList(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.replace(/^\s*[\d٠-٩]+\s*[-.)]\s*/, "").trim())
    .filter((line) => line !== "");
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
