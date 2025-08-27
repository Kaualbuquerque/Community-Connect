"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import ServiceBanner from "@/components/ServiceBanner/ServiceBanner";
import Filter from "@/components/Filter/Filter";
import { useTheme } from "@/context/ThemeContext";
import styles from "./page.module.scss";

import filter_light from "@/icons/favorite/filter_light.png";
import filter_dark from "@/icons/favorite/filter_dark.png";
import { getAllServices } from "@/services/service";
import { Service, ServiceFilters } from "@/utils/interfaces";

export default function SearchServicePage() {
  const { theme } = useTheme();
  const [search, setSearch] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<ServiceFilters>({});
  const [loading, setLoading] = useState(true);

  const filterIcon = theme === "light" ? filter_dark : filter_light;

  const toggleFilter = () => setIsFilterVisible((prev) => !prev);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  // aplica busca + filtros
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const price = Number(service.price); // conversão segura

      const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filters.category ? service.category === filters.category : true;

      const matchesMinPrice = filters.minPrice ? price >= filters.minPrice : true;
      const matchesMaxPrice = filters.maxPrice ? price <= filters.maxPrice : true;

      return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });
  }, [services, search, filters]);

  return (
    <main className={styles.searchServicePage} aria-label="Buscar serviços">
      <header>
        <h1>O que você precisa hoje?</h1>
      </header>

      <section className={styles.inputs}>
        <Input
          type="text"
          placeholder="Pesquisar por serviço"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          text=""
          type="secondary"
          icon={filterIcon}
          handleFunction={toggleFilter}
        />
      </section>

      {isFilterVisible && <Filter onApplyFilter={setFilters} />}

      <section className={styles.services} aria-label="Lista de serviços">
        {loading && <p>Carregando serviços...</p>}

        {!loading && filteredServices.length === 0 && (
          <p>Nenhum serviço encontrado com os filtros selecionados.</p>
        )}

        {!loading &&
          filteredServices.map((service) => (
            <ServiceBanner key={service.id} role="consumer" service={service} />
          ))}
      </section>
    </main>
  );
}
