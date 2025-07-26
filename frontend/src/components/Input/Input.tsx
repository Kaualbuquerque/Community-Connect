import styles from "./Input.module.scss";

interface InputProps {
    type: string;
    label?: string;
    placeholder?: string;
    value?: string;
    name?: string;
    required?: boolean;
    max_lenght?: number;
    min_lenght?: number;
    options?: { value: string; label: string }[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function Input({
    label,
    type,
    name,
    value,
    placeholder,
    required,
    max_lenght,
    min_lenght,
    options,
    onChange,
}: InputProps) {
    if (type === "radio") {
        return (
            <label className={styles.radio_box}>
                <input
                    type="radio"
                    name={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                />
                <span>{label}</span>
            </label>
        );
    }

    if (type === "textarea") {
        return (
            <label className={styles.input}>
                <span>{label}</span>
                <textarea
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    maxLength={max_lenght}
                    required={required}
                    value={value}
                    onChange={onChange}
                />
            </label>
        );
    }

    if (type === "select") {
        return (
            <label className={styles.input}>
                <span>{label}</span>
                <select
                    name={name}
                    id={name}
                    required={required}
                    value={value}
                    onChange={onChange}
                >
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                    {options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    return (
        <section className={styles.input}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                required={required}
                maxLength={max_lenght}
                minLength={min_lenght}
                value={value}
                onChange={onChange}
            />
        </section>
    );
}
