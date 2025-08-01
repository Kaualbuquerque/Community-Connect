"use client"

import styles from "./ServiceModal.module.scss"
import { useState, useEffect } from "react"
import Button from "../Button/Button"
import Input from "../Input/Input"
import { options } from "@/utils/options"

interface ServiceModalProps {
    isOpen: boolean
    onClose: () => void
    serviceData: {
        name: string
        description: string
        category: string
        images: string[] // URLs ou base64
    }
}

export default function ServiceModal({ isOpen, onClose, serviceData }: ServiceModalProps) {
    const [form, setForm] = useState(serviceData)
    const [images, setImages] = useState<File[]>([])

    // Atualiza o formulário se serviceData mudar (ex: abrindo outro serviço para edição)
    useEffect(() => {
        setForm(serviceData)
    }, [serviceData])

    if (!isOpen) return null

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const selected = [...images, ...files].slice(0, 5)
        setImages(selected)
    }

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
                    onChange={handleInputChange}
                />

                <Input
                    label="Descrição"
                    type="textarea"
                    name="description"
                    placeholder="Digite a descrição do serviço"
                    required={true}
                    value={form.description}
                    onChange={handleInputChange}
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
                    <label>Upload up to 5 images:</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                    <div className={styles.preview}>
                        {images.map((img, idx) => (
                            <img key={idx} src={URL.createObjectURL(img)} alt={`Preview ${idx}`} />
                        ))}
                    </div>
                </div>

                <div className={styles.buttons}>
                    <Button text="Confirm" type="primary" />
                    <Button text="Cancel" type="secondary" handleFunction={onClose} />
                </div>
            </div>
        </div>
    )
}
