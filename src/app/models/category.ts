import { SafeResourceUrl } from "@angular/platform-browser";

export interface Category {
    id: number;
    title: string;
    icon: string;
    defaultBackground: string;
}

export interface CategoryToShow {
    id: number;
    title: string;
    icon: SafeResourceUrl;
    defaultBackground: SafeResourceUrl;
}

export interface CategoriesResponse {
    result: Category[];
}
export interface ICategory {
    id?:number,
    title: string,
    icon: string,
    backgroundImg: string
}