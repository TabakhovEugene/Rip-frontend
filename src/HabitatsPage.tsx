import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addHabitatToDraft, fetchHabitats, searchHabitats, setInputValue} from './redux/habitatsSlice';
import { Link } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import BreadCrumbs from "./components/BreadCrumbs.tsx";
import euro from './assets/2.jpg';
import afro from './assets/3.jpg';
import aust from './assets/4.jpg';
import korzina from './assets/korzina3.png';

const mockHabitats = [
    { pk: 1, title: 'Евразия', picture_url: euro },
    { pk: 2, title: 'Африка', picture_url: afro },
    { pk: 3, title: 'Австралия', picture_url: aust },
];

const HabitatsPage = () => {
    const { habitats, inputValue, currentAnimalId, currentCount, loading, error } = useSelector((state) => state.habitats);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHabitats());
    }, [dispatch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(searchHabitats(inputValue));
    };

    const handleAddHabitat = (habitatId: number) => {
        dispatch(addHabitatToDraft(habitatId));
    };

    return (
        <div className="bg-[#060F1E] font-roboto min-h-screen">
            <Navbar />
            <BreadCrumbs path="/habitats" />
            <form onSubmit={handleSearch} className="flex justify-center mb-16 mt-12 space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => dispatch(setInputValue(e.target.value))}
                    placeholder="Поиск..."
                    className="p-2 w-56 sm:w-3/4 h-9 border rounded-md"
                />
                <button
                    type="submit"
                    className="bg-white border rounded-md w-20 sm:w-28 text-black hover:bg-[#060F1E] hover:text-white transition-all duration-300">
                    Поиск
                </button>
            </form>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white ml-8">МЕСТА ОБИТАНИЯ</h2>
            <div className="ml-4 min-h-[50vh] flex flex-col justify-center items-center">
                {loading && <p>Загрузка...</p>}
                {error && <p>{error}</p>}
                {habitats.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {habitats.map((habitat) => (
                            <li key={habitat.pk} className="shadow-lg transition-all duration-300 rounded-md border m-5 bg-white">
                                <img src={habitat.picture_url} alt={habitat.title} className="rounded-md w-full h-72 object-cover" />
                                <div className="flex justify-center">
                                    <Link to={`/habitats/${habitat.pk}`} className="no-underline mt-2 text-black text-2xl">
                                        {habitat.title}
                                    </Link>
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

            <div className="ml-16 fixed bottom-2.5 right-3">
                <Link to={`/animal/${currentAnimalId}`} className={currentCount === 0 ? "pointer-events-none" : ""}>
                    <img
                        className={`w-16 h-16 rounded-full transition-all duration-500 ${currentCount === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-purple-300 hover:bg-purple-800"}`}
                        src={korzina}
                        alt="store icon"
                    />
                    <div className="absolute bottom-0 right-0 inline-block text-center w-6 h-6 rounded-full bg-blue-500 border border-white">
                        <p className="top-0 w-5.5 h-4 font-roboto text-white font-bold text-md text-center justify-center">
                            {currentCount}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default HabitatsPage;
