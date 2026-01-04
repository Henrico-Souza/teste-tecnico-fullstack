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

            if (!response.ok) {
                setErrors(data.errors || { general: data.message });
                return;
            }

            setName("");
            setEmail("");
            setAge("");
            setSuccess("Usuario criado com sucesso!");
            onUserCreated();

            setTimeout(() => setSuccess(""), 1500);
        } catch (err) {
            setErrors({ general: "Conexão com o servidor falhou." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="principal-container">
            <div className="secondary-container">
                <h1 className="mb-6 title">
                    Cadastro de Usuário
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        className={`input-field ${errors.name && 'input-error'}`}
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors?.name?._errors?.[0] && (<p className="message-error">{errors.name._errors[0]}</p>)}

                    <input
                        className={`input-field ${errors.email || errors.general ? 'input-error' : ''}`}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors?.email?._errors?.[0] && (<p className="message-error">{errors.email._errors[0]}</p>)}

                    <input
                        className={`input-field ${errors.age && 'input-error'}`}
                        placeholder="Idade"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    {errors?.age?._errors?.[0] && (<p className="message-error">{errors.age._errors[0]}</p>)}

                    {errors?.general && <p className="message-error">{errors.general}</p>}

                    {success &&
                        <div className="flex items-center justify-center mt-3">
                            <p className="message-success">{success}</p>
                        </div>
                    }

                    <button disabled={loading} className="cadastro-btn">
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>
            </div>
        </div>

    )
}