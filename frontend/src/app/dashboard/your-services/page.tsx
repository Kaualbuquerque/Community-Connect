"use client"

import { useState } from "react"
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
import styles from "./page.module.scss"
import ServiceModal from "@/components/ServiceModal/ServiceModal"

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
        name: "House Cleaning",
        provider: "João da Silva",
        description: "I carry out residential and commercial electrical installations and small repairs safely and quickly.",
        location: "Boa Vista, Recife",
        date: "Today, 3:00 PM",
        category: "cleaning",
        images: [],
    },
    {
        id: 2,
        name: "Electrical Repair",
        provider: "João da Silva",
        description: "Quick and safe electrical repairs.",
        location: "Recife",
        date: "Yesterday, 5:00 PM",
        category: "electrical",
        images: [],
    },
]

export default function YourServices() {
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleEditClick = (service: Service) => {
        setSelectedService(service)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedService(null)
    }

    return (
        <section className={styles.services_page}>
            <h2>Check your services</h2>

            <div className={styles.services}>
                {servicesData.map((service) => (
                    <ServiceBanner
                        key={service.id}
                        role="provider"
                        service={service}
                        onEdit={() => handleEditClick(service)}
                    />
                ))}
            </div>

            {isModalOpen && selectedService && (
                <ServiceModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    serviceData={{
                        name: selectedService.name,
                        description: selectedService.description,
                        location: selectedService.location,
                        category: selectedService.category,
                        images: selectedService.images,
                    }}
                />
            )}
        </section>
    )
}
