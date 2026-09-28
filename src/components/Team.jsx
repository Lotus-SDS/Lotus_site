import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';
import { EASE } from '../lib/site';

const FOUNDERS = [
    { name: 'João Paulo G. Azevedo', role: 'Co-Founder & CEO', github: 'jpguelerazevedo' },
    { name: 'Pedro Henrique B. Duarte', role: 'Co-Founder & CEO', github: 'PhenBD' },
];

const Founder = ({ name, role, github, index }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imageY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%']);

    return (
        <li ref={ref} className={`group ${index === 1 ? 'md:mt-28' : ''}`}>
            <motion.div
                initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0% round 20px)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 20px)' }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 1.3, ease: EASE }}
                className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-bone/10 bg-ink"
            >
                <motion.img
                    style={{ y: imageY, scale: 1.16 }}
                    src={`https://github.com/${github}.png?size=720`}
                    alt={`Retrato de ${name}`}
                    loading="lazy"
                    className="portrait h-full w-full object-cover transition-[filter] duration-700 ease-expo"
                />
                {/* Duotone lima que se desfaz no hover */}
                <div aria-hidden="true" className="portrait-tint absolute inset-0 bg-lime mix-blend-multiply transition-opacity duration-700 ease-expo" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-void/85 to-transparent" />
                <a
                    href={`https://github.com/${github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub de ${name}`}
                    className="glass absolute bottom-4 right-4 flex h-10 items-center gap-2 rounded-full px-4 text-[0.875rem] font-medium text-bone transition-colors hover:border-lime/50 hover:text-lime-hi"
                >
                    <Github size={16} strokeWidth={1.75} aria-hidden="true" />
                    GitHub
                </a>
            </motion.div>
            <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-[1.5rem] font-medium leading-tight tracking-[-0.03em] text-bone">{name}</h3>
                <p className="text-[0.9375rem] text-sage">{role}</p>
            </div>
        </li>
    );
};

const Team = () => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const drift = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['4%', '-26%']);

    return (
        <section id="team" ref={ref} aria-labelledby="team-title" className="relative overflow-hidden py-[clamp(6rem,16vh,11rem)]">
            {/* Palavra gigante que desliza na horizontal por trás dos retratos */}
            <motion.p
                aria-hidden="true"
                style={{ x: drift }}
                className="pointer-events-none absolute left-0 top-[34%] select-none whitespace-nowrap text-[clamp(7rem,22vw,22rem)] font-extralight leading-none tracking-[-0.05em] text-bone/[0.03]"
            >
                liderança liderança
            </motion.p>

            <div className="shell relative">
                <h2 id="team-title" data-stem-node="team" className="title-split max-w-[16em]">
                    <span className="lit-text">Liderança:</span> <span className="text-moss">mentes por trás da Lotus</span>
                </h2>
                <ul className="mx-auto mt-20 grid max-w-[980px] gap-12 md:grid-cols-2 md:gap-10 lg:mt-24">
                    {FOUNDERS.map((f, i) => (
                        <Founder key={f.github} index={i} {...f} />
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Team;
