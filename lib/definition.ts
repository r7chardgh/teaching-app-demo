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