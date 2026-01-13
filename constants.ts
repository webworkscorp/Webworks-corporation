import { LandingData } from './types';

export const CONTENT: LandingData = {
  "brand": {
    "name": "Webworks",
    "style": "professional-tech",
    "logoUrl": "https://i.imgur.com/XXtZal2.png"
  },
  "designSystem": {
    "colors": {
      "background": "#FFFFFF",
      "textPrimary": "#0B0B0B",
      "textSecondary": "#5F5F5F",
      "border": "#EAEAEA"
    },
    "typography": {
      "font": "Inter",
      "weights": [400, 500, 600]
    },
    "icons": {
      "style": "outline",
      "size": "18px",
      "color": "#0B0B0B",
      "usage": "supportive-only"
    }
  },
  "header": {
    "logo": "left",
    "cta": {
      "text": "Empezar ahora",
      "style": "pill-black"
    }
  },
  "hero": {
    "headline": "¡Tu página Web Profesional en menos de 24h!",
    "subheadline": "Especialistas en crear páginas web profesionales de forma rápida, clara y estructurada.",
    "meta": ""
  },
  "principles": {
    "items": [
      {
        "icon": "grid",
        "title": "Diseño estructurado",
        "description": "Interfaces construidas con espaciado y alineación matemática."
      },
      {
        "icon": "bolt",
        "title": "Entrega inmediata",
        "description": "Tu sitio web listo y funcionando en menos de 24 horas."
      },
      {
        "icon": "layers",
        "title": "Sistemas limpios",
        "description": "Sin ruido visual. Solo lo esencial para convertir."
      }
    ],
    "layout": "text-first",
    "iconPosition": "inline-left"
  },
  "offer": {
    "title": "Lo que obtienes",
    "items": [
      "Estructura web personalizada",
      "Sistema visual profesional",
      "Diseño adaptable (móvil)",
      "Hosting incluido"
    ]
  },
  "contact": {
    "title": "Inicia tu proyecto",
    "fields": [
      { "name": "business", "type": "text" },
      { "name": "goal", "type": "textarea" },
      { "name": "whatsapp", "type": "tel" }
    ],
    "submit": {
      "text": "Continuar",
      "style": "minimal-button"
    }
  },
  "footer": {
    "text": "© Webworks"
  }
};