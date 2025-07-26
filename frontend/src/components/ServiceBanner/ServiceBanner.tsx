"use client"

import Image from "next/image"
import styles from "./ServiceBanner.module.scss"
import { useState } from "react"
import { useTheme } from "@/context/ThemeContext"

import heart_fill_light from "@/icons/favorite/heart-fill-light.png"
import heart_fill_dark from "@/icons/favorite/heart-fill-dark.png"
import heart_light from "@/icons/sidebar/heart-light.png"
import heart_dark from "@/icons/sidebar/heart-dark.png"

import test from "@/imgs/home_page_banner.png"
import Button from "../Button/Button"

interface ServiceData {
    id?: number
    name: string
    provider: string
    description: string
    location: string
    date: string
    category?: string
    images?: string[]
}

interface ServiceBannerProps {
    role: "provider" | "consumer"
    service: ServiceData
    onEdit?: () => void
}

export default function ServiceBanner({ role, service, onEdit }: ServiceBannerProps) {
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
        <div className={styles.service_banner}>
            <h4>{service.name}</h4>
            <h5>{service.provider}</h5>
            <p className={styles.description}>Description:</p>
            <p>{service.description}</p>
            <h6>{service.location}</h6>
            <span>{service.date}</span>

            <div>
                {role === "provider" ? (
                    <Button text="Edit Service" type="secondary" handleFunction={onEdit} />
                ) : (
                    <>
                        <div onClick={toggleFavorite} style={{ cursor: "pointer" }}>
                            <Image
                                src={heartIcon.src}
                                alt="Favorite"
                                width={32}
                                height={32}
                                className={`${styles.heart} ${isPopping ? styles.pop : ""}`}
                            />
                        </div>
                        <Button text="Send a message" type="primary" />
                    </>
                )}
            </div>

            <Image src={test} alt="Service" />
        </div>
    )
}
