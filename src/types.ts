export interface Product {
  id: string;
  model: string;
  category: 'sofa' | 'bed' | 'dining' | 'lounge';
  images: string[];
  dimensions: string;
  material: { [key: string]: string };
  price: number;
  featured?: boolean;
  newArrival?: boolean;
  info: { [key: string]: string };
}

export interface Showroom {
  id: string;
  title: { [key: string]: string };
  address: { [key: string]: string };
  phone: string;
  workingHours: { [key: string]: string };
  mapEmbedUrl: string;
  yandexMapUrl: string;
  image: string;
}

export interface Vacancy {
  id: string;
  title: { [key: string]: string };
  department: { [key: string]: string };
  salary: { [key: string]: string };
  experience: { [key: string]: string };
  requirements: { [key: string]: string[] };
  responsibilities: { [key: string]: string[] };
}

export interface VideoItem {
  id: string;
  title: { [key: string]: string };
  youtubeId: string;
  duration: string;
  thumbnail: string;
}

export type Language = 'uz' | 'kz' | 'ru' | 'en' | 'zh';

export type NavTab = 'home' | 'about' | 'showrooms' | 'furniture' | 'videos' | 'vacancy' | 'contact';
