
// This represents the initial services data
// In a real app, this would be fetched from a backend database

export interface Service {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export const initialServices: Service[] = [
  {
    id: "varetamento",
    title: "Varetamento",
    description: "Abrir o radiador e desentupir os tubos.",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500&h=300",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=500&h=300"
    ],
  },
  {
    id: "limpeza-tecnica",
    title: "Limpeza técnica de arrefecimento",
    description: "Serviço feito com produtos específicos para a limpeza, substituição de água e líquidos de arrefecimento com equipamento específico.",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=500&h=300",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500&h=300"
    ],
  },
  {
    id: "solda-aluminio",
    title: "Solda em alumínio",
    description: "Confecção de caixas em alumínio e solda em geral nos radiadores de alumínio.",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500&h=300",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500&h=300"
    ],
  },
  {
    id: "limpeza-quimica",
    title: "Limpeza Química",
    description: "Limpeza com produto específico para a remoção de resíduos e impurezas no radiador.",
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d2c6f44d?auto=format&fit=crop&q=80&w=500&h=300",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=500&h=300"
    ],
  },
  {
    id: "solda-radiador",
    title: "Solda em radiador de metal e alumínio",
    description: "Reparo em vazamento, substituição de caixas.",
    images: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=500&h=300",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=500&h=300"
    ],
  },
];

export const heroImages = [
  "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&q=80&w=1200&h=500",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200&h=500",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=500"
];

// Local storage key for services
export const SERVICES_STORAGE_KEY = 'alberson_radiadores_services';
export const HERO_IMAGES_STORAGE_KEY = 'alberson_radiadores_hero_images';

// Load services from storage or use initial data
export const loadServices = (): Service[] => {
  try {
    const storedServices = localStorage.getItem(SERVICES_STORAGE_KEY);
    return storedServices ? JSON.parse(storedServices) : initialServices;
  } catch (error) {
    console.error('Failed to load services:', error);
    return initialServices;
  }
};

// Load hero images from storage or use initial data
export const loadHeroImages = (): string[] => {
  try {
    const storedImages = localStorage.getItem(HERO_IMAGES_STORAGE_KEY);
    return storedImages ? JSON.parse(storedImages) : heroImages;
  } catch (error) {
    console.error('Failed to load hero images:', error);
    return heroImages;
  }
};

// Save services to storage
export const saveServices = (services: Service[]): void => {
  try {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  } catch (error) {
    console.error('Failed to save services:', error);
  }
};

// Save hero images to storage
export const saveHeroImages = (images: string[]): void => {
  try {
    localStorage.setItem(HERO_IMAGES_STORAGE_KEY, JSON.stringify(images));
  } catch (error) {
    console.error('Failed to save hero images:', error);
  }
};
