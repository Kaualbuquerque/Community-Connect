"use client"

import styles from "./page.module.scss"
import logo from "@/icons/logo/community_connect_logo_light.png"
import logo_dark from "@/icons/logo/community_connect_logo_dark.png"
import Image from "next/image"
import { useTheme } from "@/context/ThemeContext";
import Input from "@/components/Input/Input"
import Button from "@/components/Button/Button"
import Form from "@/components/Form/Form"
import Link from "next/link"
import { useState } from "react"
import { maskCep, maskPhone } from "@/utils/masks"
import { fetchAddressByCep } from "@/utils/cep"

export default function RegisterPage() {
    const { theme } = useTheme();

    const [form, setForm] = useState({
        cep: "",
        state: "",
        city: "",
        number: "",
        phone: "",
    });

    const handleCepChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = async (e) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            const masked = maskCep(value);
            setForm(prev => ({
                ...prev,
                cep: masked
            }));

            if (masked.replace("-", "").length === 8) {
                const address = await fetchAddressByCep(masked);
                if (address) {
                    setForm(prev => ({
                        ...prev,
                        state: address.state,
                        city: address.city
                    }));
                }
            }
        }
    };

    const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e) => {
        if (e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            const masked = maskPhone(value);
            setForm(prev => ({
                ...prev,
                phone: masked
            }));
        }
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e) => {
        if (e.target instanceof HTMLInputElement) {
            const { name, value } = e.target;
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    return (
        <div className={styles.registerPage}>
            <section className={styles.registerForm}>
                <Form>
                    <div className={styles.logo}>
                        {theme === "light" ?
                            <Image src={logo_dark} alt="Logo modo claro" />
                            :
                            <Image src={logo} alt="communit connect logo" />
                        }
                        <h3>Communit Connect</h3>
                    </div>
                    <h2>Registrar</h2>
                    <div className={styles.profile}>
                        <p>Escolha seu perfil:</p>
                        <div>
                            <Input label="Consumidor" type="radio" name="userProfile" value="consumer" required={true} />
                            <Input label="Provedor" type="radio" name="userProfile" value="provider" required={true} />
                        </div>
                    </div>
                    <Input label="Nome completo:" type="text" placeholder="Seu nome" required={true} />
                    <Input label="Email:" type="email" placeholder="Seu@email.com" required={true} />
                    <Input label="Senha:" type="Password" placeholder="Sua senha" required={true} min_length={6} max_length={12} />
                    <Input label="Confirmar senha:" type="Password" placeholder="Confirmar senha" required={true} min_length={6} max_length={12} />
                    <Input
                        label="Telefone:"
                        type="phone"
                        name="phone"
                        placeholder="(xx) xxxxx-xxxx"
                        required={true}
                        min_length={15}
                        max_length={15}
                        value={form.phone}
                        onChange={handlePhoneChange}
                    />
                    <div className={styles.location}>
                        <Input
                            label="CEP:"
                            type="text"
                            name="cep"
                            placeholder="xxxxx-xxx"
                            required={true}
                            value={form.cep}
                            onChange={handleCepChange}
                            min_length={9}
                            max_length={9}
                        />
                        <Input
                            label="Estado:"
                            type="text"
                            placeholder="PE"
                            required={true}
                            value={form.state}
                            onChange={handleInputChange}
                            max_length={2}
                        />
                        <Input
                            label="Cidade:"
                            type="text"
                            placeholder="Recife"
                            required={true}
                            value={form.city}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Número:"
                            type="text"
                            placeholder="xx"
                            required={true}
                            value={form.number}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.buttons}>
                        <Button text="Registrar" type="primary" href="/auth/login" />
                        <Link href="/auth/login"><p>Já tem uma conta?</p></Link>
                    </div>
                </Form>
            </section>
        </div>
    )
}