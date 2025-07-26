"use client"

import { useState } from "react"
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
import FavortieServices from "@/components/FavoriteServices/FavoriteServices"
import Button from "@/components/Button/Button"
import Note from "@/components/Note/Note"
import NoteModal from "@/components/NoteModal/NoteModal"
import styles from "./page.module.scss"

const tempServices = [
  {
    id: 1,
    name: "House Cleaning",
    provider: "Maria Souza",
    description: "Professional residential cleaning services.",
    location: "São Paulo, SP",
    date: "Today, 10:00 AM",
    category: "cleaning",
    images: [],
  },
  {
    id: 2,
    name: "Gardening",
    provider: "Carlos Silva",
    description: "Lawn mowing and garden maintenance.",
    location: "Rio de Janeiro, RJ",
    date: "Yesterday, 2:00 PM",
    category: "gardening",
    images: [],
  },
  {
    id: 3,
    name: "Tutoring",
    provider: "Ana Pereira",
    description: "Math and science tutoring for all ages.",
    location: "Belo Horizonte, MG",
    date: "Last week, 9:00 AM",
    category: "education",
    images: [],
  },
]

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className={styles.dashboard_page}>
      <h2>Welcome back, Usuário</h2>

      <section className={styles.history}>
        <h3>Service History</h3>
        <div className={styles.service_history}>
          {tempServices.map((service) => (
            <ServiceBanner key={service.id} role="consumer" service={service} />
          ))}
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
