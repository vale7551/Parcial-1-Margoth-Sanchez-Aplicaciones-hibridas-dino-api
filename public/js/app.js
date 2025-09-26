document.addEventListener("DOMContentLoaded", () => {
  const baseUrl =
    location.protocol === "file:" ? "http://localhost:3000" : location.origin;
  const baseUrlEl = document.getElementById("baseUrl");
  if (baseUrlEl) baseUrlEl.textContent = baseUrl;

  const repoLink = document.getElementById("repoLink");
  if (repoLink && repoLink.href === "#")
    repoLink.href = "https://github.com/tu-usuario/tu-repo";

  const resStatus = document.getElementById("resStatus");
  const resBody = document.getElementById("resBody");

  function showResponse(status, body) {
    if (resStatus) resStatus.textContent = status;
    if (resBody) {
      try {
        resBody.textContent =
          typeof body === "string" ? body : JSON.stringify(body, null, 2);
      } catch (e) {
        resBody.textContent = String(body);
      }
    }
  }

  async function fetchJson(url, opts = {}) {
    const r = await fetch(url, opts);
    let body = null;
    try {
      body = await r.json();
    } catch (e) {}
    return { status: r.status, body };
  }

  const getCleanId = (elId) => {
    const raw = (document.getElementById(elId) || {}).value || "";
    return raw.replace(/["'\s]/g, "").trim();
  };

  const isObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // Boton limpiar
  const clearBtn = document.getElementById("clearResp");
  if (clearBtn)
    clearBtn.addEventListener("click", () => showResponse("--", "--"));

  // (POST)
  const formCreate = document.getElementById("formCreate");
  if (formCreate) {
    formCreate.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.target;
      const nombre = ((f.nombre && f.nombre.value) || "").trim();
      const periodo = (f.periodo && f.periodo.value) || "";
      const dieta = (f.dieta && f.dieta.value) || "";
      const longitudRaw = (f.longitud_metros && f.longitud_metros.value) || "";
      const descubridor = ((f.descubridor && f.descubridor.value) || "").trim();

      const longitud_metros = Number(longitudRaw);

      //  validación mínima
      if (
        !nombre ||
        !periodo ||
        !dieta ||
        !descubridor ||
        Number.isNaN(longitud_metros) ||
        longitud_metros <= 0
      ) {
        return showResponse(400, {
          error: "Completá todos los campos con valores válidos.",
        });
      }

      const data = { nombre, periodo, dieta, longitud_metros, descubridor };

      try {
        const { status, body } = await fetchJson(baseUrl + "/api/dinosaurios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        showResponse(status, body ?? "Sin body JSON");

        if (status === 201 && body && body._id) {
          const idField = document.getElementById("deleteId");
          const updateField = document.getElementById("updateId");
          if (idField) idField.value = body._id;
          if (updateField) updateField.value = body._id;
        }
      } catch (err) {
        showResponse("ERROR", err.message);
      }
    });
  }

  // (PUT)
  const formUpdate = document.getElementById("formUpdate");
  if (formUpdate) {
    formUpdate.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = getCleanId("updateId");
      if (!id) return showResponse(400, { error: "Falta ID" });
      if (!isObjectId(id))
        return showResponse(400, { error: "ID inválido (debe ser 24 hex)" });

      let payload;
      try {
        payload = JSON.parse(document.getElementById("updatePayload").value);
      } catch (err) {
        return showResponse(400, {
          error: 'Payload JSON inválido. Ej: {"dieta":"Omnívoro"}',
        });
      }

      // fetch
      try {
        const { status, body } = await fetchJson(
          baseUrl + "/api/dinosaurios/" + id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        showResponse(status, body ?? "Sin body JSON");
      } catch (err) {
        showResponse("ERROR", err.message);
      }
    });
  }

  // DELETE
  const formDelete = document.getElementById("formDelete");
  if (formDelete) {
    formDelete.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = getCleanId("deleteId");
      if (!id) return showResponse(400, { error: "Falta ID" });
      if (!isObjectId(id))
        return showResponse(400, { error: "ID inválido (debe ser 24 hex)" });

      try {
        const { status, body } = await fetchJson(
          baseUrl + "/api/dinosaurios/" + id,
          { method: "DELETE" }
        );
        showResponse(status, body ?? "Sin body JSON");
      } catch (err) {
        showResponse("ERROR", err.message);
      }
    });
  }
});
