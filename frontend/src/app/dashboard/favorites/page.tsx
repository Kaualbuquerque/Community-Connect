import ServiceBanner from "@/components/ServiceBanner/ServiceBanner"
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

export default function Favorites() {
    return (
        <section className={styles.favorites_page}>
            <h2>Check out your favorites below</h2>

            <div className={styles.favorites}>
                {tempServices.map((service) => (
                    <ServiceBanner key={service.id} role="consumer" service={service} />
                ))}
            </div>
        </section>
    )
}
