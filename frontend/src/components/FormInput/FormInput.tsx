import styles from "./FormInput.module.scss";

interface FormInputProps {
    label?: string;
    type: string;
    placeholder?: string;
    value?: string;
    name?: string;
    required: boolean;
    max_lenght?: number;
    min_lenght?: number;
}

export default function FormInput({ label, type, name, value, placeholder, required, max_lenght, min_lenght }: FormInputProps) {
    if (type === "radio") {
        return (
            <label className={styles.radio_box}>
                <input type="radio" name={name} value={value} required={required} />
                <span>{label}</span>
            </label>
        );
    }

    return (
        <div className={styles.form_input}>
            {label && <label htmlFor={label}>{label}</label>}
            <input type={type} placeholder={placeholder} name={name} id={label} required={required} maxLength={max_lenght} minLength={min_lenght} />
        </div>
    );
}
