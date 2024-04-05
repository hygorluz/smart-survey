import {Option} from "./Option";

export interface Survey {
    id: string;
    expiresAt: string;
    description: string;
    createdAt: string;
    title: string;
    updatedAt: string;
    options: Option[];
}
