import styles from "./Input.module.scss";

interface InputProps {
    label?: string;
    type: string;
    placeholder?: string;
    value?: string;
    name?: string;
    required: boolean;
    max_lenght?: number;
    min_lenght?: number;
    options?: { value: string; label: string }[];
}

export default function Input({ label, type, name, value, placeholder, required, max_lenght, min_lenght, options }: InputProps) {
    if (type === "radio") {
        return (
            <label className={styles.radio_box}>
                <input type="radio" name={name} value={value} required={required} />
                <span>{label}</span>
            </label>
        );
    }

    if (type === "textarea") {
        return (
            <label className={styles.input}>
                <span>{label}</span>
                <textarea name={name} id={name} placeholder={placeholder} maxLength={max_lenght}></textarea>
            </label>
        );
    }

    if (type === "select") {
        return (
            <label className={styles.input}>
                <span>{label}</span>
                <select name={name} id={name} required={required} defaultValue="">
                    <option value="" disabled hidden>{placeholder}</option>
                    {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </label>
        );
    }

    return (
        <section className={styles.input}>
            {label && <label htmlFor={label}>{label}</label>}
            <input type={type} placeholder={placeholder} name={name} id={label} required={required} maxLength={max_lenght} minLength={min_lenght} />
        </section>
    );
}
