import Image from 'next/image';

import styles from './HomeCard.module.scss';
import { HomeCardProps } from '../../utils/interfaces';

export default function HomeCard({ image, title, description }: HomeCardProps) {
    return (
        <article className={styles.homeCard}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                />
            </div>

            <h2>{title}</h2>
            <p>{description}</p>
        </article>
    );
}
