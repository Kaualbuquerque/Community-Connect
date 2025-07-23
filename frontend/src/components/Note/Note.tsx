import styles from "./Note.module.scss"

export default function Note(){
    return(
        <div className={styles.note}>
            <div className={styles.text}>
                <p>The carpentry service I used last week was excellent. The work was done quickly, and the results were exactly what I wanted. I'd definitely use them again if I need any more carpentry work done.</p>
                <span>Carpentry</span>
                <span>Jul 14, 2023</span>
            </div>
            <div className={styles.actions}>
                <p>Delete</p>
            </div>
        </div>
    )
}