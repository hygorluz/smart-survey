import { Option } from './Option';

export interface Survey {
    id: string;
    expiresAt: Date;
    description: string;
    createdAt?: string;
    title: string;
    updatedAt?: string;
    options: Option[];
}
