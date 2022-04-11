import { SafeResourceUrl } from "@angular/platform-browser";

export interface Category {
	id: number;
	title: string;
	icon: string;
	defaultBackground: string;
	hasEvents: boolean;
}

export interface CategoryResponse {
    result: Category;
}

export interface CategoryToShow {
    id: number;
    title: string;
    icon: SafeResourceUrl;
    defaultBackground: SafeResourceUrl;
    hasEvents:boolean;
}

export interface CategoriesResponse {
    result: Category[];
}

export interface ICategory {
  [x: string]: any;
  id?: number;
  title: string;
  icon: string;
  defaultBackground: string;
  hasEvents:boolean;
}