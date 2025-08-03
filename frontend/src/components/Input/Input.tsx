import styles from "./Input.module.scss";

interface InputProps {
    type: string;
    label?: string;
    placeholder?: string;
    value?: string;
    name?: string;
    required?: boolean;
    max_length?: number;
    min_length?: number;
    checked?: boolean; // <-- Adicionado
    options?: { value: string; label: string, disabled: boolean }[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function Input({
    label,
    type,
    name,
    value,
    placeholder,
    required,
    max_length,
    min_length,
    checked,
    options,
    onChange,
}: InputProps) {

    if (type === "radio") {
        return (
            <label className={styles.radioBox}>
                <input
                    type="radio"
                    name={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                    checked={checked} // <-- Adicionado aqui
                />
                {label && <span>{label}</span>}
            </label>
        );
    }

    if (type === "textarea") {
        return (
            <label className={styles.input}>
                {label && <label htmlFor={name}>{label}</label>}
                <textarea
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    maxLength={max_length}
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
                {label && <label htmlFor={name}>{label}</label>}
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
                        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
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
                maxLength={max_length}
                minLength={min_length}
                value={value}
                onChange={onChange}
            />
        </section>
    );
}
