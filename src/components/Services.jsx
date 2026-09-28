import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, Cloud, Code2, Smartphone } from 'lucide-react';
import { EASE } from '../lib/site';

const SERVICES = [
    {
        icon: Code2,
        title: 'Desenvolvimento Web',
        description: 'Sistemas complexos, dashboards interativos e Landing Pages de alta conversão com React e Next.js.',
        tags: ['React', 'Next.js'],
    },
    {
        icon: Smartphone,
        title: 'Aplicativos Móveis',
        description: 'Apps nativos e híbridos para iOS e Android que oferecem performance excepcional e UX fluida.',
        tags: ['iOS', 'Android'],
    },
    {
        icon: Cloud,
        title: 'Arquitetura Cloud',
        description: 'Infraestrutura escalável e segura na AWS ou Azure, com práticas modernas de DevOps e CI/CD.',
        tags: ['AWS', 'Azure', 'CI/CD'],
    },
    {
        icon: BrainCircuit,
        title: 'Integração com IA',
        description: 'Implementação de modelos de Inteligência Artificial para automatizar processos e gerar insights.',
        tags: ['IA', 'Automação'],
    },
];

// Cada serviço é um "fruto" da colheita: o caule se ramifica e acende o card ao chegar.
const Services = () => {
    const reduce = useReducedMotion();
    return (
        <section id="servicos" aria-labelledby="servicos-title" className="relative py-[clamp(6rem,16vh,11rem)]">
            <div className="shell">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                    <h2 id="servicos-title" data-stem-node="servicos" className="title-split lg:col-span-7">
                        <span className="lit-text">Serviços:</span> <span className="text-moss">da visão à realidade digital</span>
                    </h2>
                    <p className="lead max-w-[38ch] lg:col-span-4 lg:col-start-9 lg:pb-1">
                        Oferecemos um leque completo de soluções tecnológicas para transformar sua visão em realidade digital.
                    </p>
                </div>

                <div className="relative mt-24 lg:mt-28">
                    {/* Placa sob os cards: grade de pontos e luz do barramento, que o vidro desfoca */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-x-6 -bottom-16 -top-10 bg-[radial-gradient(rgb(var(--bone)/0.09)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_50%_45%,#000_30%,transparent_72%)]"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-[8%] top-[5%] h-[70%] bg-[radial-gradient(ellipse_at_center,rgb(var(--lime)/0.14),transparent_68%)] blur-2xl"
                    />
                    <ul className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {SERVICES.map(({ icon, title, description, tags }, i) => {
                            const Icon = icon;
                            return (
                                <li key={title} data-stem-tile className="tile glass flex flex-col rounded-[20px] p-6 sm:p-7">
                                    <motion.div
                                        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                                        transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                                        className="flex h-full flex-col"
                                    >
                                        <span className="tile-icon grid h-12 w-12 place-items-center rounded-full border border-bone/15 text-lime">
                                            <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                                        </span>
                                        <h3 className="mt-10 text-[1.3rem] font-medium leading-tight tracking-[-0.02em] text-bone">{title}</h3>
                                        <p className="mt-3 text-[0.9688rem] leading-relaxed text-sage">{description}</p>
                                        <ul className="mt-auto flex flex-wrap gap-1.5 pt-8" aria-label={`Tecnologias de ${title}`}>
                                            {tags.map((tag) => (
                                                <li key={tag} className="rounded-full bg-bone/[0.05] px-2.5 py-1 text-[0.75rem] font-medium text-sage">
                                                    {tag}
                                                </li>
                                            ))}
                                        </ul>
                                </motion.div>
                            </li>
                        );
                    })}
                </ul>
                </div>
            </div>
        </section>
    );
};

export default Services;
