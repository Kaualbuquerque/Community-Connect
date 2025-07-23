import Image from "next/image"
import styles from "./ServiceHistory.module.scss"

import test from "@/imgs/home_page_banner.png"

export default function ServiceHistory() {
    return (
        <div className={styles.service_banner}>
            <h4>House Cleaning</h4>
            <h5>João da Silva</h5>
            <p className={styles.description}>Description:</p>
            <p> I carry out residential and commercial electrical installations and small repairs safely and quickly.</p>
            <h6>Boa Vista, Recife</h6>
            <span>Today, 3:00 PM</span>

            <Image src={test} alt="" />
        </div>
    )
}