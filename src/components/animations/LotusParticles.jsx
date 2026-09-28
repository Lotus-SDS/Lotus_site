import React, { useEffect, useRef } from 'react';

// Base do caule central do logo, medida no PNG (948×672): x 50%, y 89%.
const LOTUS_BASE = { x: 0.5, y: 0.89 };
const LOTUS_RATIO = 948 / 672;

const LOGO_SRC = '/lotuslogo.png';
const OPAQUE_RATIO = 0.3075; // fração de pixels opacos do logo
const MARGIN = 0.1 / 1.2; // o canvas passa 10% da caixa do logo em cada lado

// 8 níveis de brilho, do lima apagado ao lima quase branco.
const LEVELS = 8;
const COLORS = Array.from({ length: LEVELS }, (_, k) => {
    const t = k / (LEVELS - 1);
    const e = t * t;
    const r = Math.round(183 + (238 - 183) * e);
    const g = Math.round(201 + (247 - 201) * e);
    const b = Math.round(91 + (186 - 91) * e);
    const a = (0.3 + 0.7 * t).toFixed(3);
    return `rgba(${r},${g},${b},${a})`;
});

const STEP_MS = 1000 / 60;
const K = 0.05; // rigidez da mola até a posição de origem
const DAMP = 0.84;

/**
 * O logo da Lotus desenhado como um campo de partículas.
 * As sementes brotam da base do caule e sobem até formar a flor;
 * depois cada ponto responde ao cursor com física de mola.
 */
const LotusParticles = ({ className = '', delay = 0, startOnView = false, maxParticles = 5200 }) => {
    const boxRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const box = boxRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let W = 0;
        let H = 0;
        let dpr = 1;
        let n = 0;
        let hx, hy, x, y, vx, vy, sx, sy, t0, dur, size, tone, dist, phase, lvl, order;
        let state; // 0 aguardando, 1 voando, 2 assentada
        let baseX = 0;
        let baseY = 0;
        let maxDist = 1;
        let radius = 80;

        const img = new Image();
        let loaded = false;
        let started = !startOnView;
        let clock = 0; // segundos desde o início da floração
        let introClock = -1;
        let raf = 0;
        let last = 0;
        let acc = 0;
        let inView = false;
        let pageVisible = !document.hidden;
        const ptr = { clientX: 0, clientY: 0, has: false, px: 0, py: 0 };

        const build = (settled) => {
            W = canvas.clientWidth;
            H = canvas.clientHeight;
            if (!W || !H || !loaded) return false;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);

            const lx = W * MARGIN;
            const ly = H * MARGIN;
            const lw = W - lx * 2;
            const lh = H - ly * 2;
            const sw = Math.max(1, Math.round(lw));
            const sh = Math.max(1, Math.round(lh));
            const off = document.createElement('canvas');
            off.width = sw;
            off.height = sh;
            const octx = off.getContext('2d', { willReadFrequently: true });
            octx.drawImage(img, 0, 0, sw, sh);
            const data = octx.getImageData(0, 0, sw, sh).data;

            const target = W < 560 ? Math.min(maxParticles, 2600) : maxParticles;
            const step = Math.max(2, Math.sqrt((sw * sh * OPAQUE_RATIO) / target));
            const pts = [];
            for (let yy = step / 2; yy < sh; yy += step) {
                for (let xx = step / 2; xx < sw; xx += step) {
                    const jx = xx + (Math.random() - 0.5) * step * 0.7;
                    const jy = yy + (Math.random() - 0.5) * step * 0.7;
                    const ix = Math.min(sw - 1, Math.max(0, Math.round(jx)));
                    const iy = Math.min(sh - 1, Math.max(0, Math.round(jy)));
                    if (data[(iy * sw + ix) * 4 + 3] > 140) pts.push(lx + jx, ly + jy);
                }
            }

            n = pts.length / 2;
            hx = new Float32Array(n);
            hy = new Float32Array(n);
            x = new Float32Array(n);
            y = new Float32Array(n);
            vx = new Float32Array(n);
            vy = new Float32Array(n);
            sx = new Float32Array(n);
            sy = new Float32Array(n);
            t0 = new Float32Array(n);
            dur = new Float32Array(n);
            size = new Float32Array(n);
            tone = new Float32Array(n);
            dist = new Float32Array(n);
            phase = new Float32Array(n);
            lvl = new Uint8Array(n);
            order = new Uint32Array(n);
            state = new Uint8Array(n);

            baseX = lx + lw * LOTUS_BASE.x;
            baseY = ly + lh * LOTUS_BASE.y;
            maxDist = 1;
            for (let i = 0; i < n; i++) {
                hx[i] = pts[i * 2];
                hy[i] = pts[i * 2 + 1];
                dist[i] = Math.hypot(hx[i] - baseX, hy[i] - baseY);
                if (dist[i] > maxDist) maxDist = dist[i];
            }
            for (let i = 0; i < n; i++) {
                size[i] = 1.2 + Math.random() * 1.15;
                tone[i] = 0.42 + Math.random() * 0.42;
                phase[i] = Math.random() * Math.PI * 2;
                // Sementes: saem da base e crescem para fora, as mais próximas primeiro.
                sx[i] = baseX + (Math.random() - 0.5) * 26;
                sy[i] = baseY + Math.random() * 16;
                t0[i] = (dist[i] / maxDist) * 1.35 + Math.random() * 0.35;
                dur[i] = 0.95 + Math.random() * 0.65;
                if (settled) {
                    x[i] = hx[i];
                    y[i] = hy[i];
                    state[i] = 2;
                } else {
                    x[i] = sx[i];
                    y[i] = sy[i];
                    state[i] = 0;
                }
            }
            radius = Math.max(60, W * 0.11);
            return true;
        };

        const physics = () => {
            const r2 = radius * radius;
            const usePtr = ptr.has && !reduce;
            for (let i = 0; i < n; i++) {
                if (state[i] !== 2) continue;
                const tx = hx[i] + Math.sin(clock * 0.9 + phase[i]) * 0.45;
                const ty = hy[i] + Math.cos(clock * 0.7 + phase[i]) * 0.45;
                let ax = (tx - x[i]) * K;
                let ay = (ty - y[i]) * K;
                if (usePtr) {
                    const dx = x[i] - ptr.px;
                    const dy = y[i] - ptr.py;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < r2) {
                        const d = Math.sqrt(d2) + 0.01;
                        const f = 1 - d / radius;
                        const force = f * f * 3.4;
                        ax += (dx / d) * force;
                        ay += (dy / d) * force;
                    }
                }
                vx[i] = (vx[i] + ax) * DAMP;
                vy[i] = (vy[i] + ay) * DAMP;
                x[i] += vx[i];
                y[i] += vy[i];
            }
        };

        const intro = () => {
            let pending = 0;
            for (let i = 0; i < n; i++) {
                if (state[i] === 2) continue;
                const t = (introClock - t0[i]) / dur[i];
                if (t <= 0) {
                    state[i] = 0;
                    pending++;
                    continue;
                }
                if (t >= 1) {
                    state[i] = 2;
                    x[i] = hx[i];
                    y[i] = hy[i];
                    vx[i] = 0;
                    vy[i] = 0;
                    continue;
                }
                state[i] = 1;
                pending++;
                const e = 1 - Math.pow(1 - t, 4);
                const dx = hx[i] - sx[i];
                const dy = hy[i] - sy[i];
                const len = Math.hypot(dx, dy) || 1;
                const swirl = Math.sin(Math.PI * e) * (phase[i] - Math.PI) * 0.05 * len;
                x[i] = sx[i] + dx * e + (-dy / len) * swirl;
                y[i] = sy[i] + dy * e + (dx / len) * swirl;
            }
            return pending;
        };

        const draw = () => {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = 'lighter';

            // Pulso de seiva: um anel de luz que sobe da base até as pontas das pétalas.
            const speed = reduce ? 120 : 250;
            const pulse = ((clock * speed) % (maxDist + 420)) - 200;
            const r2 = radius * radius;
            const counts = new Uint32Array(LEVELS);
            for (let i = 0; i < n; i++) {
                if (state[i] === 0) {
                    lvl[i] = 255;
                    continue;
                }
                const g = (dist[i] - pulse) / 42;
                let v = tone[i] + Math.exp(-g * g) * 0.7;
                if (state[i] === 1) v *= 0.9;
                if (ptr.has && !reduce) {
                    const dx = x[i] - ptr.px;
                    const dy = y[i] - ptr.py;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < r2) v += (1 - Math.sqrt(d2) / radius) * 0.55;
                }
                const k = Math.min(LEVELS - 1, Math.max(0, Math.floor(v * LEVELS)));
                lvl[i] = k;
                counts[k]++;
            }
            // Ordenação por contagem: um único fill() por nível de brilho.
            const starts = new Uint32Array(LEVELS);
            for (let k = 1; k < LEVELS; k++) starts[k] = starts[k - 1] + counts[k - 1];
            const cursor = starts.slice();
            for (let i = 0; i < n; i++) {
                const k = lvl[i];
                if (k !== 255) order[cursor[k]++] = i;
            }
            for (let k = 0; k < LEVELS; k++) {
                if (!counts[k]) continue;
                ctx.fillStyle = COLORS[k];
                ctx.beginPath();
                const grow = k >= LEVELS - 2 ? 0.45 : 0;
                for (let j = starts[k], end = starts[k] + counts[k]; j < end; j++) {
                    const i = order[j];
                    const s = size[i] + grow;
                    ctx.rect(x[i] - s / 2, y[i] - s / 2, s, s);
                }
                ctx.fill();
            }
        };

        const frame = (now) => {
            raf = 0;
            if (!inView || !pageVisible) return;
            const dt = last ? Math.min(64, now - last) : STEP_MS;
            last = now;
            clock += dt / 1000;
            if (started) introClock += dt / 1000;

            if (ptr.has) {
                const rect = canvas.getBoundingClientRect();
                ptr.px = (ptr.clientX - rect.left) * (W / rect.width);
                ptr.py = (ptr.clientY - rect.top) * (H / rect.height);
            }

            if (started) intro();
            acc = Math.min(acc + dt, 64);
            while (acc >= STEP_MS) {
                physics();
                acc -= STEP_MS;
            }
            draw();
            raf = requestAnimationFrame(frame);
        };

        const run = () => {
            if (!raf && inView && pageVisible && loaded && n) {
                last = 0;
                raf = requestAnimationFrame(frame);
            }
        };

        const onLoad = () => {
            loaded = true;
            if (build(reduce)) {
                introClock = reduce ? 99 : -delay;
                run();
            }
        };
        img.onload = onLoad;
        img.src = LOGO_SRC;

        let resizeTimer = 0;
        const ro = new ResizeObserver(() => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const w = canvas.clientWidth;
                const h = canvas.clientHeight;
                if (!loaded || (Math.abs(w - W) < 1 && Math.abs(h - H) < 1)) return;
                // Após um redimensionamento a flor já aparece aberta.
                build(true);
                introClock = 99;
                run();
            }, 140);
        });
        ro.observe(canvas);

        const io = new IntersectionObserver(
            ([entry]) => {
                inView = entry.isIntersecting;
                if (inView && !started && entry.intersectionRatio >= 0.3) started = true;
                if (inView) run();
            },
            { threshold: [0, 0.3] },
        );
        io.observe(box);

        const onVisibility = () => {
            pageVisible = !document.hidden;
            run();
        };
        const onMove = (e) => {
            ptr.clientX = e.clientX;
            ptr.clientY = e.clientY;
            ptr.has = true;
        };
        const onLeave = () => {
            ptr.has = false;
        };
        const onOut = (e) => {
            if (!e.relatedTarget) ptr.has = false;
        };
        const onUp = (e) => {
            if (e.pointerType !== 'mouse') ptr.has = false;
        };
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('pointerup', onUp, { passive: true });
        window.addEventListener('pointercancel', onLeave, { passive: true });
        document.addEventListener('pointerout', onOut);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(resizeTimer);
            ro.disconnect();
            io.disconnect();
            img.onload = null;
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onLeave);
            document.removeEventListener('pointerout', onOut);
        };
    }, [delay, startOnView, maxParticles]);

    return (
        <div ref={boxRef} className={`relative ${className}`} style={{ aspectRatio: `${LOTUS_RATIO}` }}>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-[-10%] block h-[120%] w-[120%] [filter:drop-shadow(0_0_10px_rgb(var(--lime)/0.28))]"
            />
        </div>
    );
};

export default LotusParticles;
