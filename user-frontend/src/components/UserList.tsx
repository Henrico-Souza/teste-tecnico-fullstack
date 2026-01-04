import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/api";

interface User {
    name: string;
    email: string;
    age: number;
}

export function UserList({ updateList }: { updateList: boolean }) {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await fetch(`${API_BASE_URL}/users`);

                if (!response.ok) {
                    throw new Error("Erro ao buscar usuários");
                }

                const data = await response.json();
                setUsers(data);
            } catch (error) {
                setError("Erro ao carregar os usuários");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [updateList]);

    if (loading) {
        return <div className="list-message text-blue-500 bg-blue-50 drop-shadow-blue-100">Carregando usuários...</div>;
    }

    if (error) {
        return <div className="list-message text-red-500 bg-red-50 drop-shadow-red-100">{error}</div>;
    }

    if (users.length === 0) {
        return <div className="list-message text-gray-600 bg-gray-50 drop-shadow-gray-200">Nenhum usuário encontrado.</div>;
    }

    return (
        <div className="principal-container">
            <div className="secondary-container">
                <h1 className="mb-4 title">
                    Usuários
                </h1>
                <ul className="flex flex-col gap-4 border-b pb-4">
                    {users.map((user, index) => (
                        <li key={index} className="list-item">
                            <p className="pl-2"><strong>Nome:</strong> {user.name}</p>
                            <p className="pl-2"><strong>Email:</strong> {user.email}</p>
                            <p className="pl-2"><strong>Idade:</strong> {user.age}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}