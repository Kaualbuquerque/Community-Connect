import FeatureCard from "../components/featureCard/featureCard";
import Button from "../components/button/button";
import styles from "./page.module.scss";
import { serviceCardData } from "../components/homeCard/homeCardData";
import HomeCard from "../components/homeCard/homeCard";
import { FeatureCardsData } from "../components/featureCard/featureCardsData";


export default function HomePage() {
  return (
    <main className={styles.homePage}>

      {/* Banner principal */}
      <section className={styles.homePageBanner} aria-label="Banner principal">
        <div className={styles.bannerContent}>
          <h1>Encontre e apoie serviços em sua comunidade</h1>
          <p>Pesquise serviços perto de você de forma rápida e gratuita</p>
        </div>
      </section>

      {/* Seção de tipos de serviços */}
      <section className={styles.servicesCards} aria-labelledby="services-title">
        <h2 id="services-title">Que tipo de serviço você está procurando?</h2>
        <div className={styles.cards}>
          {serviceCardData.map((data, index) => (
            <HomeCard
              key={index}
              image={data.image}
              title={data.title}
              description={data.description}
            />
          ))}
        </div>
      </section>

      {/* Seção de benefícios */}
      <section className={styles.featureCards} aria-labelledby="features-title">
        <h2 id="features-title">Por que usar o Community Connect</h2>
        <div className={styles.cards}>
          {FeatureCardsData.map((data, index) => (
            <FeatureCard
              key={index}
              iconLight={data.iconLight}
              iconDark={data.iconDark}
              text={data.text}
            />
          ))}
        </div>
      </section>

      {/* Seção call-to-action */}
      <section className={styles.getStarted} aria-labelledby="get-started-title">
        <h2 id="get-started-title">
          Pronto para encontrar ou oferecer serviços em sua comunidade?
        </h2>
        <p>
          Cadastre-se agora e faça parte da rede que conecta pessoas e talentos locais.
        </p>
        <Button type="primary" text="Cadastre-se" href="/auth/register" />
      </section>
    </main>
  );
}
