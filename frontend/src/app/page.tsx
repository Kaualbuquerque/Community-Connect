import FeatureCard from "@/components/FeatureCard/FeatureCard";
import styles from "./page.module.css"
import HomeCard from "@/components/serviceCard/ServiceCard";
import { FeatureCardsData } from "@/components/FeatureCard/FeatureCardsData";
import { serviceCardData } from "@/components/serviceCard/serviceCardData";
import Button from "@/components/button/Button";

export default function Home() {
  return (
    <div className={styles.homePage}>

      <section className={styles.home_page_banner}>
        <div className={styles.banner_content}>
          <h1>Find and support services in your community</h1>
          <p>Search for services near you quickly and free of charge</p>
        </div>
      </section>


      <section className={styles.services_cards}>
        <h2>What kind of service are you looking for?</h2>
        <div className={styles.cards}>
          {serviceCardData.map((data, index) => (
            <HomeCard key={index} image={data.image} title={data.title} description={data.description} />
          ))}
        </div>
      </section>

      <section className={styles.feature_cards}>
        <h2>Why use Community Connect</h2>
        <div className={styles.cards}>
          {FeatureCardsData.map((data, index) => (
            <FeatureCard key={index} iconLight={data.iconLight} iconDark={data.iconDark} text={data.text} />
          ))
          }
        </div>
      </section>

      <section className={styles.get_started}>
          <h2>Ready to find or offer services in your community?</h2>
          <p>Sign up now and be part of the network that connects local people and talent.</p>
          <Button type="primary" text="Get Started"/>
      </section>
    </div>
  );
}
