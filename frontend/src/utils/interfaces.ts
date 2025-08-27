import { ChangeEvent } from "react";

// =============================== Interface ===============================

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

export interface LoginFormState {
    email: string;
    password: string;
}

export interface RegisterFormState {
    userProfile: "consumer" | "provider";
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    cep: string;
    state: string;
    city: string;
    number: string;
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
    isFavorite?: boolean;
}

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
    onSubmit: (data: CreateServiceDTO) => Promise<void>; // função passada pelo pai
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


// Button
export interface ButtonProps {
    text: string,
    type: string,
    href?: string;
    handleFunction?: () => void;
    icon?: any;
    disabled?: boolean;
}

// Chat
export interface ChatProps {
    id: string | number,
    provider: string,
    text: string,
    date: string,
}

export interface MessageProps {
    text: string;
    type: "sender" | "recipient";
}

// Cards
export interface FeatureCardProps {
    iconLight: string;
    iconDark: string;
    text: string;
}

export interface HomeCardProps {
    image: string;
    title: string;
    description: string;
}

// Input
export type InputType = "text" | "number" | "password" | "email" | "radio" | "textarea" | "select";

export interface InputOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface InputProps {
    id?: string;
    type: InputType;
    label?: string;
    placeholder?: string;
    value?: string | number;
    name?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    checked?: boolean;
    options?: InputOption[];
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

// Notes
export interface Notes {
    id: string;
    content: string;
    date: string;
}


export interface NoteProps {
    content: string;
    date: string;
    onDelete?: () => void;
}

export interface NoteModalProps {
    onClose: (refresh?: boolean) => void;
}

// Filter
export interface FilterProps {
    onApplyFilter: (filters: { category?: string; minPrice?: number; maxPrice?: number }) => void;
}

export interface ServiceFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

// Conversations
export interface Conversation {
    id: number;
    messages: Messages[];
    participants: Participant[];
    createdAt: string;
    updatedAt: string;
}

export interface Participant {
    conversationId: number;
    userId: number;
    user: RegisterData;
    lastReadMessageId: number | null;
    isDeleted: boolean;
}

export interface Messages {
    id: number;
    conversationId: number;
    senderId: number;
    timestamp: string; // ISO string
    content: string;
    status: "sent" | "delivered" | "read"; // pode expandir se quiser
    isDeleted: boolean;
    editedAt: string | null;
}