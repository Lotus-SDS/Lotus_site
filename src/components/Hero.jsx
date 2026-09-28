import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import LotusParticles from './animations/LotusParticles';
import Marquee from './animations/Marquee';
import { usePointerShift } from '../lib/pointer';
import { EASE, MAILTO, STACK } from '../lib/site';

const TAGS = ['Web', 'Mobile', 'Cloud', 'IA'];

const STATS = [
    { value: '2025', label: ['Ano de', 'fundação'] },
    { value: '100%', label: ['Foco em', 'qualidade'] },
];

// Linha gigante que "sobe" por trás de uma máscara.
const Line = ({ children, delay }) => {
    const reduce = useReducedMotion();
    return (
        <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: '0.3em', clipPath: 'inset(0% -10% 100% -10%)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(-60% -10% -60% -10%)' }}
            transition={{ duration: 1.2, delay, ease: EASE }}
        >
            {children}
        </motion.span>
    );
};

const Hero = () => {
    const sectionRef = useRef(null);
    const reduce = useReducedMotion();

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 });

    // Três planos: a linha da frente sobe mais rápido, a de trás quase não se move.
    const frontY = useTransform(p, [0, 1], [0, reduce ? 0 : -190]);
    const backY = useTransform(p, [0, 1], [0, reduce ? 0 : 70]);
    const backOpacity = useTransform(p, [0, 0.75], [1, 0.15]);
    const lotusScale = useTransform(p, [0, 1], [1, reduce ? 1 : 0.84]);
    const lotusOpacity = useTransform(p, [0, 0.95], [1, 0.3]);
    const uiY = useTransform(p, [0, 1], [0, reduce ? 0 : -70]);

    const front = usePointerShift(-16, -8);
    const back = usePointerShift(22, 10);

    return (
        <section id="inicio" ref={sectionRef} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
            {/* Aura do lótus e vinheta */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.4, delay: 0.2 }}
                    className="absolute left-1/2 top-[44%] h-[78vmin] w-[110vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(var(--lime)/0.13),rgb(var(--lime)/0.04)_55%,transparent)]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-void to-transparent" />
            </div>

            <div data-stem-rail className="shell flex flex-1 flex-col pt-[calc(var(--header-h)+0.75rem)]">
                {/* Palco: duas linhas gigantes com o lótus entre elas em profundidade */}
                <div className="relative isolate flex flex-1 flex-col items-center justify-center py-4">
                    <h1 className="display-hero relative grid select-none justify-items-center text-center">
                        <span className="sr-only">Lotus: </span>
                        <motion.span style={{ x: front.x, y: frontY }} className="relative z-[3] block">
                            <motion.span style={{ y: front.y }} className="block">
                                <Line delay={0.45}>inovação</Line>
                            </motion.span>
                        </motion.span>
                        <motion.span style={{ x: back.x, y: backY, opacity: backOpacity }} className="relative z-[1] block text-[rgb(var(--fern))]">
                            <motion.span style={{ y: back.y }} className="block">
                                <Line delay={0.2}>
                                    que <br className="sm:hidden" />
                                    floresce
                                </Line>
                            </motion.span>
                        </motion.span>
                    </h1>

                    <div className="pointer-events-none absolute inset-0 z-[2] grid place-items-center">
                        <motion.div
                            style={{ scale: lotusScale, opacity: lotusOpacity, y: '6%' }}
                            className="relative w-[min(88vw,420px)] origin-[50%_89%] md:w-[min(60vw,640px,70svh)]"
                        >
                            <LotusParticles delay={0.15} />
                            <span data-stem="origin" className="absolute left-1/2 top-[89%] block h-0 w-0" />
                        </motion.div>
                    </div>

                    {/* Notas laterais simétricas ao eixo do caule */}
                    <motion.p
                        style={{ y: uiY }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.3 }}
                        className="absolute left-0 top-[calc(50%-var(--hero-fs)*0.34)] z-[4] hidden max-w-[11rem] text-[0.9375rem] leading-snug text-sage xl:block"
                    >
                        Soluções de desenvolvimento de software
                    </motion.p>
                    <motion.p
                        style={{ y: uiY }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.4 }}
                        className="absolute right-0 top-[calc(50%-var(--hero-fs)*0.34)] z-[4] hidden max-w-[11rem] text-right text-[0.9375rem] leading-snug text-sage xl:block"
                    >
                        Espírito Santo, Brasil
                    </motion.p>
                </div>

                {/* Linha do chão: o caule cruza aqui e segue para o trilho */}
                <motion.div
                    data-stem="divider"
                    initial={{ scaleX: reduce ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
                    className="h-px w-full origin-center bg-bone/10"
                />

                <motion.div style={{ y: uiY }} className="relative z-[4] grid gap-7 py-7 md:grid-cols-[1fr_auto] md:items-end">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 1.15 } } }}
                        className="flex flex-col gap-5"
                    >
                        <motion.p
                            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8 } } }}
                            className="text-[1.0625rem] text-sage xl:hidden"
                        >
                            Soluções de desenvolvimento de software
                        </motion.p>
                        <motion.ul
                            variants={{ hidden: { opacity: 0, y: reduce ? 0 : 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
                            className="flex flex-wrap gap-2"
                            aria-label="Frentes de atuação"
                        >
                            {TAGS.map((tag) => (
                                <li key={tag} className="tag">
                                    {tag}
                                </li>
                            ))}
                        </motion.ul>
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: reduce ? 0 : 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
                            className="flex flex-wrap items-center gap-3"
                        >
                            <a href={MAILTO} className="btn btn-primary">
                                Falar com especialista
                                <ArrowUpRight size={18} strokeWidth={2} className="nudge" />
                            </a>
                            <a href="#sobre" className="btn btn-ghost">
                                Conheça a Lotus
                                <ArrowDown size={17} strokeWidth={1.75} className="nudge-down" />
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.dl
                        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {STATS.map((s) => (
                            <div
                                key={s.value}
                                className="flex h-[7.25rem] w-full flex-col justify-between rounded-2xl border border-bone/10 bg-bone/[0.025] p-4 backdrop-blur-sm sm:w-[11.5rem]"
                            >
                                <dt className="order-2 text-[0.8125rem] leading-tight text-sage">
                                    {s.label[0]}
                                    <br />
                                    {s.label[1]}
                                </dt>
                                <dd className="tabular order-1 self-end text-[2.5rem] font-extralight leading-none tracking-[-0.04em] text-bone">{s.value}</dd>
                            </div>
                        ))}
                    </motion.dl>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 1.6 }}
                className="shell relative z-[4] border-t border-bone/[0.06] py-5"
            >
                <Marquee items={STACK} label="Stack" />
            </motion.div>
        </section>
    );
};

export default Hero;
