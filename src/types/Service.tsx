import { DivideIcon as LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription?: string[];
  icon: LucideIcon;
  image: string;
  features?: string[];
}