"use client"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image"
import styles from "./ServiceBanner.module.scss"
import { useState } from "react"
import { useTheme } from "@/context/ThemeContext"

import heart_fill_light from "@/icons/favorite/heart-fill-light.png"
import heart_fill_dark from "@/icons/favorite/heart-fill-dark.png"
import heart_light from "@/icons/sidebar/heart-light.png"
import heart_dark from "@/icons/sidebar/heart-dark.png"
import Button from "../Button/Button"
import { ServiceBannerProps } from "@/utils/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"




export default function ServiceBanner({ role, service, onEdit, onDelete }: ServiceBannerProps) {
    const { theme } = useTheme()
    const [isFavorite, setIsFavorite] = useState(false)
    const [isPopping, setIsPopping] = useState(false)

    const toggleFavorite = () => {
        setIsFavorite((prev) => !prev)
        setIsPopping(true)
        setTimeout(() => setIsPopping(false), 300)
    }

    const icons = {
        fill: theme === "light" ? heart_fill_dark : heart_fill_light,
        outline: theme === "light" ? heart_dark : heart_light,
    }

    const heartIcon = isFavorite ? icons.fill : icons.outline

    return (
        <article className={styles.serviceBanner}>
            <header>
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
                    <div>
                        <Button text="Editar serviço" type="secondary" handleFunction={onEdit} />
                        <Button text="Deletar serviço" type="alert" handleFunction={onDelete} />
                    </div>
                ) : (
                    <>
                        <button
                            type="button"
                            className={styles.favoriteButton}
                            onClick={toggleFavorite}
                            aria-label="Adicionar aos favoritos"
                        >
                            <Image
                                src={heartIcon.src}
                                alt="Ícone de favorito"
                                width={32}
                                height={32}
                                className={`${styles.heart} ${isPopping ? styles.pop : ""}`}
                            />
                        </button>
                        <Button text="Enviar mensagem" type="primary" />
                    </>
                )}
            </section>

            <figure className={styles.imageWrapper}>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={1}
                    style={{ width: "100%", height: "auto" }}
                >
                    {service.images?.map((img, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={img}
                                alt={`Imagem ${index + 1} do serviço ${service.name}`}
                                width={500}
                                height={300}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </figure>
        </article>
    );

}
