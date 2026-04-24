/* =========================================================
   MAP.JS — Renderizado del mapa conceptual
   Pan / zoom / render de nodos y aristas
   ========================================================= */

const Map = (() => {
    const canvas   = document.getElementById("canvas");
    const viewport = document.getElementById("viewport");
    const edgesG   = document.getElementById("edges");
    const nodesL   = document.getElementById("nodesLayer");
    const zoomInd  = document.getElementById("zoomIndicator");

    const state = {
        scale: 1,
        tx: 0, ty: 0,
        dragging: false,
        startX: 0, startY: 0,
        startTx: 0, startTy: 0,
        activeFilter: "all",
        activeId: null
    };

    /* ---------- Render inicial ---------- */
    function render() {
        // Nodos
        nodesL.innerHTML = "";
        NODES.forEach(n => {
            const el = document.createElement("div");
            el.className = `node ${n.tipo}` + (n.categoria ? ` cat-${n.categoria}` : "");
            el.dataset.id = n.id;
            el.style.left = n.x + "px";
            el.style.top  = n.y + "px";
            el.innerHTML = `
                <div class="node-title">${n.titulo}</div>
                ${n.subtitulo ? `<div class="node-sub">${n.subtitulo}</div>` : ""}
            `;
            el.addEventListener("click", e => {
                e.stopPropagation();
                selectNode(n.id);
            });
            el.addEventListener("mouseenter", () => highlightRelated(n.id, true));
            el.addEventListener("mouseleave", () => highlightRelated(n.id, false));
            nodesL.appendChild(el);
        });

        // Aristas
        edgesG.innerHTML = "";
        EDGES.forEach(e => {
            const a = NODE_MAP[e.from], b = NODE_MAP[e.to];
            if (!a || !b) return;
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const d = curvePath(a.x, a.y, b.x, b.y);
            path.setAttribute("d", d);
            path.setAttribute("class", `edge cat-${b.categoria || a.categoria || ""}`);
            path.dataset.from = e.from;
            path.dataset.to   = e.to;
            edgesG.appendChild(path);
        });

        centerView(false);
    }

    function curvePath(x1, y1, x2, y2) {
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1, dy = y2 - y1;
        const nx = -dy * 0.12, ny = dx * 0.12;
        return `M ${x1} ${y1} Q ${mx + nx} ${my + ny}, ${x2} ${y2}`;
    }

    /* ---------- Pan & zoom ---------- */
    function applyTransform(animate = false) {
        viewport.classList.toggle("animating", animate);
        viewport.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.scale})`;
        zoomInd.textContent = Math.round(state.scale * 100) + "%";
        if (animate) setTimeout(() => viewport.classList.remove("animating"), 500);
    }

    function centerView(animate = true) {
        state.scale = 0.8;
        state.tx = canvas.clientWidth / 2;
        state.ty = canvas.clientHeight / 2;
        applyTransform(animate);
    }

    function zoomBy(delta, cx, cy) {
        const prev = state.scale;
        const next = Math.min(2.5, Math.max(0.3, prev * delta));
        if (cx === undefined) { cx = canvas.clientWidth / 2; cy = canvas.clientHeight / 2; }
        // Mantener el punto bajo el cursor fijo
        state.tx = cx - (cx - state.tx) * (next / prev);
        state.ty = cy - (cy - state.ty) * (next / prev);
        state.scale = next;
        applyTransform();
    }

    canvas.addEventListener("mousedown", e => {
        if (e.target.closest(".node")) return;
        state.dragging = true;
        state.startX = e.clientX; state.startY = e.clientY;
        state.startTx = state.tx; state.startTy = state.ty;
    });
    window.addEventListener("mousemove", e => {
        if (!state.dragging) return;
        state.tx = state.startTx + (e.clientX - state.startX);
        state.ty = state.startTy + (e.clientY - state.startY);
        applyTransform();
    });
    window.addEventListener("mouseup", () => state.dragging = false);

    canvas.addEventListener("wheel", e => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const cx = e.clientX - rect.left, cy = e.clientY - rect.top;
        zoomBy(e.deltaY < 0 ? 1.12 : 0.89, cx, cy);
    }, { passive: false });

    /* Touch: pan simple */
    let touchStart = null;
    canvas.addEventListener("touchstart", e => {
        if (e.touches.length === 1 && !e.target.closest(".node")) {
            touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, tx: state.tx, ty: state.ty };
        }
    }, { passive: true });
    canvas.addEventListener("touchmove", e => {
        if (!touchStart || e.touches.length !== 1) return;
        state.tx = touchStart.tx + (e.touches[0].clientX - touchStart.x);
        state.ty = touchStart.ty + (e.touches[0].clientY - touchStart.y);
        applyTransform();
    }, { passive: true });
    canvas.addEventListener("touchend", () => touchStart = null);

    /* ---------- Selección / resaltado ---------- */
    function selectNode(id) {
        state.activeId = id;
        nodesL.querySelectorAll(".node").forEach(n => {
            n.classList.toggle("active", n.dataset.id === id);
        });
        const n = NODE_MAP[id];
        if (n) {
            // Centrar nodo en viewport
            state.tx = canvas.clientWidth / 2 - n.x * state.scale;
            state.ty = canvas.clientHeight / 2 - n.y * state.scale;
            applyTransform(true);
        }
        Panel.open(id);
        App.updateBreadcrumbs(id);
    }

    function highlightRelated(id, on) {
        const n = NODE_MAP[id];
        if (!n) return;
        const related = new Set([id, ...(n.relaciones || [])]);
        // Agregar padres/hijos directos del grafo
        EDGES.forEach(e => {
            if (e.from === id) related.add(e.to);
            if (e.to === id) related.add(e.from);
        });

        if (!on) {
            nodesL.querySelectorAll(".node").forEach(x => x.classList.remove("dimmed"));
            edgesG.querySelectorAll(".edge").forEach(x => { x.classList.remove("highlighted", "dimmed"); });
            return;
        }
        nodesL.querySelectorAll(".node").forEach(x => {
            x.classList.toggle("dimmed", !related.has(x.dataset.id));
        });
        edgesG.querySelectorAll(".edge").forEach(x => {
            const involved = x.dataset.from === id || x.dataset.to === id;
            x.classList.toggle("highlighted", involved);
            x.classList.toggle("dimmed", !involved);
        });
    }

    function applyFilter(cat) {
        state.activeFilter = cat;
        nodesL.querySelectorAll(".node").forEach(el => {
            const id = el.dataset.id;
            const n = NODE_MAP[id];
            if (cat === "all" || n.tipo === "root" || n.categoria === cat) {
                el.style.opacity = "";
                el.style.pointerEvents = "";
            } else {
                el.style.opacity = "0.15";
                el.style.pointerEvents = "none";
            }
        });
        edgesG.querySelectorAll(".edge").forEach(el => {
            const b = NODE_MAP[el.dataset.to];
            const a = NODE_MAP[el.dataset.from];
            const show = cat === "all" || b?.categoria === cat || a?.categoria === cat || a?.id === "root";
            el.style.opacity = show ? "" : "0.1";
        });
    }

    function focusNode(id) { selectNode(id); }

    /* ---------- Botones ---------- */
    document.getElementById("btnCenter").addEventListener("click", () => centerView(true));
    document.getElementById("btnZoomIn").addEventListener("click", () => zoomBy(1.2));
    document.getElementById("btnZoomOut").addEventListener("click", () => zoomBy(0.83));
    document.getElementById("btnReset").addEventListener("click", () => {
        state.activeId = null;
        nodesL.querySelectorAll(".node").forEach(n => n.classList.remove("active"));
        Panel.close();
        applyFilter("all");
        document.querySelectorAll(".filter-btn").forEach(b => {
            b.classList.toggle("bg-slate-900", b.dataset.filter === "all");
            b.classList.toggle("text-white", b.dataset.filter === "all");
            b.classList.toggle("bg-slate-100", b.dataset.filter !== "all");
            b.classList.toggle("text-slate-600", b.dataset.filter !== "all");
        });
        centerView(true);
        App.updateBreadcrumbs(null);
    });

    document.querySelectorAll(".filter-btn").forEach(b => {
        b.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(x => {
                x.classList.remove("bg-slate-900", "text-white");
                x.classList.add("bg-slate-100", "text-slate-600");
            });
            b.classList.add("bg-slate-900", "text-white");
            b.classList.remove("bg-slate-100", "text-slate-600");
            applyFilter(b.dataset.filter);
        });
    });

    window.addEventListener("resize", () => {
        if (!state.activeId) centerView(false);
    });

    return { render, selectNode, focusNode, applyFilter, centerView, state };
})();
