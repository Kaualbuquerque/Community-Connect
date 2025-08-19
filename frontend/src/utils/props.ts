import { ChangeEvent } from "react";
import { CreateServiceDTO, Service } from "./types";


// Service
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
    value?: string;
    name?: string;
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    checked?: boolean;
    options?: InputOption[];
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

// Form
export interface LoginFormState {
    email: string;
    password: string;
}

export interface RegisterFormState {
    userProfile: "consumer" | "provider" | "";
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