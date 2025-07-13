import styles from "./page.module.css"
import HomeCard from "@/components/serviceCard/ServiceCard";
import { serviceCardsData } from "@/components/serviceCard/ServiceCardsData";

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
          {serviceCardsData.map((data, index) => (
            <HomeCard key={index} image={data.image} title={data.title} description={data.description} />
          ))}
        </div>
      </section>
    </div>
  );
}
