import {useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import Navbar from "./components/Navbar.tsx";
import BreadCrumbs from "./components/BreadCrumbs.tsx";


const mockHabitats = [
    { id: 1, title: 'Евразия', picture_url: 'http://127.0.0.1:9000/test/Евразия.jpg' },
    { id: 2, title: 'Африка', picture_url: 'http://127.0.0.1:9000/test/Африка.jpg' },
    { id: 3, title: 'Австралия', picture_url: 'http://127.0.0.1:9000/test/Австралия.jpg' },
];

const HabitatsPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [habitats, setHabitats] = useState(mockHabitats);
    const [filteredHabitats, setFilteredHabitats] = useState(mockHabitats);
    const [currentAnimalId, setCurrentAnimalId] = useState(null);
    const [currentCount, setCurrentCount] = useState(0);

    const fetchHabitats = async () => {
        try {
            const response = await fetch('/api/habitats/');
            const habitatsData = await response.json();
            const filteredData = habitatsData.filter(item => item.pk !== undefined);
            const animalIdData = habitatsData.find(item => item.draft_request_id);
            const animalCountData = habitatsData.find(item => item.count);
            setHabitats(filteredData);
            setFilteredHabitats(filteredData);
            setCurrentAnimalId(animalIdData?.draft_request_id || null);
            setCurrentCount(animalCountData?.count || 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных мест обитания:', error);
            setHabitats(mockHabitats);
            setFilteredHabitats(mockHabitats);
            const requestData = mockHabitats.find(item => item);
            setCurrentAnimalId(requestData?.draft_request_id || null);
            setCurrentCount(requestData?.count || 0);
        }
    };
    useEffect(() => {
        fetchHabitats();
    }, []);

    const handleSearch = async (title) => {
        title.preventDefault();
        try {
            const response = await fetch(`/api/habitats/?title=${inputValue}`);
            const result = await response.json();
            const filteredResult = result.filter(item => item.pk !== undefined);
            setFilteredHabitats(filteredResult);
        } catch (error) {
            console.error('Ошибка при выполнении поиска:', error);
        }
    };

    const handleAddHabitat = async (habitatId) => {
        try {
            const response = await fetch(`/api/habitats/add/${habitatId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ habitat_id: habitatId }),
            });
            if (response.ok) {
                alert('Место обитания добавлена');
                fetchHabitats();
            }
            else alert('Ошибка при добавлении места обитания');
        } catch (error) {
            console.error('Ошибка при добавлении места обитания:', error);
        }
    };

    return (
        <div className="bg-[#060F1E] font-roboto">
            <Navbar/>
            <BreadCrumbs path="/habitats" />
            <form onSubmit={handleSearch} className="flex justify-center mb-16 mt-12 space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(title) => setInputValue(title.target.value)}
                    placeholder="Поиск..."
                    className="p-2 w-3/4 h-9 border rounded-md"
                />
                <button type="submit"
                        className="bg-white border rounded-md w-28 text-black hover:bg-[#060F1E] hover:text-white transition-all duration-300">Поиск
                </button>
            </form>

            <h2 className="text-6xl font-bold text-white ml-8">МЕСТА ОБИТАНИЯ</h2>
            <div className="ml-4">
                <ul className="grid grid-cols-3 gap-4">
                    {filteredHabitats.map(habitat => (
                        <li key={habitat.pk}
                            className="shadow-lg transition-all duration-300 rounded-md border
                             m-5 bg-white relative">
                            <img src={habitat.picture_url} alt={habitat.title}
                                 className="rounded-md w-full h-72 object-cover"
                            />

                            <div className="flex justify-center">
                                <Link to={`/habitats/${habitat.pk}`} className=" no-underline mt-2 text-black text-2xl">{habitat.title}</Link>
                            </div>
                            <div className="m-0 p-0">
                                <button
                                    className="pointer-events-none w-full bg-white text-gray-900 border rounded mt-2 transition-all duration-500 hover:bg-[#060F1E] hover:text-white"
                                    onClick={
                                    (e) => {e.preventDefault();
                                        handleAddHabitat(habitat.pk);
                                    }}
                                >
                                    Добавить в заявку
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="ml-16 fixed bottom-2.5 right-3">
                <Link to={`/animal/${currentAnimalId}`} className="pointer-events-none">
                    <img
                        className="basket w-16 h-16 rounded-full bg-purple-300 transition-all duration-500 hover:bg-purple-800"
                        src="http://127.0.0.1:9000/test/korzina3.png" alt="store icon"/>
                    <div
                        className="absolute bottom-0 right-0 inline-block text-center w-6 h-6 rounded-full bg-blue-500 border border-white">
                        <p className="top-0 w-5.5 h-4 font-roboto text-white font-bold text-md text-center justify-center">{currentCount}</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default HabitatsPage;