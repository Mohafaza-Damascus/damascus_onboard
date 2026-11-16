window.SiteFiles = (function () {
  const FILES = {
    news: { path: "js/news-data.js", global: "NEWS_DATA" },
    opportunities: { path: "js/opportunities-seed.js", global: "OPPORTUNITIES_DATA" },
    events: { path: "js/events-data.js", global: "EVENTS_DATA" },
    services: { path: "pages/services-form/services-list.js", global: "DAMASCUS_SERVICES" },
  };

  const SITE_ROOT = new URL("../", document.currentScript.src).href;
  let folder = null;

  function openDb() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("damascus-dashboard", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("handles");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function savedFolder(value) {
    const db = await openDb();
    return new Promise((resolve) => {
      const store = db.transaction("handles", "readwrite").objectStore("handles");
      const request = value ? store.put(value, "site") : store.get("site");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    });
  }

  async function isSiteFolder(handle) {
    try {
      const js = await handle.getDirectoryHandle("js");
      await js.getFileHandle("news-data.js");
      return true;
    } catch {
      return false;
    }
  }

  function showGate(message) {
    return new Promise((resolve) => {
      const gate = document.createElement("div");
      gate.className = "dash-login";
      gate.innerHTML = `
        <div class="dash-login__box">
          <h1>ربط</h1>
          <p class="dash-login__error" role="alert"${message ? "" : " hidden"}>${message || ""}</p>
          <button type="button">اختيار</button>
        </div>`;
      document.body.appendChild(gate);

      const errorEl = gate.querySelector(".dash-login__error");
      gate.querySelector("button").addEventListener("click", async () => {
        try {
          let handle = await savedFolder();
          if (!handle || (await handle.requestPermission({ mode: "readwrite" })) !== "granted") {
            handle = await window.showDirectoryPicker({ id: "damascus-portal", mode: "readwrite" });
          }
          if (!(await isSiteFolder(handle))) {
            await savedFolder(null);
            throw new Error("هذا ليس مجلد الموقع. اختر مجلد damascus-portal.");
          }
          await savedFolder(handle);
          folder = handle;
          gate.remove();
          resolve();
        } catch (error) {
          if (error.name === "AbortError") return;
          errorEl.textContent = error.message;
          errorEl.hidden = false;
        }
      });
    });
  }

  async function ready() {
    if (!window.showDirectoryPicker) {
      await showGate("المتصفح لا يدعم الحفظ على الملفات. افتح لوحة التحكم من Chrome أو Edge.");
      return;
    }
    const handle = await savedFolder();
    if (handle && (await handle.queryPermission({ mode: "readwrite" })) === "granted") {
      folder = handle;
      return;
    }
    await showGate();
  }

  async function getFile(path, create = false) {
    const parts = path.split("/");
    const fileName = parts.pop();
    let dir = folder;
    for (const part of parts) dir = await dir.getDirectoryHandle(part, { create });
    return dir.getFileHandle(fileName, { create });
  }

  async function writeFile(path, content) {
    const file = await getFile(path, true);
    const writable = await file.createWritable();
    await writable.write(content);
    await writable.close();
  }

  async function read(name) {
    const response = await fetch(SITE_ROOT + FILES[name].path, { cache: "no-store" });
    const text = await response.text();
    return JSON.parse(text.replace(/^[^=]*=\s*/, "").replace(/;\s*$/, ""));
  }

  async function write(name, list) {
    const { path, global } = FILES[name];
    await writeFile(path, `window.${global} = ${JSON.stringify(list, null, 2)};\n`);
    window[global] = list;
  }

  async function upload(blob) {
    const isPdf = blob.type === "application/pdf";
    const ext = isPdf ? "pdf" : (blob.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
    const fileName = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
    const dir = isPdf ? "assets/docs/uploads" : "images/uploads";
    await writeFile(`${dir}/${fileName}`, blob);
    return `../${dir}/${fileName}`;
  }

  return { FILES, ready, read, write, upload };
})();
