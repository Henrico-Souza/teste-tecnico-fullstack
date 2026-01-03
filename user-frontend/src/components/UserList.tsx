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
        return <div className="w-full max-w-md mx-auto mt-10 p-6 text-xl text-blue-500 flex justify-center items-center border rounded bg-blue-50 drop-shadow-xl drop-shadow-blue-100">Carregando usuários...</div>;
    }

    if (error) {
        return <div className="w-full max-w-md mx-auto mt-10 p-6 text-xl text-red-500 flex justify-center items-center border rounded bg-red-50 drop-shadow-xl drop-shadow-red-100">{error}</div>;
    }

    if (users.length === 0) {
        return <div className="w-full max-w-md mx-auto mt-10 p-6 text-xl text-gray-600 flex justify-center items-center border rounded bg-gray-50 drop-shadow-xl drop-shadow-gray-200">Nenhum usuário encontrado.</div>;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
                <h2 className="mb-4 pb-5 border-b text-2xl font-semibold text-gray-800">
                    Usuários
                </h2>
                <ul className="flex flex-col gap-4 border-b pb-4">
                    {users.map((user, index) => (
                        <li key={index} className="pb-2 flex flex-col gap-1 border border-gray-300 rounded-sm hover:bg-gray-200 bg-gray-100 transition-all duration-100">
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