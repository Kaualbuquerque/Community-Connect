"use client";

import { useEffect, useState } from "react";
import { options } from "../../utils/options";

import Button from "../button/button";
import Input from "../input/input";

import styles from "./filter.module.scss";
import { FilterProps, FiltersState } from "../../utils/interfaces";
import { fetchCities, fetchStates } from "../../services/service";

export default function Filter({ onApplyFilter, onClose }: FilterProps) {
    const [filters, setFilters] = useState<FiltersState>({
        category: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        state: undefined,
        city: undefined,
    });

    const [states, setStates] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);

    // Carrega estados ao montar o componente
    useEffect(() => {
        const loadStates = async () => {
            try {
                const result = await fetchStates();
                setStates(result);
            } catch (err) {
                console.error("Error fetching states:", err);
            }
        };
        loadStates();
    }, []);

    // Carrega cidades quando o estado muda
    useEffect(() => {
        const loadCities = async () => {
            if (!filters.state) {
                setCities([]);
                setFilters(prev => ({ ...prev, city: undefined }));
                return;
            }

            try {
                const result = await fetchCities(filters.state);
                setCities(result);
                setFilters(prev => ({ ...prev, city: undefined })); // limpa cidade depois de carregar novas opções
            } catch (err) {
                console.error("Error fetching cities:", err);
                setCities([]);
                setFilters(prev => ({ ...prev, city: undefined }));
            }
        };

        loadCities();
    }, [filters.state]);

    const handleSubmit = () => {
        onApplyFilter(filters);
        onClose?.();
    };

    const handleCancel = () => {
        const cleared = {
            category: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            state: undefined,
            city: undefined,
        };
        setFilters(cleared);
        onApplyFilter({
            category: "",
            minPrice: 0,
            maxPrice: 9999999,
            state: undefined,
            city: undefined,
        });
        onClose?.();
    };

    return (
        <section className={styles.filter} aria-labelledby="filter-title">
            <h2 id="filter-title">Filtrar por:</h2>

            <Input
                type="select"
                label="Categorias"
                placeholder="Selecione uma categoria"
                options={options}
                value={filters.category}
                onChange={(e) =>
                    setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
            />

            <Input
                type="select"
                label="Estado"
                placeholder="Selecione um estado"
                options={states.map((state) => ({ value: state, label: state }))}
                value={filters.state}
                onChange={(e) =>
                    setFilters((prev) => ({
                        ...prev,
                        state: e.target.value,
                    }))
                }
            />

            <Input
                type="select"
                label="Cidade"
                placeholder="Selecione uma cidade"
                options={cities.map((city) => ({ value: city, label: city }))}
                value={filters.city}
                onChange={(e) =>
                    setFilters((prev) => ({ ...prev, city: e.target.value }))
                }
                disabled={!filters.state}
            />

            <fieldset className={styles.price}>
                <legend>Preço</legend>
                <div className={styles.priceRange}>
                    <Input
                        type="number"
                        placeholder="1.00"
                        value={filters.minPrice ?? ""}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                minPrice: Number(e.target.value) || undefined,
                            }))
                        }
                    />
                    <span>até</span>
                    <Input
                        type="number"
                        placeholder="1.000.000"
                        value={filters.maxPrice ?? ""}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                maxPrice: Number(e.target.value) || undefined,
                            }))
                        }
                    />
                </div>
            </fieldset>

            <div className={styles.buttons}>
                <Button text="Limpar" type="secondary" handleFunction={handleCancel} />
                <Button text="Filtrar" type="primary" handleFunction={handleSubmit} />
            </div>
        </section>
    );
}
