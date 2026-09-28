import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Chip from './animations/Chip';
import CodeWindow from './animations/CodeWindow';
import { usePointerShift } from '../lib/pointer';
import { EASE } from '../lib/site';

const Approach = () => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

    // O chip (fundo) anda devagar; a janela de código (frente) atravessa mais rápido.
    const chipY = useTransform(p, [0, 1], reduce ? [0, 0] : [70, -70]);
    const chipRotate = useTransform(p, [0, 1], reduce ? [0, 0] : [-5, 5]);
    const codeY = useTransform(p, [0, 1], reduce ? [0, 0] : [150, -130]);
    const tilt = usePointerShift(7, -5);

    return (
        <section id="abordagem" ref={ref} aria-labelledby="abordagem-title" className="relative py-[clamp(6rem,16vh,11rem)]">
            <div className="shell grid items-center gap-y-16 lg:grid-cols-12 lg:gap-x-10">
                <div className="relative z-[2] lg:col-span-5">
                    <h2 id="abordagem-title" data-stem-node="abordagem" className="title-split">
                        <span className="lit-text">Rigor técnico</span> <span className="text-lime">×</span>{' '}
                        <span className="text-moss">sensibilidade estética</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                        transition={{ duration: 0.9, ease: EASE }}
                        className="lead mt-8 max-w-[40ch]"
                    >
                        Acreditamos que softwares poderosos não precisam ser complicados. Pelo contrário, a verdadeira sofisticação está na
                        entrega de soluções intuitivas e eficientes.
                    </motion.p>
                    <a href="#servicos" className="btn btn-light mt-10">
                        Ver serviços
                        <ArrowDown size={17} strokeWidth={1.75} className="nudge-down" />
                    </a>
                </div>

                <div className="relative lg:col-span-7">
                    <motion.div style={{ y: chipY, rotate: chipRotate }} className="relative ml-auto w-full sm:-mt-[4%] sm:w-[92%]">
                        <Chip />
                    </motion.div>
                    <motion.div
                        style={{ y: codeY }}
                        className="relative z-[2] -mt-[20%] w-full [perspective:1200px] sm:absolute sm:bottom-[-16%] sm:left-[-2%] sm:mt-0 sm:w-[58%]"
                    >
                        <motion.div style={{ rotateY: tilt.x, rotateX: tilt.y }}>
                            <CodeWindow />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Approach;
