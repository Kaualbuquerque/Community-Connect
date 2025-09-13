"use client";

import { useState } from "react";
import Image from "next/image";

import { useTheme } from "@/context/ThemeContext";
import Button from "../Button/Button";

import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import styles from "./ServiceBanner.module.scss";
import { ServiceBannerProps } from "@/utils/interfaces";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import heartFillLight from "@/icons/favorite/heart-fill-light.png";
import heartFillDark from "@/icons/favorite/heart-fill-dark.png";
import heartLight from "@/icons/sidebar/heart-light.png";
import heartDark from "@/icons/sidebar/heart-dark.png";
import { addFavorite, removeFavorite } from "@/services/favorite";
import { useRouter } from "next/navigation";
import { createConversation } from "@/services/conversation";

export default function ServiceBanner({ role, service, onEdit, onDelete }: ServiceBannerProps) {
    const { theme } = useTheme();
    const [isFavorite, setIsFavorite] = useState(service.isFavorite ?? false); // 👈 começa conforme backend
    const [isPopping, setIsPopping] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleContact = async () => {
        console.log("Cliquei em enviar mensagem");
        try {
            const conversation = await createConversation({
                participantId: service.provider.id,
            });

            router.push(`/dashboard/chats/${conversation.id}`);
        } catch (err) {
            console.error("Erro ao iniciar conversa:", err);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = async () => {
        if (loading) return;
        setLoading(true);

        try {
            if (isFavorite) {
                await removeFavorite(service.id);
                setIsFavorite(false);
            } else {
                await addFavorite(service.id);
                setIsFavorite(true);
            }

            setIsPopping(true);
            setTimeout(() => setIsPopping(false), 300);
        } catch (error) {
            console.error("Erro ao atualizar favoritos:", error);
        } finally {
            setLoading(false);
        }
    };

    const icons = {
        fill: theme === "light" ? heartFillDark : heartFillLight,
        outline: theme === "light" ? heartDark : heartLight,
    };

    const heartIcon = isFavorite ? icons.fill : icons.outline;


    return (
        <article className={styles.serviceBanner}>
            <header className={styles.header}>
                <h1>{service.name}</h1>
                <h5>{service.provider.name}</h5>
            </header>

            <section className={styles.description}>
                <p><strong>Descrição:</strong></p>
                <span>{service.description}</span>
            </section>

            <section className={styles.details}>
                <h5>{service.location}</h5>
                <h2>
                    {parseFloat(service.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </h2>
            </section>

            <section className={styles.actions}>
                {role === "provider" ? (
                    <div className={styles.providerActions}>
                        <Button text="Editar serviço" type="secondary" handleFunction={onEdit} />
                        <Button text="Deletar serviço" type="alert" handleFunction={onDelete} />
                    </div>
                ) : (
                    <div className={styles.consumerActions}>
                        <Image
                            src={heartIcon.src}
                            alt={isFavorite ? "Favorito" : "Não favoritado"}
                            width={32}
                            height={32}
                            className={`${styles.heart} ${isPopping ? styles.pop : ""}`}
                            role="button"
                            tabIndex={0}
                            onClick={toggleFavorite}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") toggleFavorite();
                            }}
                            aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                        />

                        <Button
                            text={loading ? "Carregando..." : "Enviar mensagem"}
                            type="primary"
                            handleFunction={handleContact}
                        />
                    </div>
                )}
            </section>

            {service.images?.length > 0 && (
                <figure className={styles.imageWrapper}>
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        spaceBetween={10}
                        slidesPerView={1}
                        style={{ width: "100%", height: "auto" }}
                    >
                    </Swiper>
                </figure>
            )}
        </article>
    );
}
