// Form data
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'consumer' | 'provider';
    cep: string;
    state: string;
    city: string;
    number: string;
}

export interface LoginData {
    email: string;
    password: string;
}

// Services
export interface Service {
    id: number
    name: string
    provider: RegisterData
    description: string
    location: string
    date: string
    category: string
    images: string[]
    price: string;
}

// DTOs
export interface ServiceDTO {
    name: string;
    description: string;
    price: number;
    location?: string;
    category: string;
    images?: string[];
}

export interface CreateServiceDTO {
    name: string;
    description: string;
    price: string;
    category: string;
    images?: string[];
}

export interface UpdateServiceDTO extends CreateServiceDTO {
    id: string;
}

export interface CreateNoteDTO {
    content: string;
    date: string;
}