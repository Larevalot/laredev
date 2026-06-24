export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const ui: Record<Lang, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.tech': 'Tech Stack',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.greeting': 'Hello, I\'m',
    'hero.name': 'Lare Dev',
    'hero.title': 'Full Stack Developer',
    'hero.subtitle': 'Crafting digital experiences with the precision of ancient artisans',
    'hero.cta': 'Explore My Work',
    'hero.cta2': 'Contact Me',
    'about.title': 'About Me',
    'about.p1': 'Passionate full-stack developer orbiting the intersection of design and technology. I build scalable, elegant web applications that push the boundaries of what\'s possible on the web.',
    'about.p2': 'With deep expertise spanning frontend frameworks, backend architectures, and database systems, I transform complex ideas into seamless digital experiences that feel like they\'re from another dimension.',
    'about.years': 'Years Experience',
    'about.projects': 'Projects Completed',
    'about.tech': 'Technologies',
    'tech.title': 'Tech Stack',
    'tech.subtitle': 'Technologies in my orbital arsenal',
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'Explorations from the digital frontier',
    'projects.view': 'View Project',
    'projects.code': 'Source Code',
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s build something from another dimension',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Launch Message',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Built with',
    'footer.and': 'and',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre Mí',
    'nav.tech': 'Tecnologías',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'hero.greeting': 'Hola, soy',
    'hero.name': 'Lare Dev',
    'hero.title': 'Desarrollador Full Stack',
    'hero.subtitle': 'Creando experiencias digitales con la precisión de artesanos antiguos',
    'hero.cta': 'Explorar Mi Trabajo',
    'hero.cta2': 'Contáctame',
    'about.title': 'Sobre Mí',
    'about.p1': 'Desarrollador full-stack apasionado que orbita en la intersección del diseño y la tecnología. Construyo aplicaciones web escalables y elegantes que empujan los límites de lo posible en la web.',
    'about.p2': 'Con profunda experiencia en frameworks de frontend, arquitecturas backend y sistemas de bases de datos, transformo ideas complejas en experiencias digitales fluidas que parecen venir de otra dimensión.',
    'about.years': 'Años de Experiencia',
    'about.projects': 'Proyectos Completados',
    'about.tech': 'Tecnologías',
    'tech.title': 'Stack Tecnológico',
    'tech.subtitle': 'Tecnologías en mi arsenal orbital',
    'projects.title': 'Proyectos Destacados',
    'projects.subtitle': 'Exploraciones de la frontera digital',
    'projects.view': 'Ver Proyecto',
    'projects.code': 'Código Fuente',
    'contact.title': 'Contáctame',
    'contact.subtitle': 'Construyamos algo desde otra dimensión',
    'contact.name': 'Tu Nombre',
    'contact.email': 'Tu Email',
    'contact.message': 'Tu Mensaje',
    'contact.send': 'Enviar Mensaje',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.built': 'Hecho con',
    'footer.and': 'y',
  },
};

export function getLangFromUrl(url: URL): Lang {
  const path = url.pathname;
  if (path.startsWith('/es')) return 'es';
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}
