import React, { useEffect, useRef, useState } from 'react';

const SNIPPETS = [
    `# Cultivando ideias...
lotus = {
  "raiz": "Inovação",
  "bugs": "Ervas daninhas (0)",
  "regador": "Café.py",
  "colheita": ["Web", "Mobile", "Cloud"]
}

if voce.imagina():
  lotus.floresce()
  # Transformando sonhos em realidade
  return "Sucesso"`,
    `class Lotus(Software):
  def __init__(self):
    self.mission = "Innovation"
    self.quality = "Premium"
    self.stack = ["React", "Python", "AI"]
    self.since = 2025

  async def grow(self):
    await self.analyze_requirements()
    await self.deploy_solution()
    return "Future_Is_Now"`,
];

const LINES = 12;

const TOKEN = /(#.*$)|("[^"]*"?)|\b(def|class|if|return|async|await)\b|\b(self)\b|\b(Lotus|Software)\b|\b(\d+)\b/g;
const TOKEN_CLASS = [
    'italic text-moss', // comentário
    'text-lime-hi/80', // texto
    'text-lime', // palavra-chave
    'italic text-sage', // self
    'font-medium text-bone', // tipos
    'text-lime-hi', // números
];

function highlight(line) {
    const parts = [];
    let last = 0;
    TOKEN.lastIndex = 0;
    let m;
    while ((m = TOKEN.exec(line))) {
        if (m[0] === '') {
            TOKEN.lastIndex++;
            continue;
        }
        if (m.index > last) parts.push([line.slice(last, m.index), null]);
        const group = m.slice(1).findIndex(Boolean);
        parts.push([m[0], TOKEN_CLASS[group]]);
        last = m.index + m[0].length;
    }
    if (last < line.length) parts.push([line.slice(last), null]);
    return parts;
}

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Janela de código com o snippet da Lotus sendo digitado (o mesmo do site anterior).
const CodeWindow = () => {
    // Começa com o primeiro trecho completo; depois apaga e digita o próximo.
    const [text, setText] = useState(SNIPPETS[0]);
    const ref = useRef(null);

    useEffect(() => {
        if (prefersReduced()) return undefined;
        let snippet = 0;
        let index = SNIPPETS[0].length;
        let deleting = true;
        let timer = 0;
        let running = false;

        const step = () => {
            const full = SNIPPETS[snippet];
            if (!deleting && index < full.length) {
                index++;
                setText(full.slice(0, index));
                timer = setTimeout(step, full[index - 1] === '\n' ? 140 : 32);
            } else if (!deleting) {
                deleting = true;
                timer = setTimeout(step, 2600);
            } else if (index > 0) {
                index = Math.max(0, index - 3);
                setText(full.slice(0, index));
                timer = setTimeout(step, 14);
            } else {
                deleting = false;
                snippet = (snippet + 1) % SNIPPETS.length;
                timer = setTimeout(step, 500);
            }
        };

        // Só digita enquanto está visível.
        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !running) {
                running = true;
                timer = setTimeout(step, 3200);
            } else if (!entry.isIntersecting && running) {
                running = false;
                clearTimeout(timer);
            }
        });
        io.observe(ref.current);
        return () => {
            io.disconnect();
            clearTimeout(timer);
        };
    }, []);

    const lines = text.split('\n');

    return (
        <figure ref={ref} className="glass overflow-hidden rounded-[18px]" aria-label="Trecho de código da Lotus">
            <div className="flex items-center gap-3 border-b border-bone/[0.07] px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-bone/15" />
                </span>
                <span className="font-mono text-[0.75rem] text-sage">lotus.py</span>
            </div>
            <pre className="overflow-hidden px-3.5 py-4 font-mono text-[0.65rem] leading-[1.75] sm:px-5 sm:text-[0.8125rem]" style={{ height: `calc(${LINES} * 1.75em + 2rem)` }}>
                <code className="block">
                    {lines.map((line, i) => (
                        <span key={i} className="flex">
                            <span aria-hidden="true" className="mr-3 w-4 shrink-0 select-none text-right text-moss/70 sm:mr-4 sm:w-5">
                                {i + 1}
                            </span>
                            <span className="whitespace-pre text-bone/85">
                                {highlight(line).map(([chunk, cls], j) => (
                                    <span key={j} className={cls || undefined}>
                                        {chunk}
                                    </span>
                                ))}
                                {i === lines.length - 1 && <span aria-hidden="true" className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-caret bg-lime" />}
                            </span>
                        </span>
                    ))}
                </code>
            </pre>
        </figure>
    );
};

export default CodeWindow;
