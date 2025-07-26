"use client"

import styles from "./ServiceModal.module.scss"
import { useState, useEffect } from "react"
import Button from "../Button/Button"
import Input from "../Input/Input"

interface ServiceModalProps {
    isOpen: boolean
    onClose: () => void
    serviceData: {
        name: string
        description: string
        location: string
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

    const options = [
        { value: "repairs", label: "Repairs and Maintenance" },
        { value: "cleaning", label: "Cleaning Services" },
        { value: "it", label: "IT and Tech Support" },
        { value: "tutoring", label: "Tutoring and Education" },
        { value: "beauty", label: "Beauty and Aesthetics" },
        { value: "events", label: "Events and Parties" },
        { value: "delivery", label: "Deliveries and Moving" },
        { value: "construction", label: "Construction and Renovation" },
        { value: "consulting", label: "Professional Consulting" },
        { value: "other", label: "Other" },
    ]

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal}>
                <h3>Edit Service</h3>

                <Input
                    label="Service Name"
                    type="text"
                    name="name"
                    placeholder="Enter service name"
                    required={true}
                    value={form.name}
                    onChange={handleInputChange}
                />

                <Input
                    label="Description"
                    type="textarea"
                    name="description"
                    placeholder="Enter a description"
                    required={true}
                    value={form.description}
                    onChange={handleInputChange}
                />

                <Input
                    label="Location"
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    required={true}
                    value={form.location}
                    onChange={handleInputChange}
                />

                <Input
                    label="Category"
                    type="select"
                    name="category"
                    placeholder="Select a Category"
                    value={form.category}
                    required={true}
                    onChange={handleInputChange}
                    options={options}
                />

                <div className={styles.image_upload}>
                    <label>Upload up to 5 images:</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                    <div className={styles.preview}>
                        {images.map((img, idx) => (
                            <img key={idx} src={URL.createObjectURL(img)} alt={`Preview ${idx}`} />
                        ))}
                    </div>
                </div>

                <div className={styles.modal_buttons}>
                    <Button text="Save Changes" type="primary" />
                    <Button text="Cancel" type="secondary" handleFunction={onClose} />
                </div>
            </div>
        </div>
    )
}
