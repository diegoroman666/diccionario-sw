/* =========================================================
   APP.JS — Orquestador: búsqueda, breadcrumbs, inicio
   ========================================================= */

const App = (() => {
    const searchInput   = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const breadcrumbs   = document.getElementById("breadcrumbs");

    /* ---------- Búsqueda ---------- */
    function normalize(s) {
        return s.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function search(q) {
        const query = normalize(q.trim());
        if (!query) { searchResults.classList.add("hidden"); return; }
        const results = NODES
            .filter(n => n.tipo !== "root")
            .map(n => {
                const hay = normalize(n.titulo + " " + (n.subtitulo||"") + " " + n.definicion + " " + (n.simple||""));
                const idx = hay.indexOf(query);
                return idx >= 0 ? { n, score: idx === 0 ? 0 : (hay.indexOf(" " + query) === -1 ? idx + 100 : idx) } : null;
            })
            .filter(Boolean)
            .sort((a, b) => a.score - b.score)
            .slice(0, 8);

        if (!results.length) {
            searchResults.innerHTML = `<div class="p-4 text-sm text-slate-500 text-center">Sin resultados para "<strong>${q}</strong>"</div>`;
            searchResults.classList.remove("hidden");
            return;
        }
        searchResults.innerHTML = results.map(({ n }) => {
            const cat = n.categoria ? CATEGORIAS[n.categoria] : null;
            return `
                <div class="search-result" data-id="${n.id}">
                    <div class="flex items-start justify-between gap-2">
                        <div class="flex-1 min-w-0">
                            <div class="search-result-title">${n.titulo}</div>
                            <div class="text-xs text-slate-500 truncate">${n.subtitulo || ""}</div>
                        </div>
                        ${cat ? `<div class="search-result-cat" style="color:${cat.color}">${cat.nombre}</div>` : ""}
                    </div>
                </div>
            `;
        }).join("");
        searchResults.classList.remove("hidden");
        searchResults.querySelectorAll(".search-result").forEach(r => {
            r.addEventListener("click", () => {
                Map.focusNode(r.dataset.id);
                searchResults.classList.add("hidden");
                searchInput.value = "";
            });
        });
    }

    searchInput.addEventListener("input", e => search(e.target.value));
    searchInput.addEventListener("focus", e => { if (e.target.value) search(e.target.value); });
    document.addEventListener("click", e => {
        if (!e.target.closest("#searchInput") && !e.target.closest("#searchResults")) {
            searchResults.classList.add("hidden");
        }
    });

    /* Atajos de teclado */
    document.addEventListener("keydown", e => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); searchInput.focus(); }
        if (e.key === "Escape") {
            Panel.close();
            searchResults.classList.add("hidden");
        }
    });

    /* ---------- Breadcrumbs ---------- */
    function updateBreadcrumbs(activeId) {
        if (!activeId) {
            breadcrumbs.innerHTML = `
                <span class="crumb active inline-flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                        <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2V10z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Mapa conceptual
                </span>`;
            return;
        }
        const node = NODE_MAP[activeId];
        const parts = [
            { id: null, label: "Mapa conceptual" }
        ];
        if (node.tipo === "root") {
            parts.push({ id: "root", label: node.titulo });
        } else if (node.tipo === "hub") {
            parts.push({ id: "root", label: "¿Cómo funciona una red?" });
            parts.push({ id: node.id, label: node.titulo });
        } else {
            parts.push({ id: "root", label: "¿Cómo funciona una red?" });
            if (node.categoria) {
                parts.push({ id: node.categoria, label: CATEGORIAS[node.categoria].nombre });
            }
            parts.push({ id: node.id, label: node.titulo });
        }

        breadcrumbs.innerHTML = parts.map((p, i) => {
            const isLast = i === parts.length - 1;
            const sep = i > 0 ? `<svg viewBox="0 0 24 24" fill="none" class="w-3 h-3 text-slate-300"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>` : "";
            const cls = `crumb ${isLast ? "active" : ""}`;
            return `${sep}<span class="${cls}" data-id="${p.id ?? ''}">${p.label}</span>`;
        }).join("");

        breadcrumbs.querySelectorAll(".crumb").forEach(c => {
            c.addEventListener("click", () => {
                const id = c.dataset.id;
                if (!id) { document.getElementById("btnReset").click(); return; }
                Map.focusNode(id);
            });
        });
    }

    /* ---------- Inicio ---------- */
    function init() {
        Map.render();
        updateBreadcrumbs(null);
        // Pequeña intro: abrir nodo raíz al cabo de 600ms
        setTimeout(() => Map.selectNode("root"), 700);
    }

    document.addEventListener("DOMContentLoaded", init);

    return { updateBreadcrumbs };
})();
