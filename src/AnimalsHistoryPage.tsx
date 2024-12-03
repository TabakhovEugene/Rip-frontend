import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { api } from './api';
import BreadCrumbs from "./components/BreadCrumbs";

const AnimalsHistoryPage = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useSelector((state) => state.auth);

    const fetchAnimals = async () => {
        if (isAuthenticated) {
            setLoading(true);
            setError('');
            try {
                const response = await api.listAnimals.listAnimalsList();
                setAnimals(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
                setError('Ошибка при загрузке заявок');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    return (
        <div className="min-h-screen bg-[#060F1E] text-gray-200">

            <Navbar />

            <BreadCrumbs path="/animals" />

            <div className="container mx-auto mt-10 px-4">
                <h2 className="text-2xl font-semibold mb-4">Мои заявки животных</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-72">
                        <div className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500 text-white p-4 rounded">{error}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto bg-[#1A1D2B] text-gray-300 border-collapse">
                            <thead className="bg-[#222639]">
                            <tr>
                                <th className="px-4 py-2">Номер заявки</th>
                                <th className="px-4 py-2">Статус</th>
                                <th className="px-4 py-2">Дата создания</th>
                                <th className="px-4 py-2">Дата формирования</th>
                                <th className="px-4 py-2">Дата завершения</th>
                                <th className="px-4 py-2">Модератор</th>
                                <th className="px-4 py-2">Итоговая популяция</th>
                                <th className="px-4 py-2">Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {animals.map((animal) => (
                                <tr key={animal.pk} className="border-b border-gray-700 hover:bg-[#333A4E]">
                                    <td className="px-4 py-2 text-center">{animal.pk}</td>
                                    <td className="px-4 py-2 text-center">{animal.status}</td>
                                    <td className="px-4 py-2 text-center">
                                        {new Date(animal.created_at).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {animal.formed_at != null ? new Date(animal.formed_at).toLocaleString() : ''}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        {animal.ended_at != null ? new Date(animal.ended_at).toLocaleString() : ''}
                                    </td>
                                    <td className="px-4 py-2 text-center">{animal.moderator}</td>
                                    <td className="px-4 py-2 text-center">{animal.final_population || 0} шт.</td>
                                    <td className="px-4 py-2 text-center">
                                        <Link to={`/animal/${animal.pk}`} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                            Просмотр
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalsHistoryPage;
