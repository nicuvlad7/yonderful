export interface ConfirmDialogData{
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
};

export interface CategoryConfirmDialogData {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    editMode: boolean;
    categoryId: number;
}