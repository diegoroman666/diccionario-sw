/* =========================================================
   PANEL.JS — Panel lateral de detalle con tooltips
   ========================================================= */

const Panel = (() => {
    const panel   = document.getElementById("detailPanel");
    const content = document.getElementById("panelContent");
    const tooltip = document.getElementById("tooltip");

    function formatMarkdown(text) {
        // Conversiones mínimas: **bold**, *italic*, `code`, saltos de línea
        return text
            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900">$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code class="mono text-indigo-700 bg-indigo-50 px-1 rounded">$1</code>')
            .replace(/\n/g, '<br>');
    }

    /* Detecta términos relevantes en el texto y los envuelve con <span class="term">
       para mostrar tooltip con la diapositiva original. */
    function highlightTerms(html, currentNode) {
        const terms = NODES
            .filter(n => n.id !== currentNode.id)
            .map(n => ({ id: n.id, titulo: n.titulo, slide: n.diapositiva, archivo: n.archivo }))
            .sort((a, b) => b.titulo.length - a.titulo.length);

        terms.forEach(t => {
            const pattern = new RegExp(`(?<!<[^>]*|\\w)(${escapeReg(t.titulo)})(?!\\w|[^<]*>)`, "gi");
            html = html.replace(pattern, match =>
                `<span class="term" data-id="${t.id}" data-slide="${t.slide}" data-archivo="${t.archivo}">${match}</span>`
            );
        });
        return html;
    }

    function escapeReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function render(id) {
        const n = NODE_MAP[id];
        if (!n) return;
        const cat = n.categoria ? CATEGORIAS[n.categoria] : null;

        const definicionHTML = highlightTerms(formatMarkdown(n.definicion), n);
        const simpleHTML     = formatMarkdown(n.simple || "");

        const relacionesChips = (n.relaciones || []).map(rid => {
            const r = NODE_MAP[rid];
            if (!r) return "";
            const rcat = r.categoria || "identificacion";
            return `<span class="chip cat-${rcat}" data-goto="${rid}">
                <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                    <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ${r.titulo}
            </span>`;
        }).join("");

        content.innerHTML = `
            <div class="flex items-start justify-between gap-3 mb-5">
                <div class="flex-1">
                    ${cat ? `<div class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded"
                                style="background:${cat.color}22; color:${cat.color}">
                                <span class="w-1.5 h-1.5 rounded-full" style="background:${cat.color}"></span>
                                ${cat.nombre}
                            </div>` : `<div class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                                <span class="w-1.5 h-1.5 rounded-full bg-indigo-600"></span> Nodo raíz
                            </div>`}
                    <h2 class="text-2xl font-extrabold text-slate-900 leading-tight">${n.titulo}</h2>
                    ${n.subtitulo ? `<p class="text-sm text-slate-500 mt-1">${n.subtitulo}</p>` : ""}
                </div>
                <button id="panelClose" class="p-2 rounded-lg hover:bg-slate-100 transition" aria-label="Cerrar">
                    <svg viewBox="0 0 24 24" fill="none" class="w-5 h-5 text-slate-600">
                        <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>

            <div class="mb-5">
                <span class="slide-badge" title="Fuente del contenido">
                    <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
                        <path d="M8 22h8M12 18v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    ${n.diapositiva}
                </span>
                <span class="text-xs text-slate-500 ml-2">· archivo: <span class="mono">${n.archivo}</span></span>
            </div>

            <div class="panel-section">
                <div class="panel-label">
                    <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Definición técnica
                </div>
                <p class="text-[15px] leading-relaxed text-slate-700">${definicionHTML}</p>
            </div>

            ${n.simple ? `
            <div class="panel-section">
                <div class="panel-label">
                    <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5L18.2 22 12 17.3 5.8 22l2.4-8.1L2 9.4h7.6L12 2z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                    Explicación simple
                </div>
                <div class="rounded-xl bg-amber-50 border border-amber-200 p-4 text-[14px] leading-relaxed text-amber-900">${simpleHTML}</div>
            </div>` : ""}

            ${n.ejemplo ? `
            <div class="panel-section">
                <div class="panel-label">
                    <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                        <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Ejemplo práctico
                </div>
                <pre class="example-box mono"><code>${n.ejemplo}</code></pre>
            </div>` : ""}

            ${relacionesChips ? `
            <div class="panel-section">
                <div class="panel-label">
                    <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                        <circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="2"/>
                        <circle cx="18" cy="18" r="3" stroke="currentColor" stroke-width="2"/>
                        <path d="M8.5 8.5L15.5 15.5" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Relaciones con otros conceptos
                </div>
                <div class="flex flex-wrap">${relacionesChips}</div>
            </div>` : ""}

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Liceo Polivalente de Requínoa · 3° medio TP</span>
                <button id="panelNextCenter" class="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">
                    Volver al mapa
                    <svg viewBox="0 0 24 24" fill="none" class="w-3 h-3">
                        <path d="M5 12h14m-6-6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        `;

        // Handlers internos del panel
        content.querySelectorAll(".chip[data-goto]").forEach(c => {
            c.addEventListener("click", () => Map.focusNode(c.dataset.goto));
        });
        content.querySelectorAll(".term").forEach(t => {
            t.addEventListener("click", () => Map.focusNode(t.dataset.id));
            t.addEventListener("mouseenter", e => showTooltip(e, t));
            t.addEventListener("mousemove", moveTooltip);
            t.addEventListener("mouseleave", hideTooltip);
        });
        document.getElementById("panelClose").addEventListener("click", close);
        document.getElementById("panelNextCenter").addEventListener("click", () => {
            close();
            Map.centerView(true);
        });
    }

    function showTooltip(e, el) {
        const slide   = el.dataset.slide;
        const archivo = el.dataset.archivo;
        tooltip.innerHTML = `
            <div class="font-semibold text-white">${el.textContent}</div>
            <div class="text-indigo-200 text-[11px] mt-0.5">${slide}</div>
            <div class="text-slate-400 text-[10px] mono">${archivo}</div>
        `;
        tooltip.style.opacity = "1";
        moveTooltip(e);
    }
    function moveTooltip(e) {
        const pad = 14;
        const x = Math.min(window.innerWidth - 240, e.clientX + pad);
        const y = Math.min(window.innerHeight - 80, e.clientY + pad);
        tooltip.style.left = x + "px";
        tooltip.style.top  = y + "px";
    }
    function hideTooltip() { tooltip.style.opacity = "0"; }

    function open(id)  { render(id); panel.classList.add("open"); }
    function close()   { panel.classList.remove("open"); }

    return { open, close, render };
})();
