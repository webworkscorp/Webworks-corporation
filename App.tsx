import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight,
  CheckCircle2,
  Globe,
  Lock,
  ZapIcon,
  Server,
  ArrowRight,
  ArrowLeft,
  Cpu,
  ShieldCheck,
  Send,
  MessageSquare,
  Layers,
  Rocket,
  CreditCard,
  Eye,
  FileText,
  MousePointer2,
  FileCheck2,
  Download,
  User,
  Briefcase,
  Link2,
  X,
  Menu
} from 'lucide-react';
import { CONTENT } from './constants';

/**
 * Hook de Persistencia de Video Industrial
 */
const useVideoPersistence = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const forcePlay = () => {
      if (video && video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    };

    const handleSync = () => {
      if (document.visibilityState === 'visible') forcePlay();
    };

    const handlePageShow = (e: PageTransitionEvent) => forcePlay();

    const heartbeat = setInterval(() => {
      if (document.visibilityState === 'visible') forcePlay();
    }, 1000);

    const handleUserInteraction = () => forcePlay();

    video.muted = true;
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('autoplay', 'true');
    video.loop = true;

    forcePlay();

    document.addEventListener('visibilitychange', handleSync);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('focus', handleSync);
    document.addEventListener('touchstart', handleUserInteraction, { passive: true });
    document.addEventListener('click', handleUserInteraction, { passive: true });

    return () => {
      clearInterval(heartbeat);
      document.removeEventListener('visibilitychange', handleSync);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('focus', handleSync);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [videoRef]);
};

const Header: React.FC<{ setView: (v: 'landing' | 'onboarding') => void; currentView: string }> = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoPersistence(videoRef);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (currentView !== 'landing') {
      setView('landing');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="absolute top-0 left-0 w-full h-16 md:h-24 border-b border-[#EAEAEA] bg-white transition-all duration-300 z-[100]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source 
              src="https://mqajxigehitkgdtepqzi.supabase.co/storage/v1/object/public/Video%20surf/6912377_Motion_Graphics_Motion_Graphic_3840x2160.mp4" 
              type="video/mp4" 
            />
          </video>
          <div className="absolute inset-0 bg-white/20"></div>
        </div>

        <div className="relative z-50 w-full h-full flex justify-between items-center pl-0 pr-6 md:pr-12">
          <div className="flex items-center cursor-pointer" onClick={() => setView('landing')}>
            <img 
              src={CONTENT.brand.logoUrl} 
              alt="Webworks" 
              className="h-20 md:h-32 w-auto object-contain transition-transform hover:scale-105 duration-300 -ml-4 md:-ml-12 z-10"
            />
            <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] -ml-4 md:-ml-10 mt-0.5 md:mt-1 opacity-90 whitespace-nowrap transition-colors duration-500 ${isOpen ? 'text-white' : 'text-[#0B0B0B]'}`}>
              Webworks
            </span>
          </div>

          <div className="flex items-center gap-8">
            {currentView === 'onboarding' && !isOpen && (
              <button 
                onClick={() => setView('landing')}
                className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-black/50 hover:text-black transition-colors"
              >
                <ArrowLeft size={14} /> Volver
              </button>
            )}
            <button 
              onClick={() => setIsOpen(true)}
              className={`group cursor-pointer p-2 outline-none focus:outline-none transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} 
              aria-label="Abrir menú"
            >
              <div className="flex flex-col gap-1.5 items-end">
                <div className="h-[2px] w-6 bg-[#0B0B0B]"></div>
                <div className="h-[2px] w-10 bg-[#0B0B0B]"></div>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div 
        className={`fixed inset-0 bg-[#0B0B0B] z-[130] transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) flex flex-col justify-center items-center ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {/* Botón de equis dentro del menú */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 md:top-10 md:right-12 p-2 text-white hover:text-gray-300 transition-all duration-300 hover:rotate-90"
          aria-label="Cerrar menú"
        >
          <X size={36} />
        </button>

        <nav className="flex flex-col gap-8 md:gap-12 text-center">
          <button onClick={() => scrollToSection('hero')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">Inicio</button>
          <button onClick={() => scrollToSection('filosofia')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">Filosofía</button>
          <button onClick={() => scrollToSection('sectores')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">Sectores</button>
          <button onClick={() => scrollToSection('pricing-section')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">Inversión</button>
          <button 
            onClick={() => { setView('onboarding'); setIsOpen(false); }} 
            className="mt-8 text-xs font-black uppercase tracking-[0.6em] text-white/30 hover:text-white transition-all"
          >
            Desplegar Proyecto
          </button>
        </nav>
      </div>
    </>
  );
};

// --- LANDING SECTIONS ---

const Hero: React.FC<{ setView: (v: 'onboarding') => void }> = ({ setView }) => {
  const handleScrollToSecond = () => {
    document.getElementById('filosofia')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-[75vh] flex items-center bg-white overflow-visible pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img src="https://i.imgur.com/uTJ43Ey.jpeg" alt="Background" className="w-full h-full object-cover opacity-60 md:opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-32 md:pb-40 relative z-10 w-full">
        <div className="max-w-[1000px]">
          <h1 className="text-5xl md:text-[84px] font-bold text-[#0B0B0B] leading-[1] tracking-tighter mb-10">
            ¡Tu página Web <br className="hidden md:block" />
            Profesional en <br className="hidden md:block" />
            <span className="text-[#0B0B0B]/40">menos de 24 horas!</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#5F5F5F] leading-snug tracking-tight mb-12 max-w-2xl">
            {CONTENT.hero.subheadline}
          </p>
          <button 
            className="group inline-flex items-center gap-4 bg-[#0B0B0B] text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 hover:bg-zinc-900 transition-all duration-300 active:scale-95"
            onClick={handleScrollToSecond}
          >
            Iniciar Proyecto <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 z-40 w-[220px] md:w-[380px] pointer-events-none translate-x-[32%] md:translate-x-[22%] translate-y-[42%] md:translate-y-[32%] -rotate-[15deg]">
        <img src="https://i.imgur.com/uyI8IGJ.png" alt="Robot" className="w-full h-auto object-contain" />
      </div>
    </section>
  );
};

const ElevateProfessional: React.FC = () => {
  return (
    <section id="filosofia" className="relative w-full py-24 md:py-32 border-t border-[#EAEAEA] bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="https://i.imgur.com/Ec2SU7O.jpeg" alt="Architecture" className="w-full h-full object-cover opacity-100 translate-y-32" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-[#0B0B0B]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]/40">Premium</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#0B0B0B] tracking-tighter leading-[1.1] mb-8">
              Ya es hora de que eleves tu <span className="text-[#0B0B0B]/40">imagen profesional.</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium text-[#5F5F5F] leading-relaxed mb-8">
              Nosotros estamos aquí para ayudarte a transformar tu presencia digital en una herramienta de autoridad.
            </p>
            <p className="text-lg text-[#0B0B0B]/60 leading-relaxed max-w-lg">
              Construimos infraestructuras web que no solo se ven increíbles, sino que están diseñadas para proyectar confianza y excelencia técnica desde el primer segundo.
            </p>
          </div>
          <div className="relative [perspective:2000px]">
            <div className="relative border border-[#EAEAEA] bg-white rounded shadow-2xl [transform:rotateY(-28deg)rotateX(6deg)] overflow-hidden">
              <img src="https://i.imgur.com/huMLysM.jpeg" alt="3D Architecture" className="w-full h-auto" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur border border-[#EAEAEA] px-4 py-2 rounded-sm">
                <span className="text-[9px] font-black text-[#0B0B0B] uppercase tracking-[0.2em]">v.25</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Sectors: React.FC = () => {
  return (
    <section id="sectores" className="relative w-full py-24 md:py-48 border-t border-[#EAEAEA] bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://i.imgur.com/PiSyZrK.jpeg" alt="Interior" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30"></div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-start">
          <div className="md:w-1/2">
            <div className="mb-8 flex items-center gap-4">
              <div className="w-1 h-8 bg-[#0B0B0B]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]/60">Rubros</span>
            </div>
            <h2 className="text-5xl md:text-[80px] font-bold text-[#0B0B0B] tracking-tighter leading-[0.9] mb-4">
              Diseñado para <br /> distintos <span className="text-[#0B0B0B]/20">sectores.</span>
            </h2>
          </div>
          <div className="md:w-1/2 flex flex-col justify-start md:pt-24">
            <p className="text-2xl md:text-4xl font-bold text-[#0B0B0B] leading-[1.1] tracking-tighter mb-10">
              Nuestra estructura se adapta a cualquier tipo de negocio, respetando la identidad de cada proyecto y manteniendo siempre una presentación clara, ordenada y profesional.
            </p>
            <p className="text-lg md:text-xl text-[#5F5F5F] leading-relaxed font-medium max-w-lg">
              Trabajamos con el mismo nivel de detalle y criterio técnico en todos los casos, para que tu sitio no solo se vea bien, sino que funcione de forma sólida y confiable desde el primer día.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectorShowcase: React.FC = () => {
  const images = ["https://i.imgur.com/nWTHPJs.jpeg", "https://i.imgur.com/fPJJxLS.jpeg", "https://i.imgur.com/hwBemT1.jpeg", "https://i.imgur.com/e5HzjfR.jpeg", "https://i.imgur.com/6hHl9VE.jpeg", "https://i.imgur.com/OoAd8l3.jpeg", "https://i.imgur.com/87SNhCb.jpeg"];
  return (
    <section className="w-full py-10 md:py-24 border-t border-[#EAEAEA] bg-white overflow-hidden">
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } } .animate-marquee { animation: marquee 20s linear infinite; }`}</style>
      <div className="relative flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee">
          {[...images, ...images].map((img, idx) => (
            <div key={idx} className="flex-none w-[140px] md:w-[220px] px-3">
              <div className="border border-[#EAEAEA] bg-white rounded-sm overflow-hidden [transform:rotateY(-18deg)]">
                <img src={img} alt="Web" className="w-full h-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QualificationSection: React.FC = () => {
  return (
    <section id="contacto" className="relative w-full py-24 md:py-48 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://i.imgur.com/5R3snoy.jpeg" alt="Luxury" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-7xl font-bold text-[#0B0B0B] tracking-tighter leading-[0.95]">
              ¿Aún no tienes <br /> <span className="text-[#0B0B0B]/30">claridad</span> sobre <br /> tu negocio?
            </h2>
            <div className="relative inline-block mt-4">
              <img src="https://i.imgur.com/970wptI.png" alt="Dormido" className="w-[180px] md:w-[240px] opacity-90 rotate-[-4deg]" />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="space-y-10 max-w-xl">
              <div className="space-y-4">
                <p className="text-4xl md:text-6xl font-bold text-[#0B0B0B] tracking-tighter leading-[1]">
                  Este servicio <br /> <span className="text-[#E02424]">no es para ti.</span>
                </p>
                <div className="h-[1px] w-24 bg-[#E02424]"></div>
              </div>
              <p className="text-xl md:text-2xl text-[#0B0B0B] leading-snug font-medium">
                Webworks está comprometido con negocios que están preparados y listos para elevar su imagen profesional desde hoy sin ninguna excusa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PositiveActionSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 md:py-64 bg-white">
      <div className="absolute inset-0 z-0" style={{backgroundImage: "url('https://i.imgur.com/LIwqSRa.jpeg')", backgroundSize: 'cover', opacity: 0.8}}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/20 to-white/95"></div>
      </div>
      <div className="absolute top-0 right-0 z-40 w-[240px] md:w-[480px] pointer-events-none -translate-y-[55%] -translate-x-[5%] hover:scale-110 transition-transform duration-700">
        <img src="https://i.imgur.com/VbadOB9.png" alt="Robot Ship" className="w-full h-auto drop-shadow-2xl" />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0B] tracking-tighter mb-8">
            ¡Pero a ti que sabes tu potencial, <br /> <span className="text-[#16a34a]">esto es para ti!</span>
          </h2>
          <p className="text-xl md:text-2xl font-medium text-[#0B0B0B] leading-relaxed max-w-3xl">
            Si entiendes que la mediocridad digital es el enemigo invisible de tu rentabilidad, has llegado al lugar correcto. Con Webworks elevar tu imagen profesional es posible gracias a nuestro nivel de detalle en nuestras paginas web.
          </p>
        </div>
      </div>
    </section>
  );
};

const SpacerSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoPersistence(videoRef);
  return (
    <section className="w-full bg-white py-0 overflow-hidden relative">
      <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-auto block scale-110">
        <source src="https://mqajxigehitkgdtepqzi.supabase.co/storage/v1/object/public/Video%20surf/Caminando_hacia_el_202601122244_xl212.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

const PricingSection: React.FC<{ setView: (v: 'onboarding') => void }> = ({ setView }) => {
  const handleScrollToHosting = () => {
    document.getElementById('hosting-bonus')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing-section" className="relative w-full pt-16 pb-24 md:pt-24 md:pb-32 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="https://i.imgur.com/s6JeFdz.jpeg" alt="Pattern" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#0B0B0B]/20"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B0B0B]/40">Inversión</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0B] tracking-tighter leading-[1.1]">
                <span className="text-[#0B0B0B]/30 font-medium block mb-4">Webs que normalmente cuestan cientos de miles de colones.</span>
                Webworks las pone a tu alcance por tan solo:
              </h2>
            </div>
          </div>
          <div className="relative group">
            <div className="relative bg-white/95 backdrop-blur-md border border-[#EAEAEA] p-10 md:p-14 rounded-2xl shadow-2xl text-center overflow-hidden">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]/30 mb-6 pt-10">Inversión Única</div>
              <div className="text-6xl md:text-8xl font-black text-[#0B0B0B] tracking-tighter mb-10">₡40,000</div>
              <ul className="space-y-8 mb-12 text-left max-w-[360px] mx-auto border-t border-b border-[#F5F5F5] py-10">
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={18} className="text-[#0B0B0B] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-[14px] font-bold text-[#0B0B0B] uppercase">Imagen de Autoridad</p>
                    <p className="text-[12px] font-medium text-[#5F5F5F] mt-1 tracking-tight">Atrae mejores clientes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={18} className="text-[#0B0B0B] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-[14px] font-bold text-[#0B0B0B] uppercase">Hosting GRATIS</p>
                    <p className="text-[12px] font-medium text-[#5F5F5F] mt-1 tracking-tight">Sin pagos mensuales.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={18} className="text-[#0B0B0B] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-[14px] font-bold text-[#0B0B0B] uppercase">Venta en Automático</p>
                    <p className="text-[12px] font-medium text-[#5F5F5F] mt-1 tracking-tight">Tu negocio abierto 24/7.</p>
                  </div>
                </li>
              </ul>
              <div className="px-10 pb-10">
                <button 
                  className="group w-full bg-[#0B0B0B] text-white py-6 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-black/20 hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center gap-3"
                  onClick={handleScrollToHosting}
                >
                  Iniciar Proyecto <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HostingBonusSection: React.FC = () => {
  return (
    <section id="hosting-bonus" className="relative w-full pt-16 pb-24 md:pt-24 md:pb-32 bg-white border-b border-[#EAEAEA] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="https://i.imgur.com/6xa0w6I.jpeg" 
          alt="Clean Architecture Background" 
          className="w-full h-full object-cover opacity-100 brightness-110 contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="h-[2px] w-12 bg-[#0B0B0B]"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]">Hosting</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-[#0B0B0B] tracking-tighter leading-[0.9] mb-12">¡Eso no <br /> es todo!</h2>
            <p className="text-2xl md:text-4xl font-light text-[#0B0B0B] leading-tight tracking-tight max-w-xl mb-16">
              Te ayudamos a publicar tu sitio en un hosting <span className="font-bold border-b-2 border-black/10">100% GRATIS</span>, con dominio personalizado incluido.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex items-center gap-4 opacity-70"><Server size={20} /><span className="text-xs font-bold uppercase tracking-widest">Global</span></div>
              <div className="flex items-center gap-4 opacity-70"><Lock size={20} /><span className="text-xs font-bold uppercase tracking-widest">Seguridad</span></div>
              <div className="flex items-center gap-4 opacity-70"><ZapIcon size={20} /><span className="text-xs font-bold uppercase tracking-widest">Velocidad</span></div>
              <div className="flex items-center gap-4 opacity-70"><Globe size={20} /><span className="text-xs font-bold uppercase tracking-widest">Online</span></div>
            </div>
          </div>
          <div className="relative [perspective:2000px]">
            <div className="bg-white border border-[#EAEAEA] rounded-xl shadow-2xl overflow-hidden [transform:rotateY(-20deg)rotateX(10deg)]">
              <div className="h-10 bg-[#FBFBFB] border-b border-[#EAEAEA] flex items-center px-4 justify-between">
                <div className="bg-white border border-[#EAEAEA] rounded-md px-4 py-1 flex items-center gap-2"><Lock size={10} className="text-[#16a34a]" /><span className="text-[9px] font-medium text-[#5F5F5F]">tu-negocio.com</span></div>
              </div>
              <div className="p-12 bg-white aspect-video flex items-center justify-center">
                <Globe size={48} className="text-[#0B0B0B]/5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTASection: React.FC<{ setView: (v: 'onboarding') => void }> = ({ setView }) => {
  return (
    <section id="final-cta" className="relative w-full pt-32 md:pt-56 pb-0 bg-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://i.imgur.com/8jDtw9w.jpeg" 
          alt="Corporate Architecture" 
          className="w-full h-full object-cover object-center scale-110 opacity-[0.98]"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/20 to-white"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 text-center pb-12 md:pb-20">
        <div className="flex flex-col items-center max-w-5xl mx-auto space-y-16">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-[150px] font-black text-[#0B0B0B] tracking-[-0.08em] leading-[0.8] text-center">
              ¡Qué estás <br /> esperando!
            </h2>
          </div>

          <div className="flex flex-col items-center space-y-10">
            <p className="text-2xl md:text-5xl font-semibold text-[#0B0B0B] tracking-[-0.05em] leading-[1] max-w-4xl mx-auto px-4">
              No permitas que una <span className="text-[#0B0B0B]/30">imagen mediocre</span> <br className="hidden md:block" /> sea el techo de tu crecimiento.
            </p>
            <div className="w-16 h-[2px] bg-black/5"></div>
            <p className="text-xl md:text-3xl font-medium text-[#0B0B0B] tracking-tight">
              Únete a los negocios que ya operan con <span className="font-bold underline decoration-black/5 underline-offset-8">autoridad digital.</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-16 pt-10">
            <button 
              className="group relative inline-flex items-center bg-[#0B0B0B] text-white px-20 py-8 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.4em] transition-all duration-500 hover:bg-zinc-900 hover:px-24 active:scale-95 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)]"
              onClick={() => setView('onboarding')}
            >
              Empezar mi proyecto
              <ArrowRight className="ml-8 transition-transform group-hover:translate-x-3" size={20} />
            </button>

            <div className="flex flex-col items-center gap-6 pt-12 border-t border-black/5 w-full max-w-xl">
              <img src="https://i.imgur.com/0HX1GwZ.png" alt="Webworks" className="h-16 md:h-24 w-auto object-contain" />
              <div className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-black/50 flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <span className="whitespace-nowrap">Webworks corporation</span>
                <span className="hidden md:inline text-black/20">•</span>
                <span className="whitespace-nowrap">© 2026 WEBWORKS AGENCIA WEB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay">
         <div className="absolute h-full w-[1px] bg-black left-1/4"></div>
         <div className="absolute h-full w-[1px] bg-black left-2/4"></div>
         <div className="absolute h-full w-[1px] bg-black left-3/4"></div>
         <div className="absolute w-full h-[1px] bg-black top-1/2"></div>
      </div>
    </section>
  );
};

// --- ONBOARDING VIEW ---

const OnboardingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    referral: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, service, referral } = formData;
    
    // Validar que los campos no estén vacíos
    if (!name || !service || !referral) {
      alert("Por favor completa todos los campos para iniciar tu proyecto.");
      return;
    }

    const message = `*Nuevo Proyecto Webworks* 🚀\n\n` +
                    `*Nombre:* ${name}\n` +
                    `*Servicios detallados:* ${service}\n` +
                    `*Perfil/Referencias:* ${referral}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/50661197610?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative w-full min-h-screen bg-white pt-24 md:pt-32 pb-0 overflow-hidden">
      {/* Imagen de Fondo Solicitada */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://i.imgur.com/LMEevPg.jpeg" 
          alt="Background Pattern" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      <div className="relative z-10">
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-20 md:mb-24">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/2">
              <div className="mb-8 flex items-center gap-3">
                <div className="w-1 h-8 bg-[#0B0B0B]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B0B0B]/40">Metodología</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-[#0B0B0B] tracking-tight leading-[1.1] mb-8">
                ¿Cómo <br /> <span className="text-[#0B0B0B]/20">Trabajamos?</span>
              </h2>
            </div>
            <div className="md:w-1/2 flex flex-col justify-start md:pt-20">
              <p className="text-xl md:text-2xl font-medium text-[#0B0B0B] leading-snug tracking-tight mb-10 max-w-lg">
                En Webworks sabemos la confianza y seguridad que nuestros clientes necesitan, es por eso que tenemos un sistema de trabajo seguro para todos nuestros clientes.
              </p>
              <div className="h-[1.5px] w-24 bg-[#0B0B0B]"></div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32 md:mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                num: '01', 
                title: 'Envío de información', 
                desc: 'Tú nos envías información breve del negocio o servicio que ofreces.', 
                icon: <FileText size={20} strokeWidth={1.5} />, 
                color: 'bg-zinc-50/80 backdrop-blur-sm' 
              },
              { 
                num: '02', 
                title: 'Creación de estructura', 
                desc: 'Recibimos tu información y trabajamos en una estructura real para que puedas ver tu página web antes de comprarla.', 
                icon: <MousePointer2 size={20} strokeWidth={1.5} />, 
                color: 'bg-zinc-100/60 backdrop-blur-sm' 
              },
              { 
                num: '03', 
                title: 'Revisión y confirmación', 
                desc: 'Te enviamos la estructura para que la revises. Compruebas que todo sea correcto.', 
                icon: <FileCheck2 size={20} strokeWidth={1.5} />, 
                color: 'bg-zinc-50/80 backdrop-blur-sm' 
              },
              { 
                num: '04', 
                title: 'Pago y entrega', 
                desc: 'Una vez completada la revisión, realizas el depósito de los ₡40,000 de tu página web por Sinpe móvil o transferencia bancaria para proceder con la entrega de los archivos finales de tu página web.', 
                icon: <CreditCard size={20} strokeWidth={1.5} />, 
                color: 'bg-zinc-100/60 backdrop-blur-sm' 
              }
            ].map((item, idx) => (
              <div key={idx} className={`relative rounded-[32px] p-8 md:p-10 flex flex-col h-full transition-all duration-500 hover:shadow-lg ${item.color} border border-black/[0.02]`}>
                <div className="flex justify-between items-start mb-12 text-black/70">
                  <div>{item.icon}</div>
                  <span className="text-2xl font-bold opacity-10 tracking-tighter text-black">{item.num}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-base font-bold tracking-tight mb-4 uppercase leading-tight text-black">{item.title}</h3>
                  <p className="text-[15px] font-medium leading-relaxed text-black/50">{item.desc}</p>
                  {idx === 3 && (
                    <p className="text-[10px] font-black uppercase tracking-[0.1em] text-red-600 mt-5 leading-snug">
                      * El pago debe realizarse el mismo día de la entrega. De no abonarse, el proyecto quedará anulado.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 md:px-12 pb-20">
          <div className="bg-[#F5F5F7]/90 backdrop-blur-md rounded-[48px] p-8 md:p-20 overflow-hidden relative border border-black/[0.02]">
            <div className="max-w-3xl mx-auto relative z-10">
              <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#0B0B0B]">Configuración del Proyecto</h2>
                <p className="text-lg text-[#5F5F5F] font-medium max-w-lg mx-auto leading-relaxed">
                  Completa los detalles a continuación para iniciar la estructura de tu nuevo sitio web profesional.
                </p>
              </div>
              
              <form className="space-y-10" onSubmit={handleWhatsAppSubmit}>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/40 ml-4">Nombre del Negocio o Marca</label>
                    <p className="text-[10px] text-black/20 ml-4">Nombre comercial que se mostrará en el encabezado.</p>
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Consultoría Integral Smith" 
                    className="w-full bg-white border border-black/[0.05] rounded-2xl px-6 py-5 text-black font-semibold outline-none focus:ring-4 focus:ring-black/5 transition-all" 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/40 ml-4">¿Qué servicios ofreces específicamente?</label>
                    <p className="text-[10px] text-black/20 ml-4">Enumera detalladamente los servicios que deseas destacar.</p>
                  </div>
                  <textarea 
                    rows={4} 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder="Ej: Limpieza de cutis, Masajes relajantes, Tratamientos de hidratación, etc." 
                    className="w-full bg-white border border-black/[0.05] rounded-2xl px-6 py-5 text-black font-semibold outline-none focus:ring-4 focus:ring-black/5 transition-all resize-none" 
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/40 ml-4">Perfil de Facebook, Instagram o web antigua</label>
                    <p className="text-[10px] text-black/20 ml-4">Proporciona enlaces para conocer tu identidad visual y redes sociales actuales.</p>
                  </div>
                  <input 
                    type="text" 
                    name="referral"
                    value={formData.referral}
                    onChange={handleChange}
                    placeholder="Enlace de perfil de red social o web" 
                    className="w-full bg-white border border-black/[0.05] rounded-2xl px-6 py-5 text-black font-semibold outline-none focus:ring-4 focus:ring-black/5 transition-all" 
                  />
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-900 transition-all duration-300 flex items-center justify-center gap-4"
                  >
                    Enviar y empezar <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <footer className="pt-16 pb-12 border-t border-black/5 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center gap-6">
            <img src="https://i.imgur.com/0HX1GwZ.png" alt="Webworks" className="h-16 w-auto object-contain" />
            <div className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.5em] text-black/40 flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <span className="whitespace-nowrap">Webworks corporation</span>
              <span className="hidden md:inline text-black/20">•</span>
              <span className="whitespace-nowrap">© 2026 WEBWORKS AGENCIA WEB</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'onboarding'>('landing');

  return (
    <div className="relative w-full min-h-screen bg-white text-[#0B0B0B] selection:bg-[#0B0B0B] selection:text-white antialiased overflow-x-hidden">
      <main className="w-full">
        <Header setView={setView} currentView={view} />
        
        {view === 'landing' ? (
          <div className="animate-in fade-in duration-700">
            <Hero setView={setView} />
            <ElevateProfessional />
            <Sectors />
            <SectorShowcase />
            <QualificationSection />
            <PositiveActionSection />
            <SpacerSection />
            <PricingSection setView={setView} />
            <HostingBonusSection />
            <FinalCTASection setView={setView} />
          </div>
        ) : (
          <OnboardingPage />
        )}
      </main>
    </div>
  );
};

export default App;