"use client"
import { useState } from "react"
import Input from "@/components/Input/Input"
import Button from "@/components/Button/Button"
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
import FavoriteFilter from "@/components/FavoriteFilter/FavoriteFilter"
import { useTheme } from "@/context/ThemeContext"
import styles from "./page.module.scss"

import filter_light from "@/icons/favorite/filter_light.png"
import filter_dark from "@/icons/favorite/filter_dark.png"

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
  {
    id: 4,
    name: "Dog Walking",
    provider: "João Lima",
    description: "Reliable and caring dog walking services.",
    location: "Curitiba, PR",
    date: "Today, 5:00 PM",
    category: "pet care",
    images: [],
  },
]

export default function Search() {
  const { theme } = useTheme()
  const [isFilterVisible, setIsFilterVisible] = useState(false)

  const filter = theme === "light" ? filter_dark : filter_light

  const toggleFilter = () => {
    setIsFilterVisible((prev) => !prev)
  }

  return (
    <section className={styles.search_page}>
      <h2>What do you need today?</h2>

      <div className={styles.inputs}>
        <Input type="text" placeholder="Search by service" />
        <Button text="" type="secondary" icon={filter} handleFunction={toggleFilter} />
      </div>

      {isFilterVisible && <FavoriteFilter />}

      <section className={styles.services}>
        {tempServices.map((service) => (
          <ServiceBanner key={service.id} role="consumer" service={service} />
        ))}
      </section>
    </section>
  )
}