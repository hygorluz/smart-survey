
export interface Survey {
    id?: string;
    expiresAt: Date;
    description: string;
    createdAt?: string;
    title: string;
    updatedAt?: string;
    options: Option[];
}

export interface Option {
    id?: string;
    title: string;
    votes?: number;
}
