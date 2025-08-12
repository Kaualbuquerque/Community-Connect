export interface ServiceBannerProps {
    role: "provider" | "consumer";
    service: Service;
    onEdit?: () => void;
    onDelete?: () => void;
}

export interface ServiceModalProps {
    isOpen: boolean;
    onClose: (refresh?: boolean) => void;
    serviceData?: Service;  // pode ser undefined para criação
    onSubmit: (data: ServicePayload) => Promise<void>; // função passada pelo pai
}

export interface ButtonProps {
    text: string,
    type: string,
    href?: string;
    handleFunction?: () => void;
    icon?: any;
    disabled?: boolean;
}

export interface ServicePayload {
    name: string;
    description: string;
    price: string;
    category: string;
    images: string[];
}


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

export interface ServiceDTO {
    name: string;
    description: string;
    price: number;
    location?: string;
    category: string;
    images?: string[]; // Aqui você vai lidar com URLs ou base64, dependendo da sua estratégia de upload
}

export interface Service {
    id: string
    name: string
    provider: RegisterData
    description: string
    location: string
    date: string
    category: string
    images: string[]
    price: string;
}


export interface CreateServiceDTO {
    name: string;
    description: string;
    price: string;
    category: string;
    images?: string[];
}

export interface UpdateServiceDTO extends CreateServiceDTO {
    id: string;  // ou number, conforme seu backend
}
