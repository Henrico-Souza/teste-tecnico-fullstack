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
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                    Cadastro de Usuário
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        className={`mx-2 mb-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                            hover:border-gray-400  
                            focus:outline-none focus:border-blue-400 focus:shadow-blue-200 transition-all
                            ${errors.name ? 'border-red-500' : ''}`
                        }
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors?.name?._errors?.[0] && (<p className="px-3 text-sm text-red-500">{errors.name._errors[0]}</p>)}

                    <input
                        className={`mx-2 mb-0 mt-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                            hover:border-gray-400  
                            focus:outline-none focus:border-blue-400 focus:shadow-blue-200 transition-all 
                            ${errors.email || errors.general ? 'border-red-500' : ''}`
                        }
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors?.email?._errors?.[0] && (<p className="px-3 text-sm text-red-500">{errors.email._errors[0]}</p>)}
                    {errors?.general && <p className="px-3 text-sm text-red-500">{errors.general}</p>}

                    <input
                        className={`mx-2 mb-0 mt-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                            hover:border-gray-400  
                            focus:outline-none focus:border-blue-400 focus:shadow-blue-200 transition-all  
                            ${errors.age ? 'border-red-500' : ''}`
                        }
                        placeholder="Idade"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    {errors?.age?._errors?.[0] && (<p className="px-3 text-sm text-red-500">{errors.age._errors[0]}</p>)}

                    {success && <p className="px-3 text-green-500">{success}</p>}

                    <button
                        disabled={loading}
                        className="px-4 py-2 mt-6 font-semibold rounded bg-blue-600 text-white  hover:bg-blue-700 transition-colors duration-200"
                    >
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>
            </div>
        </div>

    )
}