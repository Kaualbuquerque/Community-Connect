"use client"
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeButton.module.scss';
import sun from '@/icons/sun.png';
import moon from '@/icons/moon.png';
import Image from 'next/image';

export default function ThemeButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className={`${styles.button} ${theme === 'dark' ? styles.primary : styles.secondary}`}
            onClick={toggleTheme}
        >
            {theme === 'dark' ? (
                <Image src={moon} alt="moon icon" />
            ) : (
                <Image src={sun} alt="sun icon" />
            )}
        </div>
    );
}
