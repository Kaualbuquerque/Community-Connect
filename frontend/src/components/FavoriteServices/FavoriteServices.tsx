import Image from "next/image"
import styles from "./FavoriteServices.module.scss"

import test from "@/imgs/home_page_banner.png"

export default function FavortieServices(){
    return(
        <div className={styles.favorite_service}>
            <Image src={test} alt=""/>
            <p>Complete Cleaning for Apartment</p>
        </div>
    )
}