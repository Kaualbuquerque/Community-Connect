"use client";

import { useState } from "react";
import { options } from "@/utils/options";

import Button from "../Button/Button";
import Input from "../Input/Input";

import styles from "./Filter.module.scss";
import { FilterProps } from "@/utils/interfaces";

export default function Filter({ onApplyFilter }: FilterProps) {
    const [category, setCategory] = useState<string | undefined>();
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();

    const handleSubmit = () => {
        onApplyFilter({ category, minPrice, maxPrice });
    };

    return (
        <section className={styles.filter} aria-labelledby="filter-title">
            <h2 id="filter-title">Filtrar por:</h2>

            <Input
                type="select"
                label="Categorias"
                placeholder="Selecione uma categoria"
                options={options}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <fieldset className={styles.price}>
                <legend>Preço</legend>
                <div className={styles.priceRange}>
                    <Input
                        type="number"
                        placeholder="1.00"
                        value={minPrice ?? ""}
                        onChange={(e) => setMinPrice(Number(e.target.value) || undefined)}
                    />
                    <span>até</span>
                    <Input
                        type="number"
                        placeholder="1.000.000"
                        value={maxPrice ?? ""}
                        onChange={(e) => setMaxPrice(Number(e.target.value) || undefined)}
                    />
                </div>
            </fieldset>

            <Button text="Filtrar" type="primary" handleFunction={handleSubmit} />
        </section>
    );
}
