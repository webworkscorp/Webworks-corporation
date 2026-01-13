import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight,
  ShieldCheck,
  ArrowUp,
  Zap,
  Target,
  MessageSquare,
  Rocket,
  CheckCircle2,
  Globe,
  Lock,
  ZapIcon,
  Server
} from 'lucide-react';
import { CONTENT } from './constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <>
      <header className="relative w-full h-16 md:h-24 border-b border-[#EAEAEA] bg-white transition-all duration-300">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video 
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
          <div className="flex items-center">
            <img 
              src={CONTENT.brand.logoUrl} 
              alt={CONTENT.brand.name} 
              className="h-24 md:h-40 w-auto object-contain brightness-0 transition-transform hover:scale-105 duration-300 -ml-4 md:-ml-12 z-10"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] -ml-6 md:-ml-10 mt-0.5 md:mt-1 opacity-90 whitespace-nowrap transition-colors duration-500 ${isOpen ? 'text-white' : 'text-[#0B0B0B]'}`}>
              {CONTENT.brand.name}
            </span>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 items-end group cursor-pointer p-2 outline-none focus:outline-none z-50" 
            aria-label="Menú"
          >
            <div className={`h-[2px] transition-all duration-300 ease-out ${isOpen ? 'w-8 rotate-45 translate-y-2 bg-white' : 'w-6 group-hover:w-12 bg-[#0B0B0B]'}`}></div>
            <div className={`h-[2px] transition-all duration-300 ease-out ${isOpen ? 'w-8 -rotate-45 bg-white' : 'w-10 bg-[#0B0B0B]'}`}></div>
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#0B0B0B] z-[60] transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) flex flex-col justify-center items-center ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <nav className="flex flex-col gap-8 md:gap-12 text-center">
          <button onClick={() => scrollToSection('hero')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">
            Inicio
          </button>
          <button onClick={() => scrollToSection('filosofia')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">
            Filosofía
          </button>
          <button onClick={() => scrollToSection('sectores')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">
            Sectores
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-4xl md:text-6xl font-bold text-white tracking-tighter hover:text-gray-400 transition-colors">
            Contacto
          </button>
        </nav>
        
        <div className="absolute bottom-12 text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">
          Menú de Navegación
        </div>
      </div>
    </>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative w-full min-h-[75vh] flex items-center bg-white overflow-visible">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://i.imgur.com/uTJ43Ey.jpeg" 
          alt="Architectural Background" 
          className="w-full h-full object-cover opacity-60 md:opacity-80"
        />
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
            className="inline-flex items-center gap-4 bg-[#0B0B0B] text-white px-8 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#222] transition-colors shadow-lg shadow-black/5"
            onClick={() => {
               const el = document.getElementById('pricing-section');
               el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Iniciar Proyecto
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="absolute right-0 bottom-0 z-40 w-[220px] md:w-[380px] pointer-events-none translate-x-[32%] md:translate-x-[22%] translate-y-[42%] md:translate-y-[32%] -rotate-[15deg] transform-gpu">
        <div className="relative">
          <div className="absolute bottom-[-5%] left-[10%] w-[80%] h-[10%] bg-black/10 blur-2xl rounded-[100%]"></div>
          <img 
            src="https://i.imgur.com/uyI8IGJ.png" 
            alt="Robot Webworks" 
            className="relative z-10 w-full h-auto object-contain" 
          />
        </div>
      </div>
    </section>
  );
};

const ElevateProfessional: React.FC = () => {
  return (
    <section id="filosofia" className="relative w-full py-24 md:py-32 border-t border-[#EAEAEA] z-20 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="https://i.imgur.com/Ec2SU7O.jpeg" 
          alt="Premium Architecture" 
          className="w-full h-full object-cover opacity-100 grayscale-0 scale-100 translate-y-32"
          style={{ objectPosition: 'center bottom' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-[#0B0B0B]"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]/40">Nivel Superior</span>
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
            <div className="absolute -inset-10 bg-black/5 blur-[100px] rounded-full translate-y-20 opacity-30 pointer-events-none"></div>
            <div className="relative border border-[#EAEAEA] bg-white rounded shadow-[0_40px_90px_-20px_rgba(0,0,0,0.18)] [transform:rotateY(-28deg)rotateX(6deg)rotateZ(1deg)] overflow-hidden">
              <div className="h-4 md:h-7 bg-[#FBFBFB] border-b border-[#EAEAEA] flex items-center px-4 gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5]"></div>
              </div>
              <img 
                src="https://i.imgur.com/huMLysM.jpeg" 
                alt="Arquitectura Profesional 3D" 
                className="w-full h-auto block"
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur border border-[#EAEAEA] px-4 py-2 rounded-sm shadow-sm">
                <span className="text-[9px] font-black text-[#0B0B0B] uppercase tracking-[0.2em]">Build 2025.01</span>
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
        <img 
          src="https://i.imgur.com/PiSyZrK.jpeg" 
          alt="Modern Architectural Interior" 
          className="w-full h-full object-cover opacity-40 grayscale-[0.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-32 items-start">
          <div className="md:w-1/2">
            <div className="mb-8 flex items-center gap-4">
              <div className="w-1 h-8 bg-[#0B0B0B]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]/60">Sectores Globales</span>
            </div>
            <h2 className="text-5xl md:text-[80px] font-bold text-[#0B0B0B] tracking-tighter leading-[0.9] mb-4">
              Diseñado para <br />
              distintos <span className="text-[#0B0B0B]/20">sectores.</span>
            </h2>
          </div>
          <div className="md:w-1/2 flex flex-col justify-start md:pt-24">
            <p className="text-2xl md:text-4xl font-bold text-[#0B0B0B] leading-[1.1] tracking-tighter mb-10">
              Nuestra estructura se adapta a distintos modelos de negocio manteniendo claridad, orden y una presencia profesional consistente.
            </p>
            <p className="text-lg md:text-xl text-[#5F5F5F] leading-relaxed font-medium max-w-lg">
              Cada sitio se construye con el mismo criterio técnico, independientemente del sector, garantizando una arquitectura robusta y eficiente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShowcaseCard: React.FC<{ imageUrl: string }> = ({ imageUrl }) => (
  <div className="flex-none w-[140px] md:w-[220px] px-1.5 md:px-3">
    <div className="relative">
      <div className="[perspective:1500px]">
        <div className="relative shadow-[0_8px_25px_-6px_rgba(0,0,0,0.08)]">
          <div className="relative border border-[#EAEAEA] bg-white rounded-sm overflow-hidden [transform:rotateY(-18deg)rotateX(3deg)] origin-center">
            <div className="h-2 md:h-3 bg-[#F9F9F9] border-b border-[#EAEAEA] flex items-center px-1 md:px-1.5 gap-0.5">
              <div className="w-0.5 h-0.5 rounded-full bg-[#EAEAEA]"></div>
              <div className="w-0.5 h-0.5 rounded-full bg-[#EAEAEA]"></div>
              <div className="w-0.5 h-0.5 rounded-full bg-[#EAEAEA]"></div>
            </div>
            <img 
              src={imageUrl} 
              alt="Arquitectura Web" 
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SectorShowcase: React.FC = () => {
  const images = [
    "https://i.imgur.com/nWTHPJs.jpeg",
    "https://i.imgur.com/fPJJxLS.jpeg",
    "https://i.imgur.com/hwBemT1.jpeg",
    "https://i.imgur.com/e5HzjfR.jpeg",
    "https://i.imgur.com/6hHl9VE.jpeg",
    "https://i.imgur.com/OoAd8l3.jpeg",
    "https://i.imgur.com/87SNhCb.jpeg"
  ];

  return (
    <section className="w-full py-10 md:py-24 border-t border-[#EAEAEA] bg-white overflow-hidden">
      <style>{`
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          animation: marquee-infinite 20s linear infinite;
        }
      `}</style>
      
      <div className="relative flex whitespace-nowrap overflow-hidden pointer-events-none">
        <div className="flex animate-marquee-infinite">
          {[...images, ...images, ...images].map((img, idx) => (
            <ShowcaseCard key={`item-${idx}`} imageUrl={img} />
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
        <img 
          src="https://i.imgur.com/5R3snoy.jpeg" 
          alt="Architectural Luxury Background" 
          className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-7xl font-bold text-[#0B0B0B] tracking-tighter leading-[0.95]">
              ¿Aún no tienes <br />
              <span className="text-[#0B0B0B]/30">claridad</span> sobre <br />
              tu negocio?
            </h2>
            <div className="relative inline-block mt-4">
               <div className="relative w-[180px] md:w-[240px] opacity-90 rotate-[-4deg]">
                 <img 
                   src="https://i.imgur.com/970wptI.png" 
                   alt="Negocio Dormido" 
                   className="w-full h-auto object-contain"
                 />
               </div>
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <div className="space-y-10 max-w-xl">
              <div className="space-y-4">
                <p className="text-4xl md:text-6xl font-bold text-[#0B0B0B] tracking-tighter leading-[1]">
                  Este servicio <br />
                  <span className="text-[#E02424]">no es para ti.</span>
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
    <section id="final-section" className="relative w-full py-24 md:py-64 bg-white overflow-visible">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://i.imgur.com/LIwqSRa.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          opacity: 0.8
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/20 to-white/95"></div>
      </div>

      {/* Robot in spaceship at the transition - Adjusted position to be lower */}
      <div className="absolute top-0 right-0 z-40 w-[240px] md:w-[480px] pointer-events-none -translate-y-[55%] -translate-x-[5%] md:-translate-x-[8%] hover:scale-110 transition-transform duration-700">
        <img 
          src="https://i.imgur.com/VbadOB9.png" 
          alt="Robot in Spaceship" 
          className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0B] tracking-tighter leading-tight mb-8">
            ¡Pero a ti que sabes tu potencial, <br />
            <span className="text-[#16a34a]">esto es para ti!</span>
          </h2>

          <p className="text-xl md:text-2xl font-medium text-[#0B0B0B] leading-relaxed max-w-3xl">
            Si entiendes que la mediocridad digital es el enemigo invisible de tu rentabilidad, has llegado al lugar correcto. Construimos plataformas de alto rendimiento para quienes exigen excelencia.
          </p>
        </div>
      </div>
    </section>
  );
};

const SpacerSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Forzamos la reproducción inmediata y constante
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay preventivo detectado:", err);
      });
    }
  }, []);

  return (
    <section className="w-full bg-white py-0 overflow-hidden relative">
      <div className="w-full flex justify-center">
        <div className="relative w-full overflow-hidden leading-[0]">
           <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            className="w-full h-auto block scale-110 md:scale-115 origin-center pointer-events-none"
            style={{ filter: 'contrast(1.02)' }}
          >
            <source 
              src="https://mqajxigehitkgdtepqzi.supabase.co/storage/v1/object/public/Video%20surf/Caminando_hacia_el_202601122244_xl212.mp4" 
              type="video/mp4" 
            />
          </video>
        </div>
      </div>
    </section>
  );
};

const PricingSection: React.FC = () => {
  return (
    <section id="pricing-section" className="relative w-full pt-32 pb-48 md:pt-64 md:pb-80 bg-white overflow-hidden border-b border-[#EAEAEA]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://i.imgur.com/s6JeFdz.jpeg" 
          alt="Technical Network Pattern" 
          className="w-full h-full object-cover brightness-105 contrast-[1.05]"
          style={{ objectPosition: 'right top' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#0B0B0B]/20"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0B0B0B]/40">Propuesta de Valor</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0B0B0B] tracking-tighter leading-[1.1]">
                <span className="text-[#0B0B0B]/30 font-medium block mb-2 md:mb-4">
                  Webs que normalmente cuestan cientos de miles de colones.
                </span>
                Webworks las pone a tu <br className="hidden md:block" />
                alcance por tan solo:
              </h2>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-black/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative bg-white/95 backdrop-blur-md border border-[#EAEAEA] p-10 md:p-14 rounded shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]/30 mb-6">Inversión Única</div>
              <div className="text-6xl md:text-8xl font-black text-[#0B0B0B] tracking-tighter mb-10">
                ₡40,000
              </div>
              
              <ul className="space-y-8 mb-12 text-left max-w-[360px] mx-auto border-t border-b border-[#F5F5F5] py-10">
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={18} className="text-[#0B0B0B] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[14px] font-bold text-[#0B0B0B] leading-tight tracking-tight uppercase">Imagen de Autoridad</p>
                    <p className="text-[12px] font-medium text-[#5F5F5F] mt-1.5 leading-relaxed">Atrae mejores clientes.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={18} className="text-[#0B0B0B] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[14px] font-bold text-[#0B0B0B] leading-tight tracking-tight uppercase">Hosting GRATIS</p>
                    <p className="text-[12px] font-medium text-[#5F5F5F] mt-1.5 leading-relaxed">Sin pagos mensuales.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 size={18} className="text-[#0B0B0B] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-[14px] font-bold text-[#0B0B0B] leading-tight tracking-tight uppercase">Venta en Automático</p>
                    <p className="text-[12px] font-medium text-[#5F5F5F] mt-1.5 leading-relaxed">Tu negocio abierto 24/7.</p>
                  </div>
                </li>
              </ul>
              
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#0B0B0B]/60 mb-12">
                El éxito de tu servicio empieza con tu imagen
              </p>

              <button 
                className="w-full bg-[#0B0B0B] text-white py-5 rounded font-bold uppercase tracking-[0.25em] text-[10px] hover:bg-zinc-800 transition-all shadow-2xl shadow-black/10 flex items-center justify-center gap-3 group/btn"
              >
                Activar Proyecto
                <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HostingBonusSection: React.FC = () => {
  return (
    <section className="relative w-full py-24 md:py-48 bg-white overflow-hidden border-b border-[#EAEAEA]">
      {/* Cuadrícula Técnica de Fondo */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <span className="h-[2px] w-12 bg-[#0B0B0B]"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#0B0B0B]">Infraestructura</span>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-black text-[#0B0B0B] tracking-tighter leading-[0.9] mb-12">
              ¡Eso no <br /> es todo!
            </h2>
            
            <p className="text-2xl md:text-4xl font-light text-[#0B0B0B] leading-tight tracking-tight max-w-xl mb-16">
              Te ayudamos a publicar tu sitio en un hosting <span className="font-bold border-b-2 border-black/10">100% GRATIS</span>, con dominio personalizado incluido.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#0B0B0B]/40">Status: Active</span>
                </div>
                <div className="flex items-center gap-4">
                  <Server size={20} strokeWidth={1.5} className="text-[#0B0B0B]/80" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B0B0B]">Infraestructura Global</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#0B0B0B]/40">Status: Secured</span>
                </div>
                <div className="flex items-center gap-4">
                  <Lock size={20} strokeWidth={1.5} className="text-[#0B0B0B]/80" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B0B0B]">Seguridad SSL</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#0B0B0B]/40">Status: Fast</span>
                </div>
                <div className="flex items-center gap-4">
                  <ZapIcon size={20} strokeWidth={1.5} className="text-[#0B0B0B]/80" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B0B0B]">Carga Óptima</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-[#0B0B0B]/40">Status: Live</span>
                </div>
                <div className="flex items-center gap-4">
                  <Globe size={20} strokeWidth={1.5} className="text-[#0B0B0B]/80" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B0B0B]">Disponibilidad 24/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative [perspective:2000px]">
            {/* Visual de Navegador Flotante */}
            <div className="relative bg-white border border-[#EAEAEA] rounded-xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden [transform:rotateY(-20deg)rotateX(10deg)] hover:[transform:rotateY(-10deg)rotateX(5deg)] transition-transform duration-700 ease-out">
              <div className="h-10 bg-[#FBFBFB] border-b border-[#EAEAEA] flex items-center px-4 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EAEAEA]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EAEAEA]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EAEAEA]"></div>
                </div>
                <div className="bg-white border border-[#EAEAEA] rounded-md px-4 py-1 flex items-center gap-2 w-1/2 justify-center">
                  <Lock size={10} className="text-[#16a34a]" />
                  <span className="text-[9px] font-medium text-[#5F5F5F] tracking-tight">tu-negocio.com</span>
                </div>
                <div className="w-12"></div>
              </div>
              <div className="p-8 md:p-12 bg-white">
                <div className="aspect-video w-full bg-[#FBFBFB] rounded-lg border border-[#F0F0F0] overflow-hidden relative">
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Globe size={48} strokeWidth={0.5} className="text-[#0B0B0B]/5 animate-spin-slow" style={{ animationDuration: '20s' }} />
                   </div>
                   <div className="p-6 space-y-4">
                      <div className="h-4 w-1/3 bg-black/5 rounded"></div>
                      <div className="h-8 w-2/3 bg-black/5 rounded"></div>
                      <div className="h-4 w-full bg-black/5 rounded"></div>
                      <div className="h-4 w-full bg-black/5 rounded"></div>
                   </div>
                </div>
              </div>
            </div>
            
            {/* Elementos Decorativos Flotantes */}
            <div className="absolute -top-12 -right-6 bg-white border border-[#EAEAEA] p-4 rounded-lg shadow-xl z-20 animate-bounce-slow">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-black rounded-full">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">Hosting Gratis</span>
               </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-white text-[#0B0B0B] selection:bg-[#0B0B0B] selection:text-white antialiased overflow-x-hidden">
      <main className="w-full">
        <Header />
        <Hero />
        <ElevateProfessional />
        <Sectors />
        <SectorShowcase />
        <QualificationSection />
        <PositiveActionSection />
        <SpacerSection />
        <PricingSection />
        <HostingBonusSection />
      </main>
    </div>
  );
};

export default App;