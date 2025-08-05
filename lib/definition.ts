import { ReactElement, ReactNode } from "react";

export interface IWrapper {
    children: ReactNode | ReactElement;
}

export interface IQuestion {
    createdAt: string;
    level: string;
    question: string;
    _id: string;
}

export interface IPagination {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    limit: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export interface IGame {
    questions: IQuestion[];
    pagination: IPagination;
}

export interface IAdminFormState {
    message: string;
    errors: { question?: string[]; level?: string[]; message?: string };
    success: boolean;
}