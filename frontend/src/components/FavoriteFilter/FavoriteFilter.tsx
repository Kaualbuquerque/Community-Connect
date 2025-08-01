import { options } from "@/utils/options"
import Button from "../Button/Button"
import Input from "../Input/Input"
import styles from "./FavoriteFilter.module.scss"

export default function FavoriteFilter() {

    return (
        <div className={styles.filter}>
            <h2>Filtrar por:</h2>
            <Input type="select" label="Categorias" placeholder="Selecione uma categoria" options={options} />

            <div className={styles.price}>
                <span>Preço</span>
                <div>
                    <Input type="number" placeholder="1.00"/>
                    <p>até</p>
                    <Input type="number" placeholder="1.000.000"/>
                </div>
            </div>

            <Button text="Filtrar" type="primary" />
        </div>
    )
}