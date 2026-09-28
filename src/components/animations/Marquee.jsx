import React from 'react';

const Via = () => (
    <svg width="7" height="7" viewBox="0 0 7 7" aria-hidden="true" className="shrink-0">
        <circle cx="3.5" cy="3.5" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
);

// Faixa contínua (como a linha de parceiros da referência), aqui com a stack real da Lotus.
const Marquee = ({ items, label }) => (
    <div className="flex items-center gap-6">
        {label && <span className="hidden shrink-0 text-[0.8125rem] font-medium text-sage md:block">{label}</span>}
        <div className="fade-x group relative min-w-0 flex-1 overflow-hidden" role="list" aria-label={label}>
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                {[0, 1].map((copy) => (
                    <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1 || undefined}>
                        {items.map((item) => (
                            <span
                                key={item}
                                role={copy === 0 ? 'listitem' : undefined}
                                className="flex items-center gap-6 pr-6 text-[1.0625rem] font-medium tracking-[-0.01em] text-bone/60 transition-colors duration-300 hover:text-bone"
                            >
                                {item}
                                <span className="text-lime/60">
                                    <Via />
                                </span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default Marquee;
