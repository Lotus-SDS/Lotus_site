import React, { useEffect, useRef, useState } from 'react';

// O caule: um traço de circuito que nasce na base do lótus do herói, desce pela
// página junto com a leitura, acende um nó por seção, se ramifica nos serviços
// e termina no botão de contato.

const CHAMFER = 16; // cantos a 45°, como trilhas de placa de circuito
const READ_LINE = 0.66; // altura da viewport onde fica a ponta do caule
const TRAIL = 110; // trecho mais brilhante logo atrás da ponta
const HOLD_MS = 1900; // espera a floração do herói antes de crescer

const snap = (v) => Math.round(v) + 0.5;

function dedupe(points) {
    return points.filter((p, i) => i === 0 || p[0] !== points[i - 1][0] || p[1] !== points[i - 1][1]);
}

const SHARP = true; // vértice marcado: canto reto, escondido sob uma via

function chamfer(input, r) {
    const pts = dedupe(input);
    if (pts.length < 3) return pts;
    const out = [pts[0]];
    for (let i = 1; i < pts.length - 1; i++) {
        const [ax, ay] = pts[i - 1];
        const [bx, by] = pts[i];
        const [cx, cy] = pts[i + 1];
        const d1x = Math.sign(bx - ax);
        const d1y = Math.sign(by - ay);
        const d2x = Math.sign(cx - bx);
        const d2y = Math.sign(cy - by);
        if ((d1x === d2x && d1y === d2y) || pts[i][2] === SHARP) {
            out.push(pts[i]);
            continue;
        }
        const rr = Math.min(r, Math.hypot(bx - ax, by - ay) / 2, Math.hypot(cx - bx, cy - by) / 2);
        out.push([bx - d1x * rr, by - d1y * rr], [bx + d2x * rr, by + d2y * rr]);
    }
    out.push(pts[pts.length - 1]);
    return out;
}

function cumulative(pts) {
    const cum = [0];
    for (let i = 1; i < pts.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    }
    return cum;
}

function pointAt(pts, cum, len) {
    if (len <= 0) return pts[0];
    const total = cum[cum.length - 1];
    if (len >= total) return pts[pts.length - 1];
    let lo = 0;
    let hi = cum.length - 1;
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] <= len) lo = mid;
        else hi = mid;
    }
    const t = (len - cum[lo]) / (cum[hi] - cum[lo] || 1);
    return [pts[lo][0] + (pts[hi][0] - pts[lo][0]) * t, pts[lo][1] + (pts[hi][1] - pts[lo][1]) * t];
}

// Chave de rolagem de cada vértice: trechos horizontais ganham um intervalo
// de rolagem próprio para a ponta não "saltar" de um lado ao outro.
function scrollKeys(pts) {
    const keys = pts.map((p) => p[1]);
    for (let i = 1; i < pts.length; i++) {
        const dx = Math.abs(pts[i][0] - pts[i - 1][0]);
        if (Math.abs(pts[i][1] - pts[i - 1][1]) < 0.5 && dx > 0) {
            const span = Math.min(240, dx * 0.5);
            keys[i - 1] = pts[i][1] - span / 2;
            keys[i] = pts[i][1] + span / 2;
        }
    }
    for (let i = 1; i < keys.length; i++) keys[i] = Math.max(keys[i], keys[i - 1] + 0.5);
    return keys;
}

function lengthForScroll(keys, cum, s) {
    if (s <= keys[0]) return 0;
    const last = keys.length - 1;
    if (s >= keys[last]) return cum[last];
    let lo = 0;
    let hi = last;
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (keys[mid] <= s) lo = mid;
        else hi = mid;
    }
    return cum[lo] + ((cum[hi] - cum[lo]) * (s - keys[lo])) / (keys[hi] - keys[lo]);
}

const toD = (pts) => 'M' + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L');

function measureLayout(root) {
    const base = root.getBoundingClientRect();
    const R = (el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
    };
    const originEl = root.querySelector('[data-stem="origin"]');
    const dividerEl = root.querySelector('[data-stem="divider"]');
    const railEl = root.querySelector('[data-stem-rail]');
    const ctaEl = root.querySelector('[data-stem="cta"]');
    if (!originEl || !dividerEl || !railEl || !ctaEl) return null;

    const rail = R(railEl);
    const padL = parseFloat(getComputedStyle(railEl).paddingLeft) || 24;
    const railX = snap(rail.x + padL * 0.45);
    const origin = R(originEl);
    const ox = snap(origin.x);
    const divY = snap(R(dividerEl).y);
    // Em telas muito baixas a base da flor pode encostar na linha: o caule nunca sobe.
    const oy = Math.min(origin.y, divY - 24);
    const cta = R(ctaEl);
    const ctaY = snap(cta.y + cta.h / 2);
    const ctaX = snap(cta.x - 10);

    const stops = [];
    root.querySelectorAll('[data-stem-node]').forEach((el) => {
        const r = R(el);
        const fs = parseFloat(getComputedStyle(el).fontSize) || 16;
        const y = snap(r.y + Math.min(r.h / 2, fs * 0.5));
        const tickTo = el.dataset.stemTick === 'off' ? null : snap(r.x - 14);
        stops.push({ kind: 'node', id: el.dataset.stemNode, y, tickTo, el });
    });

    const tiles = [...root.querySelectorAll('[data-stem-tile]')].map((el) => ({ el, ...R(el) }));
    const rows = [];
    tiles.forEach((t) => {
        let row = rows.find((r) => Math.abs(r.top - t.y) < 6);
        if (!row) rows.push((row = { top: t.y, tiles: [] }));
        row.tiles.push(t);
    });
    rows.forEach((row, idx) => {
        if (row.tiles.length > 1) {
            stops.push({ kind: 'bus', y: snap(row.top - (idx === 0 ? 36 : 12)), tiles: row.tiles });
        } else {
            const t = row.tiles[0];
            stops.push({ kind: 'side', y: snap(t.y + Math.min(t.h / 2, 44)), tile: t });
        }
    });

    const valid = stops.filter((s) => s.y > divY + CHAMFER * 2 && s.y < ctaY - CHAMFER * 2).sort((a, b) => a.y - b.y);

    const raw = [[ox, oy], [ox, divY, SHARP], [railX, divY]];
    valid.forEach((s) => raw.push([railX, s.y]));
    raw.push([railX, ctaY], [Math.max(ctaX, railX + CHAMFER * 2), ctaY]);

    const pts = chamfer(raw, CHAMFER);
    const cum = cumulative(pts);
    const keys = scrollKeys(pts);
    const total = cum[cum.length - 1];
    const vertexAt = (y, x = railX) => {
        const i = pts.findIndex((p) => p[0] === x && p[1] === y);
        return i < 0 ? null : { len: cum[i], key: keys[i] };
    };

    const nodes = [];
    const branches = [];
    const addBranch = (points, origin, tile) => {
        const bp = chamfer(points, CHAMFER);
        const bcum = cumulative(bp);
        const len = bcum[bcum.length - 1];
        if (len < 6) return;
        branches.push({
            d: toD(bp),
            len,
            key: origin.key,
            span: Math.max(60, len * 0.3),
            end: bp[bp.length - 1],
            tile: tile ? tile.el : null,
        });
    };

    valid.forEach((s) => {
        const v = vertexAt(s.y);
        if (!v) return;
        if (s.kind === 'node') {
            nodes.push({ x: railX, y: s.y, len: v.len, id: s.id, el: s.el });
            if (s.tickTo && s.tickTo - railX > 8) addBranch([[railX, s.y], [s.tickTo, s.y]], v, null);
        } else if (s.kind === 'bus') {
            nodes.push({ x: railX, y: s.y, len: v.len, id: 'bus' });
            s.tiles.forEach((t) => {
                const cx = snap(t.x + t.w / 2);
                addBranch([[railX, s.y], [cx, s.y], [cx, snap(t.y)]], v, t);
            });
        } else if (s.kind === 'side') {
            nodes.push({ x: railX, y: s.y, len: v.len, id: 'side' });
            addBranch([[railX, s.y], [snap(s.tile.x), s.y]], v, s.tile);
        }
    });

    // Via onde o caule cruza a linha do herói.
    const cross = vertexAt(divY, ox);
    if (cross) nodes.unshift({ x: ox, y: divY, len: cross.len, id: 'divider' });

    return {
        width: base.width,
        height: base.height,
        d: toD(pts),
        pts,
        cum,
        keys,
        total,
        nodes,
        branches,
        ctaEl,
        origin: pts[0],
    };
}

const Stem = () => {
    const svgRef = useRef(null);
    const [geo, setGeo] = useState(null);
    const geoRef = useRef(null);
    const els = useRef({ core: null, glow: null, trail: null, tip: null, nodes: [], branches: [], pads: [] });
    const refreshRef = useRef(null);

    // Mede o layout e reconstrói a geometria sempre que o conteúdo muda de tamanho.
    useEffect(() => {
        const svg = svgRef.current;
        const root = svg.parentElement;
        let frame = 0;
        const rebuild = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const g = measureLayout(root);
                geoRef.current = g;
                setGeo(g);
            });
        };
        const ro = new ResizeObserver(rebuild);
        ro.observe(root);
        document.fonts?.ready.then(rebuild);
        window.addEventListener('load', rebuild);
        return () => {
            cancelAnimationFrame(frame);
            ro.disconnect();
            window.removeEventListener('load', rebuild);
        };
    }, []);

    // Crescimento sincronizado com a rolagem.
    useEffect(() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let current = -Infinity;
        let goal = 0;
        let held = !reduce;
        let raf = 0;

        const apply = (s) => {
            const g = geoRef.current;
            const e = els.current;
            if (!g || !e.core) return;
            const len = reduce ? g.total : lengthForScroll(g.keys, g.cum, s);
            const off = g.total - len;
            e.core.style.strokeDashoffset = off;
            e.glow.style.strokeDashoffset = off;
            e.trail.style.strokeDashoffset = -(len - TRAIL);
            const [tx, ty] = pointAt(g.pts, g.cum, len);
            e.tip.setAttribute('transform', `translate(${tx.toFixed(1)} ${ty.toFixed(1)})`);
            e.tip.style.opacity = len > 2 && len < g.total - 2 ? '1' : '0';
            g.nodes.forEach((n, i) => {
                const lit = reduce || len >= n.len - 0.5;
                e.nodes[i]?.toggleAttribute('data-lit', lit);
                // A seção acende junto com o nó (títulos saem do apagado).
                n.el?.toggleAttribute('data-lit', lit);
            });
            g.branches.forEach((b, i) => {
                const p = reduce ? 1 : Math.min(1, Math.max(0, (s - b.key) / b.span));
                const path = e.branches[i];
                const pad = e.pads[i];
                if (path) path.style.strokeDashoffset = b.len * (1 - p);
                if (pad) pad.toggleAttribute('data-lit', p >= 1);
                if (b.tile) b.tile.toggleAttribute('data-lit', p >= 1);
            });
            g.ctaEl.toggleAttribute('data-lit', len >= g.total - 1);
        };

        const tick = () => {
            raf = 0;
            const g = geoRef.current;
            if (!g) return;
            const target = held ? g.keys[0] : goal;
            if (current === -Infinity) current = g.keys[0];
            current += (target - current) * 0.12;
            if (Math.abs(target - current) < 0.4) current = target;
            apply(current);
            if (current !== target) raf = requestAnimationFrame(tick);
        };
        const kick = () => {
            if (!raf) raf = requestAnimationFrame(tick);
        };
        const onScroll = () => {
            goal = window.scrollY + window.innerHeight * READ_LINE;
            kick();
        };

        onScroll();
        const holdTimer = setTimeout(() => {
            held = false;
            kick();
        }, reduce ? 0 : HOLD_MS);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        // Reaplica o estado quando a geometria é reconstruída.
        refreshRef.current = () => {
            onScroll();
            if (current !== -Infinity) apply(current);
            kick();
        };
        return () => {
            clearTimeout(holdTimer);
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            refreshRef.current = null;
        };
    }, []);

    useEffect(() => {
        refreshRef.current?.();
    }, [geo]);

    const setNode = (i) => (el) => {
        els.current.nodes[i] = el;
    };
    const setBranch = (i) => (el) => {
        els.current.branches[i] = el;
    };
    const setPad = (i) => (el) => {
        els.current.pads[i] = el;
    };

    return (
        <svg
            ref={svgRef}
            aria-hidden="true"
            className="stem pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
            viewBox={geo ? `0 0 ${geo.width} ${geo.height}` : undefined}
            preserveAspectRatio="none"
        >
            <defs>
                <radialGradient id="stem-tip-glow">
                    <stop offset="0%" stopColor="rgb(224 238 158)" stopOpacity="0.95" />
                    <stop offset="30%" stopColor="rgb(183 201 91)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="rgb(183 201 91)" stopOpacity="0" />
                </radialGradient>
            </defs>
            {geo && (
                <>
                    {/* Trilho fantasma: mostra o caminho que ainda falta */}
                    <path d={geo.d} className="stem-ghost" />
                    {geo.branches.map((b, i) => (
                        <path key={`g${i}`} d={b.d} className="stem-ghost" />
                    ))}

                    {geo.branches.map((b, i) => (
                        <path
                            key={`b${i}`}
                            ref={setBranch(i)}
                            d={b.d}
                            className="stem-branch"
                            style={{ strokeDasharray: `${b.len} ${b.len}`, strokeDashoffset: b.len }}
                        />
                    ))}

                    <path
                        ref={(el) => {
                            els.current.glow = el;
                        }}
                        d={geo.d}
                        className="stem-glow"
                        style={{ strokeDasharray: `${geo.total} ${geo.total}`, strokeDashoffset: geo.total }}
                    />
                    <path
                        ref={(el) => {
                            els.current.core = el;
                        }}
                        d={geo.d}
                        className="stem-core"
                        style={{ strokeDasharray: `${geo.total} ${geo.total}`, strokeDashoffset: geo.total }}
                    />
                    <path
                        ref={(el) => {
                            els.current.trail = el;
                        }}
                        d={geo.d}
                        className="stem-trail"
                        style={{ strokeDasharray: `${TRAIL} ${geo.total + TRAIL}`, strokeDashoffset: TRAIL }}
                    />

                    {geo.branches.map((b, i) => (
                        <g key={`p${i}`} ref={setPad(i)} className="stem-node" transform={`translate(${b.end[0]} ${b.end[1]})`}>
                            <circle r="7" className="stem-halo" />
                            <circle r="2.6" className="stem-via" />
                        </g>
                    ))}

                    {geo.nodes.map((n, i) => (
                        <g key={`n${n.id}${i}`} ref={setNode(i)} className="stem-node" transform={`translate(${n.x} ${n.y})`}>
                            <circle r="9" className="stem-halo" />
                            <circle r="3.6" className="stem-via" />
                        </g>
                    ))}

                    <circle cx={geo.origin[0]} cy={geo.origin[1]} r="2.4" className="fill-lime" />

                    <g
                        ref={(el) => {
                            els.current.tip = el;
                        }}
                        style={{ opacity: 0 }}
                    >
                        <circle r="26" fill="url(#stem-tip-glow)" className="origin-center animate-breathe [transform-box:fill-box]" />
                        <circle r="2.8" className="fill-lime-hi" />
                    </g>
                </>
            )}
        </svg>
    );
};

export default Stem;
