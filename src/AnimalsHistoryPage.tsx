import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { api } from './api';
import BreadCrumbs from "./components/BreadCrumbs";
import axios from "axios";

const AnimalsHistoryPage = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useSelector((state) => state.auth);

    // Маппинг статусов на русский
    const statusTranslations = {
        "completed": "Животное открыто",
        "cancelled": "Животное отклонено",
        "formed": "Животное сформировано"
    };

    const fetchAnimals = async () => {
        if (isAuthenticated) {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get('/api/list-animals/');
                // const response = await api.listAnimals.listAnimalsList();
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
            <Navbar/>

            <BreadCrumbs path="/animals"/>

            <div className="container mx-auto mt-10 px-4">
                <h2 className="text-2xl font-semibold mb-4">Мои заявки животных</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-72">
                        <div
                            className="loader border-t-4 border-b-4 border-white w-12 h-12 rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-500 text-white p-4 rounded">{error}</div>
                ) : (
                    <div className="space-y-4">
                        {animals.map((animal) => (
                            <div
                                key={animal.pk}
                                className="bg-[#1A1D2B] text-gray-300 rounded p-4 shadow-md hover:bg-[#333A4E] transition"
                            >
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                                    <div className="text-center">
                                        <span className="font-semibold block">Номер заявки</span>
                                        {animal.pk}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Статус</span>
                                        {/* Использование перевода статусов */}
                                        {statusTranslations[animal.status] || animal.status}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Дата создания</span>
                                        {new Date(animal.created_at).toLocaleString()}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Дата формирования</span>
                                        {animal.formed_at != null
                                            ? new Date(animal.formed_at).toLocaleString()
                                            : '-'}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Дата завершения</span>
                                        {animal.ended_at != null
                                            ? new Date(animal.ended_at).toLocaleString()
                                            : '-'}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Ученый</span>
                                        {animal.moderator}
                                    </div>
                                    <div className="text-center">
                                        <span className="font-semibold block">Итоговая популяция</span>
                                        {animal.final_population || 0} шт.
                                    </div>
                                    <div className="text-center">
                                        <Link
                                            to={`/animal/${animal.pk}`}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Просмотр
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default AnimalsHistoryPage;
