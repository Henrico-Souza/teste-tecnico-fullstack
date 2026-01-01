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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrors({});

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
        onUserCreated();
    }

    return (
        <form onSubmit={handleSubmit}></form>
    )
}