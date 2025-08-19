"use client";

import { useState, useEffect } from "react";
import styles from "./ServiceModal.module.scss";

import Button from "../Button/Button";
import Input from "../Input/Input";
import { options } from "@/utils/options";
import { CreateServiceDTO, RegisterData, Service } from "@/utils/types";
import { ServiceModalProps } from "@/utils/props";

export default function ServiceModal({ isOpen, onClose, serviceData, onSubmit }: ServiceModalProps) {
    const emptyProvider: RegisterData = {
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "consumer",
        cep: "",
        state: "",
        city: "",
        number: "",
    };

    const [form, setForm] = useState<Service>({
        id: "",
        name: "",
        description: "",
        provider: emptyProvider,
        location: "",
        date: "",
        category: "",
        images: [],
        price: "",
        ...serviceData,
    });

    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setForm({
            id: "",
            name: "",
            description: "",
            provider: emptyProvider,
            location: "",
            date: "",
            category: "",
            images: [],
            price: "",
            ...serviceData,
        });
        setImages([]);
    }, [serviceData]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "price") {
            if (value.length > 8) return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [...prev, ...files].slice(0, 5));
    };

    const handleCreateService = async () => {
        if (!form.name.trim() || !form.description.trim() || !form.price || !form.category) return;

        try {
            setLoading(true);

            const imagesBase64 = await Promise.all(
                images.map((file) =>
                    new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    })
                )
            );

            const payload: CreateServiceDTO = {
                name: form.name,
                description: form.description,
                price: form.price.toString(),
                category: form.category,
                images: imagesBase64.length > 0 ? imagesBase64 : form.images || [],
            };

            await onSubmit(payload);
            alert(serviceData?.id ? "Serviço atualizado com sucesso!" : "Serviço criado com sucesso!");
            onClose(true);
        } catch (err) {
            console.error(err);
            alert(serviceData?.id ? "Erro ao atualizar serviço." : "Erro ao criar serviço.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
            <div className={styles.modal}>
                <h3 id="service-modal-title">{serviceData?.id ? "Editar Serviço" : "Criar Serviço"}</h3>

                <Input
                    label="Nome do serviço"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do serviço"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={handleInputChange}
                />

                <Input
                    label="Descrição"
                    type="textarea"
                    name="description"
                    placeholder="Digite a descrição do serviço"
                    required
                    maxLength={300}
                    value={form.description}
                    onChange={handleInputChange}
                />

                <Input
                    label="Preço"
                    type="number"
                    name="price"
                    placeholder="Digite o valor do serviço"
                    required
                    maxLength={10}
                    value={form.price}
                    onChange={handleInputChange}
                />

                <Input
                    label="Categoria"
                    type="select"
                    name="category"
                    placeholder="Selecione uma categoria"
                    required
                    value={form.category}
                    onChange={handleInputChange}
                    options={options}
                />

                <div className={styles.imageUpload}>
                    <label htmlFor="image-upload">Upload até 5 imagens:</label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                    />
                    <div className={styles.preview}>
                        {images.map((img, idx) => (
                            <img key={idx} src={URL.createObjectURL(img)} alt={`Preview ${idx + 1}`} />
                        ))}
                    </div>
                </div>

                <div className={styles.buttons}>
                    <Button
                        text={loading ? "Enviando..." : "Confirmar"}
                        type="primary"
                        handleFunction={handleCreateService}
                        disabled={loading}
                    />
                    <Button text="Cancelar" type="secondary" handleFunction={onClose} />
                </div>
            </div>
        </div>
    );
}
