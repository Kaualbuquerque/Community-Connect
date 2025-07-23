"use client"

import ServiceHistory from "@/components/ServiceHistory/ServiceHistory"
import styles from "./page.module.scss"
import FavortieServices from "@/components/FavoriteServices/FavoriteServices"
import Button from "@/components/Button/Button"
import Note from "@/components/Note/Note"
import { useState } from "react"
import NoteModal from "@/components/NoteModal/NoteModal"

export default function Dashboard() {
    const [showModal, setShowModal] = useState(false);

    return (
        <section className={styles.dashboard_page}>
            <h2>Walcome back, Usuário</h2>
            <section className={styles.history}>
                <h3>Service History</h3>
                <div className={styles.service_history}>
                    <ServiceHistory />
                    <ServiceHistory />
                    <ServiceHistory />
                </div>
            </section>

            <section className={styles.favorites}>
                <h3>Favorite Services</h3>
                <div className={styles.favorite_services}>
                    <FavortieServices />
                    <FavortieServices />
                    <FavortieServices />
                    <FavortieServices />
                    <FavortieServices />
                    <FavortieServices />
                </div>
            </section>

            <section className={styles.personal_notes}>
                <h3>Personal Notes</h3>
                <div onClick={() => setShowModal(true)}>
                    <Button text="+ Add New Note" type="secondary" />
                </div>
                <div className={styles.notes}>
                    <Note />
                    <Note />
                    <Note />
                </div>
            </section>

            {showModal && <NoteModal onClose={() => setShowModal(false)} />}
        </section>
    )
}