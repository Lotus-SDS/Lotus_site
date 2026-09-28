import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { EASE, EMAIL, MAILTO, NAV } from '../lib/site';

// Seções que acendem cada item do menu (Abordagem pertence a "Sobre").
const SECTION_TO_NAV = { inicio: 0, sobre: 1, abordagem: 1, servicos: 2, team: 3, contato: 4 };

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(0);
    const reduce = useReducedMotion();
    const menuButton = useRef(null);
    const firstLink = useRef(null);

    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Seção ativa: a que cruza a linha de leitura (40% da altura da tela).
    useEffect(() => {
        const ids = Object.keys(SECTION_TO_NAV);
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(SECTION_TO_NAV[entry.target.id]);
                });
            },
            { rootMargin: '-40% 0px -59% 0px' },
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, []);

    // Menu móvel: trava a rolagem, fecha com Esc e devolve o foco.
    useEffect(() => {
        if (!open) return undefined;
        const button = menuButton.current;
        // Conteúdo atrás do menu sai da ordem de foco enquanto ele está aberto.
        const behind = [...document.querySelectorAll('main, footer')];
        behind.forEach((el) => {
            el.inert = true;
        });
        document.documentElement.style.overflow = 'hidden';
        firstLink.current?.focus();
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => {
            behind.forEach((el) => {
                el.inert = false;
            });
            document.documentElement.style.overflow = '';
            window.removeEventListener('keydown', onKey);
            button?.focus();
        };
    }, [open]);

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div
                className={`absolute inset-0 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-expo ${
                    scrolled && !open
                        ? 'border-bone/[0.07] bg-void/70 backdrop-blur-xl backdrop-saturate-150'
                        : 'border-transparent bg-transparent'
                }`}
            />
            <div className="shell relative flex h-[var(--header-h)] items-center justify-between gap-6">
                <a href="#inicio" className="group relative z-10 flex items-center gap-2.5" aria-label="Lotus, voltar ao início">
                    <img src="/lotuslogo.png" alt="" width="34" height="24" className="h-6 w-auto transition-transform duration-500 ease-expo group-hover:-translate-y-0.5" />
                    <span className="text-[1.3rem] font-medium leading-none tracking-[-0.04em] text-bone">lotus</span>
                </a>

                <nav aria-label="Principal" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                    <ul className="relative flex items-center gap-1">
                        {NAV.map((item, i) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    aria-current={active === i ? 'true' : undefined}
                                    className={`relative block px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-300 ${
                                        active === i ? 'text-bone' : 'text-sage hover:text-bone'
                                    }`}
                                >
                                    {item.label}
                                    {/* Via do menu: acende conforme a leitura avança */}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -bottom-[7px] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full border transition-colors duration-500 ${
                                            i <= active ? 'border-lime bg-lime' : 'border-bone/25 bg-void'
                                        }`}
                                    />
                                </a>
                            </li>
                        ))}
                        <span aria-hidden="true" className="absolute -bottom-[5px] left-3.5 right-3.5 -z-10 h-px bg-bone/10">
                            <motion.span className="absolute inset-0 origin-left bg-lime/70" style={{ scaleX: progress }} />
                        </span>
                    </ul>
                </nav>

                <div className="relative z-10 flex items-center gap-2">
                    <a href={MAILTO} className="btn btn-primary hidden h-10 px-5 text-[0.875rem] sm:inline-flex">
                        Falar com especialista
                        <ArrowUpRight size={16} strokeWidth={2} className="nudge" />
                    </a>
                    <button
                        ref={menuButton}
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="menu-movel"
                        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                        className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone transition-colors hover:border-bone/40 lg:hidden"
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        id="menu-movel"
                        className="fixed inset-0 -z-10 flex flex-col bg-void/95 px-[var(--gutter)] pb-10 pt-[calc(var(--header-h)+2rem)] backdrop-blur-2xl lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.35, ease: EASE }}
                    >
                        <nav aria-label="Menu" className="flex-1">
                            <ul className="flex flex-col">
                                {NAV.map((item, i) => (
                                    <motion.li
                                        key={item.id}
                                        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.05 + i * 0.05, ease: EASE }}
                                        className="border-b border-bone/[0.08]"
                                    >
                                        <a
                                            ref={i === 0 ? firstLink : undefined}
                                            href={`#${item.id}`}
                                            onClick={() => setOpen(false)}
                                            className="flex items-center justify-between py-4 text-[2.5rem] font-light leading-none tracking-[-0.04em] text-bone"
                                        >
                                            {item.label}
                                            <span
                                                aria-hidden="true"
                                                className={`h-2 w-2 rounded-full border ${i <= active ? 'border-lime bg-lime' : 'border-bone/30'}`}
                                            />
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="flex flex-col gap-4"
                        >
                            <a href={MAILTO} className="btn btn-primary btn-lg w-full">
                                Falar com especialista
                                <ArrowUpRight size={18} className="nudge" />
                            </a>
                            <a href={MAILTO} className="text-center text-sm text-sage">
                                {EMAIL}
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
