import {
  certifications,
  heroStats,
  journey,
  projects,
  stackBadges,
  technologies,
  timeline,
  videos
} from "@/data/site";

export type Locale = "en" | "es";

type NavItem = { label: string; href: string };
type SectionCopy = { eyebrow: string; title: string; copy: string };
type HeroCopy = {
  badge: string;
  title: [string, string, string];
  description: string;
  actions: { projects: string; resume: string; contact: string };
  scrollHint: string;
};
type ContactCopy = {
  title: string;
  fields: { name: string; email: string; phone: string };
  placeholders: { name: string; email: string; phone: string };
  messageLabel: string;
  messagePlaceholder: string;
  downloadCv: string;
  cvHref: string;
  send: string;
  remote: string;
  location: string;
  links: {
    linkedin: { label: string; href: string };
    github: { label: string; href: string };
    youtube: { label: string; href: string };
    instagram: { label: string; href: string };
  };
};

type SiteContent = {
  nav: NavItem[];
  hero: HeroCopy;
  sections: {
    about: SectionCopy;
    stack: SectionCopy;
    projects: SectionCopy;
    journey: SectionCopy;
    certifications: { eyebrow: string; title: string };
    youtube: { eyebrow: string; title: string };
  };
  heroStats: typeof heroStats;
  timeline: typeof timeline;
  technologies: typeof technologies;
  projects: typeof projects;
  journey: typeof journey;
  certifications: typeof certifications;
  videos: typeof videos;
  stackBadges: typeof stackBadges;
  contact: ContactCopy;
  footerText: string;
  languageToggle: { english: string; spanish: string };
};

const englishContent: SiteContent = {
  nav: [
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    badge: "Data, BI & Applied ML",
    title: ["Dariel Pena", "Systems Engineer", "Business Intelligence"],
    description:
      "Engineering systems, building BI dashboards, and advancing into data science through real projects, continuous practice and certifications.",
    actions: {
      projects: "Explore Projects",
      resume: "Download Resume",
      contact: "Contact Me"
    },
    scrollHint: "Scroll to enter the lab"
  },
  sections: {
    about: {
      eyebrow: "About",
      title: "A career path grounded in systems, BI and applied learning.",
      copy:
        "The story is not a senior-data-scientist pose. It is a practical progression from systems engineering into business intelligence and data science through real work."
    },
    stack: {
      eyebrow: "Technology Stack",
      title: "Tools I use to analyze, communicate and build.",
      copy:
        "The stack is organized by the way I actually work: BI first, then analysis, then applied machine learning and lightweight deployment."
    },
    projects: {
      eyebrow: "Featured Projects",
      title: "Real case studies instead of portfolio filler.",
      copy:
        "Each project reflects hands-on learning, clear documentation and practical results."
    },
    journey: {
      eyebrow: "Machine Learning Journey",
      title: "My learning path is visible, specific and honest.",
      copy:
        "A timeline of progression from data analysis fundamentals to business intelligence, then into data science and machine learning."
    },
    certifications: {
      eyebrow: "Certifications",
      title: "Verified learning and ongoing specialization."
    },
    youtube: {
      eyebrow: "YouTube",
      title: "Practical content, built from real learning."
    }
  },
  heroStats,
  timeline,
  technologies,
  projects,
  journey,
  certifications,
  videos,
  stackBadges,
  contact: {
    title: "Let’s talk about data, BI or a new project.",
    fields: { name: "Name", email: "Email", phone: "Phone" },
    placeholders: {
      name: "Your name",
      email: "you@company.com",
      phone: "+1 555 000 0000"
    },
    messageLabel: "Message",
    messagePlaceholder: "Tell me what you want to build, analyze or improve.",
    downloadCv: "Download CV",
    cvHref: "/CV-DARIEL A. PENA VASQUEZ-849-534-4300.pdf",
    send: "Send Message",
    remote: "Remote AI Lab",
    location: "La Paz / Global",
    links: {
      linkedin: {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/darielpe%C3%B1av%C3%A1squez/"
      },
      github: {
        label: "GitHub",
        href: "https://github.com/DARIELADOLFO"
      },
      youtube: {
        label: "YouTube",
        href: "https://www.youtube.com/@VisionMetricsDPV"
      },
      instagram: {
        label: "Instagram",
        href: "https://www.instagram.com/vision_metrics?igsh=Z2w0MXg1N2VnNm5w"
      }
    }
  },
  footerText: "Dariel Pena. Focused on BI, Python and a real data science learning path.",
  languageToggle: { english: "EN", spanish: "ES" }
};

const spanishContent: SiteContent = {
  nav: [
    { label: "Sobre mí", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Proyectos", href: "#projects" },
    { label: "Trayectoria", href: "#journey" },
    { label: "Contacto", href: "#contact" }
  ],
  hero: {
    badge: "Datos, BI y ML aplicado",
    title: ["Dariel Pena", "Ingeniero en Sistemas", "Business Intelligence"],
    description:
      "Ingeniero en Sistemas con experiencia en Business Intelligence, Power BI y Python, especializándome en Ciencia de Datos mediante proyectos reales, práctica continua y certificaciones.",
    actions: {
      projects: "Explorar Proyectos",
      resume: "Descargar CV",
      contact: "Contactarme"
    },
    scrollHint: "Desliza para entrar al laboratorio"
  },
  sections: {
    about: {
      eyebrow: "Sobre mí",
      title: "Una trayectoria basada en sistemas, BI y aprendizaje aplicado.",
      copy:
        "No busco aparentar un rol senior. La historia aquí es la de un perfil técnico que viene de sistemas y está creciendo de forma práctica en datos."
    },
    stack: {
      eyebrow: "Stack Tecnológico",
      title: "Las herramientas con las que analizo, comunico y construyo.",
      copy:
        "El stack está organizado según cómo trabajo realmente: primero BI, luego análisis, después machine learning aplicado y despliegues ligeros."
    },
    projects: {
      eyebrow: "Proyectos Destacados",
      title: "Casos reales en lugar de relleno de portafolio.",
      copy:
        "Cada proyecto refleja aprendizaje práctico, documentación clara y resultados aplicables."
    },
    journey: {
      eyebrow: "Ruta Machine Learning",
      title: "Mi camino de aprendizaje es visible, específico y honesto.",
      copy:
        "Una línea temporal de evolución desde fundamentos de análisis de datos hasta Business Intelligence, y luego hacia ciencia de datos y machine learning."
    },
    certifications: {
      eyebrow: "Certificaciones",
      title: "Aprendizaje verificado y especialización continua."
    },
    youtube: {
      eyebrow: "YouTube",
      title: "Contenido práctico, construido desde el aprendizaje real."
    }
  },
  heroStats: [
    { value: 3, suffix: "+", label: "Years of experience" },
    { value: 10, suffix: "+", label: "Projects" },
    { value: 1, suffix: "M+", label: "Rows analyzed" },
    { value: 95, suffix: "%", label: "Model accuracy" },
    { value: 6, suffix: "+", label: "Technologies" },
    { value: 100, suffix: "%", label: "Passion for data" }
  ],
  timeline,
  technologies,
  projects,
  journey,
  certifications,
  videos,
  stackBadges,
  contact: {
    title: "Hablemos de datos, BI o un nuevo proyecto.",
    fields: { name: "Nombre", email: "Correo", phone: "Teléfono" },
    placeholders: {
      name: "Tu nombre",
      email: "tu@empresa.com",
      phone: "+591 000 00000"
    },
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntame qué quieres construir, analizar o mejorar.",
    downloadCv: "Descargar CV",
    cvHref: "/CV-DARIEL A. PENA VASQUEZ-849-534-4300.pdf",
    send: "Enviar mensaje",
    remote: "Laboratorio remoto de IA",
    location: "La Paz / Global",
    links: {
      linkedin: {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/darielpe%C3%B1av%C3%A1squez/"
      },
      github: {
        label: "GitHub",
        href: "https://github.com/DARIELADOLFO"
      },
      youtube: {
        label: "YouTube",
        href: "https://www.youtube.com/@VisionMetricsDPV"
      },
      instagram: {
        label: "Instagram",
        href: "https://www.instagram.com/vision_metrics?igsh=Z2w0MXg1N2VnNm5w"
      }
    }
  },
  footerText: "Dariel Pena. Enfocado en BI, Python y un camino real hacia la ciencia de datos.",
  languageToggle: { english: "EN", spanish: "ES" }
};

export function getSiteContent(locale: Locale): SiteContent {
  return locale === "es" ? spanishContent : englishContent;
}

export type { SiteContent };
