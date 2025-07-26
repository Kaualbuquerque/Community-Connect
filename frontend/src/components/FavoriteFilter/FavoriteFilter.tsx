import Button from "../Button/Button"
import Input from "../Input/Input"
import styles from "./FavoriteFilter.module.scss"

export default function FavoriteFilter() {

    const options = [
        { value: "repairs", label: "Repairs and Maintenance" },
        { value: "cleaning", label: "Cleaning Services" },
        { value: "it", label: "IT and Tech Support" },
        { value: "tutoring", label: "Tutoring and Education" },
        { value: "beauty", label: "Beauty and Aesthetics" },
        { value: "events", label: "Events and Parties" },
        { value: "delivery", label: "Deliveries and Moving" },
        { value: "construction", label: "Construction and Renovation" },
        { value: "consulting", label: "Professional Consulting" },
        { value: "other", label: "Other" },
    ]

    return (
        <div className={styles.filter}>
            <h2>Filter by:</h2>
            <Input type="select" label="Categories" placeholder="Select a Category" options={options} />

            <div className={styles.price}>
                <span>Price</span>
                <div>
                    <Input type="number" placeholder="1.00"/>
                    <p>to</p>
                    <Input type="number" placeholder="1.000.000"/>
                </div>
            </div>

            <Button text="Filter" type="primary" />
        </div>
    )
}