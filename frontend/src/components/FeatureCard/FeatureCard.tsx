"use client"

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import styles from "./FeatureCard.module.scss";

interface FeatureCardProps {
    iconLight: string;
    iconDark: string;
    text: string;
}

export default function FeatureCard({ iconLight, iconDark, text }: FeatureCardProps) {
    const { theme } = useTheme();

    const icon = theme === "dark" ? iconDark : iconLight;

    return (
        <section className={styles.feature_card}>
            <Image src={icon} alt="" width={32} height={32} />
            <p>{text}</p>
        </section>
    );
}
