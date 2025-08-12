"use client"

import styles from "./ServiceModal.module.scss"
import { useState, useEffect } from "react"
import Button from "../Button/Button"
import Input from "../Input/Input"
import { options } from "@/utils/options"
import { createService } from "@/services/service"
import { RegisterData, Service, ServiceModalProps, ServicePayload } from "@/utils/types"

export default function ServiceModal({ isOpen, onClose, serviceData, onSubmit }: ServiceModalProps) {

    const emptyProvider: RegisterData = {
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "consumer", // ou "provider", escolha um padrão
        cep: "",
        state: "",
        city: "",
        number: "",
    };

    // Inicializa o formulário com serviceData ou com valores padrão para criação
    const [form, setForm] = useState<Service>({
        id: "", // ou opcional, se não for obrigatório na inicialização
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

    // Atualiza o form sempre que serviceData mudar (ex: abrir modal para outro serviço)
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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const selected = [...images, ...files].slice(0, 5);
        setImages(selected);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // Converter imagens novas para base64
            const imagesBase64 = await Promise.all(
                images.map((file) => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                })
            );

            const payload: ServicePayload = {
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

    const isEditMode = Boolean(serviceData?.id);


    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3>Edit Service</h3>

                <Input
                    label="Nome do serviço"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do serviço"
                    required={true}
                    value={form.name}
                    max_length={100}
                    onChange={handleInputChange}
                />

                <Input
                    label="Descrição"
                    type="textarea"
                    name="description"
                    placeholder="Digite a descrição do serviço"
                    required={true}
                    value={form.description}
                    max_length={300}
                    onChange={handleInputChange}
                />

                <Input
                    label="Preço"
                    type="number"
                    name="price"
                    placeholder="Digite o valor do serviço"
                    required={true}
                    value={form.price}
                    onChange={(e) => {
                        const { value } = e.target
                        setForm((prev) => ({ ...prev, price: value }))
                    }}
                />

                <Input
                    label="Categoria"
                    type="select"
                    name="category"
                    placeholder="Selecione uma categoria"
                    value={form.category}
                    required={true}
                    onChange={handleInputChange}
                    options={options}
                />

                <div className={styles.imageUpload}>
                    <label>Upload até 5 imagens:</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                    <div className={styles.preview}>
                        {images.map((img, idx) => (
                            <img key={idx} src={URL.createObjectURL(img)} alt={`Preview ${idx}`} />
                        ))}
                    </div>
                </div>

                <div className={styles.buttons}>
                    <Button
                        text={loading ? "Enviando..." : "Confirmar"}
                        type="primary"
                        handleFunction={handleSubmit}
                        disabled={loading}
                    />
                    <Button text="Cancelar" type="secondary" handleFunction={onClose} />
                </div>
            </div>
        </div>

    )
}
