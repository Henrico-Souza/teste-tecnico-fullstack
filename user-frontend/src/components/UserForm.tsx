import React, { useState } from "react";
import { API_BASE_URL } from "../services/api";

interface UserFormProps {
    onUserCreated: () => void;
}

export function UserForm({ onUserCreated }: UserFormProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const [errors, setErrors] = useState<any>([]);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});
        setSuccess("");
        setLoading(true);

        try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                age: Number(age)
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setErrors(data.errors || { general: data.message });
            return;
        }

        setName("");
        setEmail("");
        setAge("");
            setSuccess("Usuario criado com sucesso!");
        onUserCreated();
        } catch (err) {
            setErrors({ general: "Conexão com o servidor falhou." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                className=""
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && <p className="error">{errors.name[0]}</p>}

            <input
                className=""
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors?.email && <p className="error">{errors.email[0]}</p>}

            <input
                className=""
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            {errors?.age && <p className="error">{errors.age[0]}</p>}

            {errors?.general && <p className="error">{errors.general}</p>}

            {success && <p className="success">{success}</p>}

            <button
                disabled={loading}
                className="submit"
            >
                {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
        </form>
    )
}