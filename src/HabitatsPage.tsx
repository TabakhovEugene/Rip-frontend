import {useEffect, useState} from "react";
import { setHabitats, setInputValue, setCurrentAnimalId, setCurrentCount } from './redux/habitatsSlice';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import BreadCrumbs from "./components/BreadCrumbs.tsx";
import euro from './assets/Евразия.jpg';
import afro from './assets/Африка.jpg';
import aust from './assets/Австралия.jpg';
import korzina from './assets/korzina3.png';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { api } from './api';

interface Habitat {
    pk: number;
    title: string;
    picture_url: string;
}

const mockHabitats: Habitat[] = [
    { pk: 1, title: 'Евразия', picture_url: euro },
    { pk: 2, title: 'Африка', picture_url: afro },
    { pk: 3, title: 'Австралия', picture_url: aust },
];

const HabitatsPage = () => {
    const { habitats, inputValue, currentAnimalId, currentCount } = useSelector((state) => state.habitats);
    const dispatch = useDispatch();

    // Добавьте состояние авторизации
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const fetchHabitats = async () => {
        try {
            const response = await api.habitats.habitatsList();
            const habitatsData = response.data.filter((item) => item.pk !== undefined);
            dispatch(setHabitats(habitatsData));

            const animalIdData = response.data.find((item) => item.draft_request_id);
            const animalCountData = response.data.find((item) => item.count);
            dispatch(setCurrentAnimalId(animalIdData?.draft_request_id || null));
            dispatch(setCurrentCount(animalCountData?.count || 0));

            // Если данные содержат информацию об авторизованном пользователе
            setIsAuthenticated(!!animalIdData);
        } catch (error) {
            console.error('Ошибка при загрузке данных МО:', error);
            dispatch(setHabitats([]));
        }
    };

    useEffect(() => {
        fetchHabitats();
    }, [dispatch]);

    const handleSearch = async (title: { preventDefault: () => void; }) => {
        title.preventDefault();
        try {
            const response = await api.habitats.habitatsList({
                title: inputValue,
            });
            const filteredHabitats = response.data.filter((item) => item.pk !== undefined);
            dispatch(setHabitats(filteredHabitats));
        } catch (error) {
            console.error('Ошибка при выполнении поиска:', error);

            const filteredMockHabitats = mockHabitats.filter((habitat) => {
                const matchesTitle = inputValue
                    ? habitat.title.toLowerCase().includes(inputValue.toLowerCase())
                    : true;
                return matchesTitle;
            });

            dispatch(setHabitats(filteredMockHabitats)); // Локальный поиск
        }
    };

    const handleAddHabitat = async (habitat_id: number) => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            const response = await api.habitats.habitatsAddCreate(habitat_id, {}, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });

            if (response.status === 201) {
                const updatedAnimalId = response.data.draft_request_id;

                // Увеличиваем currentCount локально
                dispatch(setCurrentAnimalId(updatedAnimalId));
                dispatch(setCurrentCount(currentCount + 1));

                // Удаляем добавленное место обитания из доступных мест
                dispatch(setHabitats(habitats.filter(habitat => habitat.pk !== habitat_id)));
            } else {
                console.error('Ошибка при добавлении МО: неожиданный статус ответа', response.status);
            }
        } catch (error) {
            console.error('Ошибка при добавлении МО:', error);
        }
        fetchHabitats();
    };

    return (
        <div className="bg-[#060F1E] font-roboto min-h-screen">
            <Navbar />
            <BreadCrumbs path="/habitats" />
            <form onSubmit={handleSearch} className="flex justify-center mb-16 mt-12 space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => dispatch(setInputValue(event.target.value))}
                    placeholder="Поиск..."
                    className="p-2 w-56 sm:w-3/4 h-9 border rounded-md"
                />
                <button type="submit"
                        className="bg-white border rounded-md w-20 sm:w-28 text-black hover:bg-[#060F1E] hover:text-white transition-all duration-300">
                    Поиск
                </button>
            </form>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white ml-8">МЕСТА ОБИТАНИЯ</h2>
            <div className="ml-4 min-h-[50vh] flex flex-col justify-center items-center">
                {habitats.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {habitats.map((habitat: Habitat) => (
                            <li key={habitat.pk} className="shadow-lg transition-all duration-300 rounded-md border m-5 bg-white">
                                <img src={habitat.picture_url} alt={habitat.title}
                                     className="rounded-md w-full h-72 object-cover"
                                />
                                <div className="flex justify-center">
                                    <Link to={`/habitats/${habitat.pk}`}
                                          className="no-underline mt-2 text-black text-2xl">{habitat.title}</Link>
                                </div>
                                <div className="flex justify-center mt-4">
                                    <button
                                        onClick={() => handleAddHabitat(habitat.pk)}
                                        className="w-full bg-pink-400 text-white py-2 px-6 rounded-md hover:bg-pink-600 transition-all duration-300">
                                        Добавить в заявку
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white text-xl">Места обитания не найдены</p>
                )}
            </div>

            {/* Корзина только для авторизованных пользователей */}
            {isAuthenticated && (
                <div className="ml-16 fixed bottom-2.5 right-3">
                    <Link
                        to={`/animal/${currentAnimalId}`}
                        className={currentCount === 0 ? "pointer-events-none" : ""} // Disable click if currentCount is 0
                    >
                        <img
                            className="w-16 h-16 rounded-full bg-purple-300 transition-all duration-500 hover:bg-purple-800"
                            src={korzina}
                            alt="store icon"
                        />
                        <div
                            className="absolute bottom-0 right-0 inline-block text-center w-6 h-6 rounded-full bg-blue-500 border border-white"
                        >
                            <p className="top-0 w-5.5 h-4 font-roboto text-white font-bold text-md text-center justify-center">
                                {currentCount}
                            </p>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HabitatsPage;
