import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const STATEMENT = 'Não escrevemos apenas código, criamos experiências digitais que impulsionam negócios e facilitam vidas.';
const ACCENT = new Set(['experiências', 'digitais']);

const UNLIT = 'rgba(236, 239, 230, 0.13)';
const LIT = 'rgba(236, 239, 230, 1)';
const LIT_ACCENT = 'rgba(183, 201, 91, 1)';

// Cada palavra acende quando a leitura passa por ela.
const Word = ({ children, progress, range, accent }) => {
    const color = useTransform(progress, range, [UNLIT, accent ? LIT_ACCENT : LIT]);
    return <motion.span style={{ color }}>{children}</motion.span>;
};

const About = () => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.82', 'end 0.42'] });
    const words = STATEMENT.split(' ');

    return (
        <section id="sobre" aria-labelledby="sobre-title" className="relative py-[clamp(7rem,22vh,14rem)]">
            <div className="shell">
                <h2 id="sobre-title" className="sr-only">
                    Sobre a Lotus
                </h2>
                <p ref={ref} data-stem-node="sobre" data-stem-tick="off" className="statement mx-auto max-w-[17em] text-center">
                    {words.map((word, i) => {
                        const accent = ACCENT.has(word.replace(/[.,]/g, ''));
                        return (
                            <React.Fragment key={i}>
                                {reduce ? (
                                    <span className={accent ? 'text-lime' : undefined}>{word}</span>
                                ) : (
                                    <Word progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} accent={accent}>
                                        {word}
                                    </Word>
                                )}
                                {i < words.length - 1 && ' '}
                            </React.Fragment>
                        );
                    })}
                </p>
                <p className="lead mx-auto mt-12 max-w-[40ch] text-center">
                    Fundada em 2025, a Lotus nasceu com uma missão clara: elevar o padrão do desenvolvimento de software.
                </p>
            </div>
        </section>
    );
};

export default About;
