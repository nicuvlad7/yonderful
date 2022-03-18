import { SafeResourceUrl } from "@angular/platform-browser";

export interface Category {
    title: string;
    icon: string;
    defaultBackground: string;
}

export interface CategoryToShow {
    title: string;
    icon: SafeResourceUrl;
    defaultBackground: SafeResourceUrl;
}

export interface CategoriesResponse {
    result: Category[];
}