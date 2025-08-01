"use client"

import { useState } from "react"
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
import styles from "./page.module.scss"
import ServiceModal from "@/components/ServiceModal/ServiceModal"
import Button from "@/components/Button/Button"

interface Service {
    id: number
    name: string
    provider: string
    description: string
    location: string
    date: string
    category: string
    images: string[]
}

const servicesData: Service[] = [
    {
        id: 1,
        name: "Limpeza Residencial",
        provider: "João da Silva",
        description: "Realizo limpezas residenciais e comerciais com segurança e agilidade.",
        location: "Boa Vista, Recife",
        date: "Hoje, 15:00",
        category: "limpeza",
        images: [],
    },
    {
        id: 2,
        name: "Reparo Elétrico",
        provider: "João da Silva",
        description: "Reparos elétricos rápidos e seguros.",
        location: "Recife",
        date: "Ontem, 17:00",
        category: "elétrica",
        images: [],
    },    
]

export default function YourServicesPage() {
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [showModal, setShowModal] = useState(false)

    const handleEditService = (service: Service) => {
        setSelectedService(service)
        setShowModal(true)
    }

    const handleAddNewService = () => {
        setSelectedService(null) // Novo serviço
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedService(null)
    }

    return (
        <section className={styles.yourServicesPage}>
            <h2>Verifique seus serviços</h2>

            <div className={styles.services}>
                {servicesData.map((service) => (
                    <ServiceBanner
                        key={service.id}
                        role="provider"
                        service={service}
                        onEdit={() => handleEditService(service)}
                    />
                ))}
            </div>

            <div className={styles.addService}>
                <Button text="+ Adicionar novo serviço" type="secondary" handleFunction={handleAddNewService} />
            </div>

            {showModal && (
                <ServiceModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    serviceData={
                        selectedService
                            ? {
                                name: selectedService.name,
                                description: selectedService.description,
                                location: selectedService.location,
                                category: selectedService.category,
                                images: selectedService.images,
                            }
                            : {
                                name: "",
                                description: "",
                                location: "",
                                category: "",
                                images: [],
                            }
                    }
                />
            )}
        </section>
    )
}
