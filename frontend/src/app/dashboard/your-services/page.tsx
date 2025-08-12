"use client"

import { useEffect, useState, useCallback } from "react"
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
import styles from "./page.module.scss"
import ServiceModal from "@/components/ServiceModal/ServiceModal"
import Button from "@/components/Button/Button"
import { createService, deleteService, getServices, updateService } from "@/services/service"
import { Service } from "@/utils/types"

export default function YourServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchServices = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getServices();
            setServices(data);
        } catch (error) {
            console.error("Erro ao carregar serviços:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleEditService = (id: string) => {
        const serviceToEdit = services.find(s => s.id === id);
        if (!serviceToEdit) return;

        setSelectedService(serviceToEdit);
        setShowModal(true);
    };
    const handleDeleteService = async (id: string) => {
        try {
            await deleteService(id); // chama a API para deletar
            // Atualiza a lista local removendo o serviço deletado
            setServices(prev => prev.filter(s => s.id !== id));
            alert("Serviço deletado com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar serviço:", error);
            alert("Não foi possível deletar o serviço.");
        }
    };

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const handleAddNewService = () => {
        setSelectedService(null);
        setShowModal(true);
    };

    const handleCloseModal = (shouldReload?: boolean) => {
        setShowModal(false);
        setSelectedService(null);
        if (shouldReload) {
            fetchServices();
        }
    };

    return (
        <section className={styles.yourServicesPage}>
            <h2>Verifique seus serviços</h2>

            <div className={styles.services}>
                {loading && <p>Carregando serviços...</p>}

                {!loading && services.length === 0 && (
                    <p>Você ainda não possui serviços cadastrados.</p>
                )}

                {!loading && services.length > 0 && services.map((service) => (
                    <ServiceBanner
                        key={service.id}
                        role="provider"
                        service={service}
                        onEdit={() => handleEditService(service.id)}
                        onDelete={() => handleDeleteService(service.id)}
                    />
                ))}
            </div>

            <div className={styles.addService}>
                <Button
                    text="+ Adicionar novo serviço"
                    type="secondary"
                    handleFunction={handleAddNewService}
                />
            </div>

            {showModal && (
                <ServiceModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    serviceData={selectedService ? {
                        id: selectedService.id,
                        name: selectedService.name,
                        provider: selectedService.provider,
                        description: selectedService.description,
                        location: selectedService.location,
                        date: selectedService.date,
                        category: selectedService.category,
                        images: selectedService.images,
                        price: selectedService.price.toString(),
                    } : {
                        id: "", // ou undefined se permitido
                        provider: {
                            name: "",
                            email: "",
                            password: "",
                            phone: "",
                            role: "provider",
                            cep: "",
                            state: "",
                            city: "",
                            number: "",
                        },
                        name: "",
                        description: "",
                        location: "",
                        date: "",
                        category: "",
                        images: [],
                        price: "",
                    }}
                    onSubmit={selectedService ? (data) => updateService(selectedService.id, data) : createService}
                />
            )}
        </section>
    );

}
