import FeatureCard from "@/components/FeatureCard/FeatureCard";
import styles from "./page.module.scss"
import HomeCard from "@/components/ServiceCard/ServiceCard";
import { FeatureCardsData } from "@/components/FeatureCard/FeatureCardsData";
import { serviceCardData } from "@/components/ServiceCard/serviceCardData";
import Button from "@/components/Button/Button";

export default function HomePage() {
  return (
    <div className={styles.homePage}>

      <section className={styles.homePageBanner}>
        <div className={styles.bannerContent}>
          <h1>Encontre e apoie serviços em sua comunidade</h1>
          <p>Pesquise serviços perto de você de forma rápida e gratuita</p>
        </div>
      </section>


      <section className={styles.servicesCards}>
        <h2>Que tipo de serviço você está procurando??</h2>
        <div className={styles.cards}>
          {serviceCardData.map((data, index) => (
            <HomeCard key={index} image={data.image} title={data.title} description={data.description} />
          ))}
        </div>
      </section>

      <section className={styles.featureCards}>
        <h2>Por que usar o Community Connect</h2>
        <div className={styles.cards}>
          {FeatureCardsData.map((data, index) => (
            <FeatureCard key={index} iconLight={data.iconLight} iconDark={data.iconDark} text={data.text} />
          ))
          }
        </div>
      </section>

      <section className={styles.getStarted}>
          <h2>Pronto para encontrar ou oferecer serviços em sua comunidade?</h2>
          <p>Cadastre-se agora e faça parte da rede que conecta pessoas e talentos locais.</p>
          <Button type="primary" text="Cadastre-se" href="/auth/register"/>
      </section>
    </div>
  );
}
