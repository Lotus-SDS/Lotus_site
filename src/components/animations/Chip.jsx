import React from 'react';
import { useFirstImage } from '../../lib/useFirstImage';

const CANDIDATES = ['/images/chip.webp', '/images/chip.jpg', '/images/chip.png'];
const PINS = 13;

// Ilustração provisória do chip: substituída automaticamente por
// public/images/chip.(webp|jpg|png) quando a imagem gerada existir.
const ChipIllustration = () => {
    const step = 296 / (PINS - 1);
    const pins = Array.from({ length: PINS }, (_, i) => 52 + i * step);
    return (
        <div className="absolute inset-0 grid place-items-center [perspective:1600px]">
            <div className="relative w-[66%] [transform:translate(10%,-4%)_rotateX(56deg)_rotateZ(-36deg)]">
                <svg viewBox="-20 -20 440 440" className="block w-full overflow-visible drop-shadow-[0_0_26px_rgb(var(--lime)/0.35)]">
                    <defs>
                        <linearGradient id="chip-base" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#141813" />
                            <stop offset="1" stopColor="#090b08" />
                        </linearGradient>
                        <linearGradient id="chip-lid" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0" stopColor="#343a2f" />
                            <stop offset="0.42" stopColor="#171a15" />
                            <stop offset="0.7" stopColor="#23281f" />
                            <stop offset="1" stopColor="#12150f" />
                        </linearGradient>
                        <mask id="chip-logo" maskUnits="userSpaceOnUse">
                            <image href="/lotuslogo.png" x="108" y="98" width="184" height="130" />
                        </mask>
                    </defs>

                    {pins.map((p) => (
                        <g key={p} className="fill-lime/80">
                            <rect x={p - 4} y={-16} width="8" height="20" rx="1.5" />
                            <rect x={p - 4} y={396} width="8" height="20" rx="1.5" />
                            <rect x={-16} y={p - 4} width="20" height="8" rx="1.5" />
                            <rect x={396} y={p - 4} width="20" height="8" rx="1.5" />
                        </g>
                    ))}

                    <rect x="0" y="0" width="400" height="400" rx="22" fill="url(#chip-base)" stroke="rgb(183 201 91 / 0.5)" strokeWidth="2" />
                    <rect x="46" y="46" width="308" height="308" rx="12" fill="url(#chip-lid)" stroke="rgb(236 239 230 / 0.12)" />
                    <rect x="108" y="98" width="184" height="130" fill="rgb(183 201 91)" mask="url(#chip-logo)" opacity="0.6" />
                    <text x="200" y="282" textAnchor="middle" fontFamily="Hanken Grotesk" fontSize="30" fontWeight="500" letterSpacing="9" className="fill-bone/60">
                        LOTUS
                    </text>
                    <text x="200" y="312" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="2.5" className="fill-bone/35">
                        LTS-2025 · ES BRASIL
                    </text>
                </svg>
            </div>
        </div>
    );
};

const Chip = () => {
    const src = useFirstImage(CANDIDATES);
    return (
        <div className="relative aspect-[4/3] w-full">
            <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--lime)/0.2),transparent)] blur-2xl" />
            {src ? (
                <img
                    src={src}
                    alt="Chip com o lótus da Lotus gravado, iluminado em verde-lima"
                    className="relative h-full w-full object-cover mix-blend-lighten [mask-image:radial-gradient(ellipse_at_center,#000_52%,transparent_78%)]"
                />
            ) : (
                <ChipIllustration />
            )}
        </div>
    );
};

export default Chip;
