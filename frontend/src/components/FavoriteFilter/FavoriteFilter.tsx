import { options } from "@/utils/options";

import Button from "../Button/Button";
import Input from "../Input/Input";

import styles from "./FavoriteFilter.module.scss";

export default function FavoriteFilter() {
    return (
        <section className={styles.filter} aria-labelledby="filter-title">
            <h2 id="filter-title">Filtrar por:</h2>

            <Input
                type="select"
                label="Categorias"
                placeholder="Selecione uma categoria"
                options={options}
            />

            <fieldset className={styles.price}>
                <legend>Preço</legend>
                <div className={styles.priceRange}>
                    <Input type="number" placeholder="1.00" />
                    <span>até</span>
                    <Input type="number" placeholder="1.000.000" />
                </div>
            </fieldset>

            <Button text="Filtrar" type="primary" />
        </section>
    );
}
