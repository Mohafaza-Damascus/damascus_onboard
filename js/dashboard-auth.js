window.DashAuth = (function () {
  "use strict";

  function newId(name, list) {
    if (name === "opportunities" || name === "events") {
      return list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
    }
    return name + "-" + Date.now().toString(36);
  }

  async function api(path, { method = "GET", body } = {}) {
    const [section, name, id] = path.split("/").map(decodeURIComponent);

    if (section === "backup") {
      const backup = { exportedAt: new Date().toISOString() };
      for (const key of Object.keys(SiteFiles.FILES)) backup[key] = await SiteFiles.read(key);
      return backup;
    }

    if (section !== "data" || !SiteFiles.FILES[name]) {
      throw new Error("غير موجود.");
    }

    const list = await SiteFiles.read(name);
    const now = new Date().toISOString();

    if (method === "GET") {
      return { items: list };
    }

    if (method === "POST") {
      const item = { ...body, id: newId(name, list), createdAt: now, updatedAt: now };
      list.push(item);
      await SiteFiles.write(name, list);
      return { item };
    }

    const index = list.findIndex((entry) => String(entry.id) === String(id));
    if (index === -1) throw new Error("العنصر غير موجود، ربما حُذف.");

    if (method === "PUT") {
      const item = { ...body, id: list[index].id, createdAt: list[index].createdAt, updatedAt: now };
      list[index] = item;
      await SiteFiles.write(name, list);
      return { item };
    }

    if (method === "DELETE") {
      list.splice(index, 1);
      await SiteFiles.write(name, list);
      return { ok: true };
    }

    throw new Error("طلب غير مسموح.");
  }

  function ready() {
    return SiteFiles.ready();
  }

  function logout() {
    location.reload();
  }

  function compressImage(file, maxSize = 1000, quality = 0.75) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("تعذّر قراءة الصورة."));
      };
      img.onload = () => {
        URL.revokeObjectURL(url);
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("تعذّر تجهيز الصورة."))),
          "image/jpeg",
          quality,
        );
      };
      img.src = url;
    });
  }

  function upload(blob) {
    return SiteFiles.upload(blob);
  }

  return { api, ready, logout, upload, compressImage };
})();
