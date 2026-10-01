import React, { useCallback, useEffect, useRef } from 'react';
import { ArrowUpRight, Mail, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { ContactContext } from '../lib/contact';
import { EMAIL, MAILTO, WHATSAPP, WHATSAPP_LABEL } from '../lib/site';

const CHANNELS = [
    { href: WHATSAPP, label: 'WhatsApp', detail: WHATSAPP_LABEL, Icon: WhatsAppIcon, external: true },
    { href: MAILTO, label: 'E-mail', detail: EMAIL, Icon: Mail },
];

// Um único diálogo nativo para todos os "Falar com especialista": no celular vira uma folha que sobe do rodapé.
const ContactProvider = ({ children }) => {
    const dialogRef = useRef(null);
    const returnTo = useRef(null);

    const open = useCallback(() => {
        const dialog = dialogRef.current;
        if (!dialog || dialog.open) return;
        returnTo.current = document.activeElement;
        dialog.showModal();
    }, []);

    const close = () => dialogRef.current?.close();

    // Devolve o foco a quem abriu, se ainda estiver na página.
    useEffect(() => {
        const dialog = dialogRef.current;
        const onClose = () => {
            if (returnTo.current?.isConnected) returnTo.current.focus();
        };
        dialog.addEventListener('close', onClose);
        return () => dialog.removeEventListener('close', onClose);
    }, []);

    return (
        <ContactContext.Provider value={open}>
            {children}
            <dialog
                ref={dialogRef}
                aria-labelledby="falar-title"
                className="contact-dialog"
                // Clique fora do painel (no fundo escurecido) fecha.
                onClick={(e) => e.target === e.currentTarget && close()}
            >
                <div className="relative rounded-t-[1.75rem] border border-b-0 border-bone/10 bg-ink px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-7 sm:rounded-[1.75rem] sm:border-b sm:p-8">
                    <p className="text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-sage">Falar com especialista</p>
                    <h2 id="falar-title" className="mt-3 text-[1.75rem] font-light leading-tight tracking-[-0.03em] text-bone">
                        Como prefere conversar?
                    </h2>

                    <ul className="mt-7 grid gap-2.5">
                        {CHANNELS.map((c) => (
                            <li key={c.label}>
                                <a
                                    href={c.href}
                                    onClick={close}
                                    {...(c.external && { target: '_blank', rel: 'noopener noreferrer' })}
                                    className="group flex items-center gap-4 rounded-2xl border border-bone/10 bg-bone/[0.025] p-4 transition-colors duration-300 hover:border-lime/40 hover:bg-bone/[0.05]"
                                >
                                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-lime/40 text-lime transition-colors duration-300 group-hover:bg-lime group-hover:text-void">
                                        <c.Icon size={19} strokeWidth={1.75} />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block font-medium text-bone">{c.label}</span>
                                        <span className="block truncate text-[0.875rem] text-sage">{c.detail}</span>
                                    </span>
                                    <ArrowUpRight
                                        size={18}
                                        strokeWidth={1.75}
                                        aria-hidden="true"
                                        className="ml-auto shrink-0 text-sage transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        onClick={close}
                        aria-label="Fechar"
                        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-sage transition-colors hover:border-bone/40 hover:text-bone"
                    >
                        <X size={17} />
                    </button>
                </div>
            </dialog>
        </ContactContext.Provider>
    );
};

export default ContactProvider;
