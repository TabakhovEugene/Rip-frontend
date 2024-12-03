import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar.tsx";
import Cookies from "js-cookie";
import Modal from "./components/Modal.tsx";
import { setCurrentAnimalId, setCurrentCount } from "./redux/habitatsSlice.tsx";

const AnimalPage = () => {
    const { currentAnimalId, currentCount } = useSelector((state) => state.habitats);
    const { animalId } = useParams();
    const [genus, setGenus] = useState('');
    const [type, setType] = useState('');
    const [currentHabitats, setCurrentHabitats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [editHabitat, setEditHabitat] = useState(null);
    const [newPopulation, setNewPopulation] = useState('');
    const [status, setStatus] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAnimalData = async () => {
        try {
            const response = await fetch(`/api/animal/${animalId}/`);
            if (!response.ok) throw new Error("Ошибка загрузки данных!");
            const data = await response.json();
            setCurrentHabitats(data.habitats);
            setStatus(data.status);
            setGenus(data.genus);
            setType(data.type);
        } catch (error) {
            setErrorMessage("Заявка не найдена");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnimalData();
    }, [animalId]);

    const updateGenusType = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/animal/${animalId}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ genus, type }),
            });
            if (!response.ok) throw new Error("Ошибка при обновлении рода и вида");
            alert("Род и вид успешно обновлены!");
        } catch (error) {
            alert("Не удалось обновить род и вид.");
            console.error("Ошибка:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/delete-animal/${animalId}/`, {
                method: "DELETE",
                headers: {
                    "X-CSRFToken": csrfToken,
                },
            });
            if (response.ok) {
                dispatch(setCurrentAnimalId(null));
                dispatch(setCurrentCount(0));
                navigate("/habitats");
            } else {
                alert("Ошибка при удалении заявки");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleDeleteHabitat = async (habitatId) => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/delete-from-animal/${animalId}/habitat/${habitatId}/`, {
                method: "DELETE",
                headers: { "X-CSRFToken": csrfToken },
            });
            if (response.ok) {
                setCurrentHabitats(currentHabitats.filter((habitat) => habitat.pk !== habitatId));
            } else {
                alert("Ошибка при удалении места обитания");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleEditPopulation = (habitatId, currentPopulation) => {
        setEditHabitat(habitatId);
        setNewPopulation(currentPopulation);
        setModalOpen(true);
    };

    const handleSavePopulation = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/add-population-to-animal/${animalId}/habitat/${editHabitat}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ population: newPopulation }),
            });
            if (response.ok) {
                setCurrentHabitats((prev) =>
                    prev.map((habitat) =>
                        habitat.pk === editHabitat ? { ...habitat, population: newPopulation } : habitat
                    )
                );
                setModalOpen(false);
            } else {
                alert("Ошибка при обновлении популяции");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleFormAnimal = async () => {
        try {
            const csrfToken = Cookies.get("csrftoken");
            const response = await fetch(`/api/form-animal/${animalId}/`, {
                method: "PUT",
                headers: { "X-CSRFToken": csrfToken },
            });
            if (response.ok) {
                dispatch(setCurrentAnimalId(null));
                dispatch(setCurrentCount(0));
                navigate("/habitats");
            } else {
                alert("Ошибка при формировании заявки");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="bg-[#060F1E] font-roboto bg-fixed min-h-screen">
            <Navbar />
            <h1 className="text-center font-bold text-5xl text-white mt-12">
                РЕГИСТРАЦИЯ НОВОГО ВИДА ЖИВОТНОГО
            </h1>
            {loading ? (
                <p className="text-white text-center mt-10">Загрузка...</p>
            ) : errorMessage ? (
                <p className="text-red-500 text-center mt-10">{errorMessage}</p>
            ) : (
                <div className="flex flex-col items-center mt-12">
                    {/* Поля для ввода рода и вида */}
                    <div className="w-2/5 mb-6">
                        <label className="text-white block mb-2">Род:</label>
                        <input
                            type="text"
                            value={genus}
                            onChange={(e) => setGenus(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                        <label className="text-white block mt-4 mb-2">Вид:</label>
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
                            onClick={updateGenusType}
                        >
                            Сохранить изменения
                        </button>
                    </div>
                    <ul className="w-2/5">
                        {currentHabitats.map((habitat) => (
                            <li key={habitat.pk} className="bg-white rounded shadow-lg mb-5 flex items-center">
                                <img src={habitat.picture_url} alt={habitat.title} className="h-48 w-72 rounded" />
                                <div className="ml-5 flex flex-col">
                                    <h3 className="text-2xl font-bold">{habitat.title}</h3>
                                    <p>{habitat.description}</p>
                                    <p>Популяция: {habitat.population}</p>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
                                        onClick={() => handleEditPopulation(habitat.pk, habitat.population)}
                                    >
                                        Редактировать
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-700"
                                        onClick={() => handleDeleteHabitat(habitat.pk)}
                                    >
                                        Удалить из заявки
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700"
                        onClick={handleFormAnimal}
                    >
                        Сформировать
                    </button>
                    <button
                        className="bg-red-500 text-white px-6 py-3 rounded mt-5 hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Удалить заявку
                    </button>
                </div>
            )}

            {isModalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">Редактирование популяции</h2>
                    <input
                        type="number"
                        value={newPopulation}
                        onChange={(e) => setNewPopulation(e.target.value)}
                        className="p-2 border rounded w-full mb-4"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleSavePopulation}
                    >
                        Сохранить
                    </button>
                </Modal>
            )}
        </div>
    );
};

export default AnimalPage;
