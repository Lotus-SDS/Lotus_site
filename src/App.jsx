import React, { useState, useEffect } from 'react';
import {
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  Menu,
  X,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ChevronRight
} from 'lucide-react';

import lotusLogo from './assets/logo.png';

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

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen font-sans text-slate-600 bg-white selection:bg-lotus-100 selection:text-lotus-900">

      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <img src={lotusLogo} alt="Lotus Logo" className="h-10 -mt-1 -mr-3 w-auto" />
              <span className="text-2xl font-bold text-slate-800 tracking-tight">Lotus</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <a href="#sobre" className="text-slate-600 hover:text-lotus-600 font-medium transition-colors">Sobre</a>
              <a href="#servicos" className="text-slate-600 hover:text-lotus-600 font-medium transition-colors">Serviços</a>
              <a href="#team" className="text-slate-600 hover:text-lotus-600 font-medium transition-colors">Time</a>
              <a
                href="#contato"
                className="relative px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium transition-all shadow-lg shadow-slate-200 hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 bg-lotus-500 rounded-full opacity-50 blur-lg group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-8 h-8 bg-blue-500 rounded-full opacity-50 blur-lg group-hover:opacity-70 transition-opacity"></div>
                <span className="relative z-10">Fale Conosco</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-slate-600 hover:text-slate-900 focus:outline-none">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-lg animate-in slide-in-from-top-5">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#sobre" onClick={toggleMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-lotus-600 hover:bg-slate-50">Sobre</a>
              <a href="#servicos" onClick={toggleMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-lotus-600 hover:bg-slate-50">Serviços</a>
              <a href="#team" onClick={toggleMenu} className="block px-3 py-3 rounded-lg text-base font-medium text-slate-600 hover:text-lotus-600 hover:bg-slate-50">Time</a>
              <a href="#contato" onClick={toggleMenu} className="block px-3 py-3 mt-4 text-center rounded-lg text-base font-medium bg-lotus-50 text-lotus-700">Fale Conosco</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-lotus-50 text-lotus-700 text-sm font-medium mb-8 border border-lotus-200">
              Inovação em Software desde 2025
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 leading-tight">
              Inovação que floresce <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lotus-500 to-emerald-600">através do código.</span>
            </h1>
            <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
              Transformamos problemas complexos em soluções digitais elegantes.
              Ecossistemas de software robustos, escaláveis e focados na experiência do usuário.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#contato"
                className="px-8 py-4 rounded-full bg-lotus-600 text-white font-semibold text-lg hover:bg-lotus-700 transition-all shadow-lg shadow-lotus-200 hover:shadow-lotus-300 flex items-center justify-center gap-2"
              >
                Iniciar Projeto <ArrowRight size={20} />
              </a>
              <a
                href="#servicos"
                className="px-8 py-4 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold text-lg hover:bg-slate-50 transition-all flex items-center justify-center"
              >
                Nossos Serviços
              </a>
            </div>
          </div>

          {/* Abstract Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-lotus-100/50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl relative overflow-hidden aspect-square flex items-center justify-center border border-slate-800">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-lotus-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-500 rounded-full opacity-20 blur-3xl"></div>

                <div className="relative z-10 w-full h-full bg-slate-950/50 rounded-xl p-4 border border-slate-800 backdrop-blur-sm">
                  <CodeTypingAnimation />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border border-slate-100 z-20">
                <p className="text-lotus-600 font-serif italic text-lg">"A simplicidade é o último grau de sofisticação."</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Sobre a Lotus</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Fundada em 2025, a Lotus nasceu com uma missão clara: elevar o padrão do desenvolvimento de software.
                Não escrevemos apenas código; criamos experiências digitais que impulsionam negócios e facilitam vidas.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nossa abordagem combina rigor técnico com sensibilidade estética. Acreditamos que softwares poderosos
                não precisam ser complicados. Pelo contrário, a verdadeira sofisticação está na entrega de soluções
                intuitivas e eficientes.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-3xl font-bold text-lotus-600 mb-1">2025</h3>
                  <p className="text-sm text-slate-500">Ano de Fundação</p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="text-3xl font-bold text-lotus-600 mb-1">100%</h3>
                  <p className="text-sm text-slate-500">Foco em Qualidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nossos Serviços</h2>
            <p className="text-lg text-slate-500">
              Oferecemos um leque completo de soluções tecnológicas para transformar sua visão em realidade digital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<Code2 size={32} />}
              title="Desenvolvimento Web"
              description="Sistemas complexos, dashboards interativos e Landing Pages de alta conversão com React e Next.js."
            />
            <ServiceCard
              icon={<Smartphone size={32} />}
              title="Aplicativos Móveis"
              description="Apps nativos e híbridos para iOS e Android que oferecem performance excepcional e UX fluida."
            />
            <ServiceCard
              icon={<Cloud size={32} />}
              title="Arquitetura Cloud"
              description="Infraestrutura escalável e segura na AWS ou Azure, com práticas modernas de DevOps e CI/CD."
            />
            <ServiceCard
              icon={<Cpu size={32} />}
              title="Integração com IA"
              description="Implementação de modelos de Inteligência Artificial para automatizar processos e gerar insights."
            />
          </div>
        </div>
      </section>

      {/* Liderança */}
      <section id="team" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Liderança</h2>
            <p className="text-lg text-slate-500">Mentes visionárias por trás da Lotus.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <TeamMember
              name="João Paulo G. Azevedo"
              role="Co-Founder & CEO"
              image="https://github.com/jpguelerazevedo.png"
              github="https://github.com/jpguelerazevedo"
            />
            <TeamMember
              name="Pedro Henrique B. Duarte"
              role="Co-Founder & CEO"
              image="https://github.com/PhenBD.png"
              github="https://github.com/PhenBD"
            />
          </div>
        </div>
      </section>

      {/* CTA / Contato */}
      <section id="contato" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-lotus-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Vamos construir o futuro juntos?</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Tem um projeto em mente? Entre em contato e descubra como a Lotus pode elevar o nível do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:contato.lotus.sds@gmail.com"
                className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                <Mail size={20} /> Falar com Especialista
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-transparent border border-slate-600 text-white font-semibold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold text-slate-800">Lotus</span>
                <div className="w-2 h-2 rounded-full bg-lotus-500"></div>
              </div>
              <p className="text-slate-500 max-w-xs">
                Inovação que floresce através do código. Soluções digitais para um mundo conectado.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><a href="#sobre" className="text-slate-500 hover:text-lotus-600 transition-colors">Sobre</a></li>
                <li><a href="#servicos" className="text-slate-500 hover:text-lotus-600 transition-colors">Serviços</a></li>
                <li><a href="#team" className="text-slate-500 hover:text-lotus-600 transition-colors">Time</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Contato</h4>
              <ul className="space-y-2">
                <li><a href="mailto:contato.lotus.sds@gmail.com" className="text-slate-500 hover:text-lotus-600 transition-colors">contato.lotus.sds@gmail.com</a></li>
                <li><span className="text-slate-500">Espírito Santo, Brasil</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">© 2025 Lotus Soluções em Software. Todos os direitos reservados.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-lotus-600 transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-lotus-600 transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components

const ServiceCard = ({ icon, title, description }) => (
  <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-14 h-14 rounded-xl bg-lotus-50 text-lotus-600 flex items-center justify-center mb-6 group-hover:bg-lotus-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">
      {description}
    </p>
  </div>
);

const TeamMember = ({ name, role, image, github }) => (
  <div className="flex flex-col items-center text-center group">
    <div className="relative mb-6">
      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-lotus-200/50 transition-all">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md text-slate-700 hover:text-lotus-600 transition-colors"
      >
        <Github size={20} />
      </a>
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
    <p className="text-lotus-600 font-medium mb-2">{role}</p>
  </div>
);

export default App;
