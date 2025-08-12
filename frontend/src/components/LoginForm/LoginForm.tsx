"use client";

import { useTheme } from "@/context/ThemeContext";
import styles from "./LoginForm.module.scss";
import Image from "next/image";
import Input from "../Input/Input";
import Button from "../Button/Button";
import logo from "@/icons/logo/community_connect_logo_light.png";
import logo_dark from "@/icons/logo/community_connect_logo_dark.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/services/auth";

interface FormState {
    email: string;
    password: string;
}

export default function LoginForm() {
    const { theme } = useTheme();
    const router = useRouter();

    const [errorMsg, setErrorMsg] = useState("");
    const [form, setForm] = useState<FormState>({
        email: "",
        password: "",
    });

    const handleInputChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    > = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log("Dados do form no submit:", form);
            const response = await loginUser(form);


            const { access_token, user } = response;

            localStorage.setItem("token", access_token);
            localStorage.setItem("user", JSON.stringify(user));

            router.push("/dashboard");
        } catch (error: any) {
            setErrorMsg(error || "Email ou senha inválidos.");
        }
    };


    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.logo}>
                {theme === "light" ? (
                    <Image src={logo_dark} alt="Logo modo claro" />
                ) : (
                    <Image src={logo} alt="communit connect logo" />
                )}
                <h3>Communit Connect</h3>
            </div>

            <h2>Login</h2>

            <Input
                label="Email:"
                type="email"
                name="email"
                placeholder="Seu@email.com"
                required={true}
                value={form.email}
                onChange={handleInputChange}
            />

            <Input
                label="Senha:"
                type="password"
                name="password"
                placeholder="Sua senha"
                required={true}
                min_length={6}
                max_length={12}
                value={form.password}
                onChange={handleInputChange}
            />

            {errorMsg && <p className={styles.error}>{errorMsg}</p>}

            <div className={styles.buttons}>
                <Button text="Login" type="primary" />
            </div>
        </form>
    );
}
