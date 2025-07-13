import Image from 'next/image';
import styles from './ServiceCard.module.scss'

interface HomeCardProps {
    image: string;
    title: string;
    description: string;
}

export default function HomeCard({ image, title, description }: HomeCardProps) {
    return (
        <div className={styles.homeCard}>
            <div className={styles.imageWrapper}>
                <Image src={image} alt={title} fill />
            </div>

            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    )
}