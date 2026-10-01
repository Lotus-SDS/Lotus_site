import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import LotusParticles from './animations/LotusParticles';
import { useFirstImage } from '../lib/useFirstImage';
import WhatsAppIcon from './WhatsAppIcon';
import { useContact } from '../lib/contact';
import { EMAIL, MAILTO, WHATSAPP, WHATSAPP_LABEL } from '../lib/site';

const BLOOM = ['/images/lotus-bloom.webp', '/images/lotus-bloom.jpg', '/images/lotus-bloom.png'];
const PILLARS = ['Moderno', 'Rápido', 'Seguro', 'Escalável'];

const Contact = () => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const openContact = useContact();
    const bloomSrc = useFirstImage(BLOOM);
    const [copied, setCopied] = useState(false);

    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
    const bloomScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.82, 1]);
    const bloomY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, 0]);

    useEffect(() => {
        if (!copied) return undefined;
        const t = setTimeout(() => setCopied(false), 2200);
        return () => clearTimeout(t);
    }, [copied]);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
        } catch {
            window.location.href = MAILTO;
        }
    };

    return (
        <section id="contato" ref={ref} aria-labelledby="contato-title" className="relative overflow-hidden pb-[clamp(4rem,10vh,7rem)] pt-[clamp(5rem,12vh,9rem)]">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[34%] h-[80vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(var(--lime)/0.11),transparent)]"
            />

            <div className="shell relative flex flex-col items-center text-center">
                {/* A flor final: floresce quando o caule chega ao fim */}
                <motion.div style={{ scale: bloomScale, y: bloomY }} className="relative w-[min(78vw,500px)]">
                    {bloomSrc ? (
                        <img
                            src={bloomSrc}
                            alt="Flor de lótus aberta, iluminada em verde-lima"
                            className="aspect-square w-full object-cover mix-blend-lighten [mask-image:radial-gradient(closest-side,#000_62%,transparent)]"
                        />
                    ) : (
                        <LotusParticles startOnView maxParticles={3400} />
                    )}
                </motion.div>

                <h2 id="contato-title" data-stem-node="contato" data-stem-tick="off" className="display-xl relative mt-6">
                    <span className="lit-text block">Vamos construir</span>
                    <span className="block text-moss">o futuro juntos?</span>
                </h2>
                <p className="lead mt-8 max-w-[46ch]">
                    Tem um projeto em mente? Entre em contato e descubra como a Lotus pode elevar o nível do seu negócio.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <button type="button" data-stem="cta" onClick={openContact} aria-haspopup="dialog" className="cta-socket btn btn-primary btn-lg">
                        Falar com especialista
                    </button>
                </div>

                <div className="mt-7 flex flex-col items-center gap-3 text-[0.9375rem] sm:flex-row sm:gap-6">
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="link-quiet inline-flex items-center gap-2">
                        <WhatsAppIcon size={15} />
                        {WHATSAPP_LABEL}
                    </a>
                    <div className="flex items-center gap-2">
                        <a href={MAILTO} className="link-quiet">
                            {EMAIL}
                        </a>
                        <button
                            type="button"
                            onClick={copyEmail}
                            aria-label="Copiar e-mail"
                            className="relative grid h-9 w-9 place-items-center rounded-full border border-bone/10 text-sage transition-colors hover:border-bone/30 hover:text-bone"
                        >
                            {copied ? <Check size={15} className="text-lime" aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                        </button>
                        <span role="status" aria-live="polite" className={`text-[0.8125rem] text-lime transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
                            {copied ? 'Copiado' : ''}
                        </span>
                    </div>
                </div>
            </div>

            <div className="shell relative mt-24">
                <p className="flex items-center justify-center gap-x-2.5 whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-sage sm:gap-x-4 sm:text-[0.875rem] sm:tracking-[0.2em]">
                    <span aria-hidden="true" className="hidden h-px w-12 bg-lime/50 sm:block" />
                    {PILLARS.map((word, i) => (
                        <React.Fragment key={word}>
                            {i > 0 && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lime/70" />}
                            <span>{word}</span>
                        </React.Fragment>
                    ))}
                    <span aria-hidden="true" className="hidden h-px w-12 bg-lime/50 sm:block" />
                </p>
            </div>
        </section>
    );
};

export default Contact;
