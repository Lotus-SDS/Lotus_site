import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Github } from 'lucide-react';
import { EMAIL, GITHUB_ORG, MAILTO, WHATSAPP, WHATSAPP_LABEL } from '../lib/site';

const LINKS = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#servicos', label: 'Serviços' },
    { href: '#team', label: 'Time' },
];

const Footer = () => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
    const rise = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['45%', '0%']);
    const year = new Date().getFullYear();

    return (
        <footer ref={ref} className="relative overflow-hidden border-t border-bone/[0.07]">
            <div className="shell grid gap-12 pb-12 pt-16 md:grid-cols-12">
                <div className="md:col-span-5">
                    <a href="#inicio" className="inline-flex items-center gap-2.5" aria-label="Lotus, voltar ao início">
                        <img src="/lotuslogo.png" alt="" width="40" height="28" className="h-7 w-auto" />
                        <span className="text-[1.5rem] font-medium leading-none tracking-[-0.04em] text-bone">lotus</span>
                    </a>
                    <p className="mt-5 max-w-[34ch] text-sage">Inovação que floresce através do código. Soluções digitais para um mundo conectado.</p>
                </div>

                <nav aria-labelledby="rodape-links" className="md:col-span-3 md:col-start-7">
                    <h3 id="rodape-links" className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-sage">
                        Links rápidos
                    </h3>
                    <ul className="mt-5 space-y-3">
                        {LINKS.map((l) => (
                            <li key={l.href}>
                                <a href={l.href} className="link-quiet text-bone/80">
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="md:col-span-3">
                    <h3 className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-sage">Contato</h3>
                    <ul className="mt-5 space-y-3">
                        <li>
                            <a href={MAILTO} className="link-quiet break-all text-bone/80">
                                {EMAIL}
                            </a>
                        </li>
                        <li>
                            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="link-quiet text-bone/80">
                                WhatsApp {WHATSAPP_LABEL}
                            </a>
                        </li>
                        <li className="text-bone/80">Espírito Santo, Brasil</li>
                    </ul>
                    <div className="mt-6 flex gap-2">
                        <a
                            href={GITHUB_ORG}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub da Lotus"
                            className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-sage transition-colors hover:border-lime/50 hover:text-lime"
                        >
                            <Github size={17} strokeWidth={1.75} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Assinatura gigante em contorno, como uma trilha de circuito */}
            <div aria-hidden="true" className="relative h-[clamp(6.5rem,23vw,21rem)] select-none overflow-hidden">
                <motion.p
                    style={{ y: rise }}
                    className="absolute inset-x-0 top-0 text-center text-[clamp(9rem,33vw,32rem)] font-extralight leading-[0.78] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(var(--lime)/0.4)]"
                >
                    lotus
                </motion.p>
            </div>

            <div className="shell flex flex-col gap-2 border-t border-bone/[0.07] py-6 text-[0.8125rem] text-sage md:flex-row md:items-center md:justify-between">
                <p>© {year} Lotus Soluções em Desenvolvimento de Software. Todos os direitos reservados.</p>
                <p>lotusdev.com.br</p>
            </div>
        </footer>
    );
};

export default Footer;
