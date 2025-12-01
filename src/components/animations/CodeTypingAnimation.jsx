import React, { useState, useEffect } from 'react';

const CodeTypingAnimation = () => {
    const [text, setText] = useState('');

    const texts = [
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
    return "Future_Is_Now"`
    ];

    useEffect(() => {
        let index = 0;
        let isDeleting = false;
        let textIndex = 0;
        let timer;

        const type = () => {
            const currentFullText = texts[textIndex];
            setText(currentFullText.substring(0, index));

            if (!isDeleting && index < currentFullText.length) {
                index++;
                timer = setTimeout(type, 50);
            } else if (isDeleting && index > 0) {
                index--;
                timer = setTimeout(type, 30);
            } else {
                if (!isDeleting) {
                    isDeleting = true;
                    timer = setTimeout(type, 2000);
                } else {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    timer = setTimeout(type, 500);
                }
            }
        };

        type();
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="font-mono text-xs sm:text-sm md:text-base text-slate-300 w-full h-full overflow-hidden">
            <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <pre className="whitespace-pre-wrap break-words">
                <code className="language-python block">
                    {text.split('\n').map((line, i) => (
                        <div key={i} className="block">
                            <span
                                className="break-words whitespace-pre-wrap"
                                dangerouslySetInnerHTML={{
                                    __html: line
                                        .replace(/\b\d+\b/g, '<span __c=\'text-emerald-400\'>$&</span>')
                                        .replace(/"[^"]*"/g, '<span __c=\'text-orange-400\'>$&</span>')
                                        .replace(/#.*$/g, '<span __c=\'text-slate-500 italic\'>$&</span>')
                                        .replace(/\b(def|class|if|return|async|await)\b/g, '<span __c=\'text-lotus-400 font-bold\'>$&</span>')
                                        .replace(/\b(self)\b/g, '<span __c=\'text-blue-400 italic\'>$&</span>')
                                        .replace(/\b(Lotus|Software)\b/g, '<span __c=\'text-emerald-400 font-bold\'>$&</span>')
                                        .replace(/__c=/g, 'class=')
                                }}
                            />
                        </div>
                    ))}
                    <span className="animate-pulse text-lotus-400">|</span>
                </code>
            </pre>
        </div>
    );
};

export default CodeTypingAnimation;
