import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar.tsx";
import Cookies from "js-cookie";
import { FaTrashAlt } from "react-icons/fa"; // Importing the trash icon from react-icons

const AnimalPage = () => {
    const { animalId } = useParams();
    const [genus, setGenus] = useState('');
    const [type, setType] = useState('');
    const [currentHabitats, setCurrentHabitats] = useState([]);
    const [newPopulation, setNewPopulation] = useState('');
    const [editHabitat, setEditHabitat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState('');

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
                setEditHabitat(null); // Disable the editing mode
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
                            <li
                                key={habitat.pk}
                                className="bg-gradient-to-r from-[#1A1D2B] to-[#2C2F3E] text-gray-200 rounded shadow-lg mb-3 flex items-center p-3 hover:from-[#252833] hover:to-[#3A3E50] transition"
                            >
                                <img
                                    src={habitat.picture_url}
                                    alt={habitat.title}
                                    className="h-16 w-24 rounded object-cover border-2 border-gray-500 shadow-inner"
                                />
                                <div className="ml-3 flex-1">
                                    <h3 className="text-lg font-semibold truncate text-[#FFD700]">{habitat.title}</h3>
                                    <p className="text-xs truncate text-gray-300">{habitat.description}</p>
                                    <div className="flex justify-items-center">
                                        <p className="text-md font-medium mt-1 text-[#A3E635]">
                                            Популяция:{" "}
                                        </p>
                                        <input
                                            type="number"
                                            value={editHabitat === habitat.pk ? newPopulation : habitat.population}
                                            onChange={(e) => setNewPopulation(e.target.value)}
                                            className="mt-1 ml-2 p-1 w-20 text-xs rounded"
                                            disabled={editHabitat !== habitat.pk}
                                            style={{
                                                color: editHabitat === habitat.pk ? "black" : "white",
                                            }}
                                        />
                                        {editHabitat === habitat.pk ? (
                                            <button
                                                className="mt-1 bg-blue-500 text-white text-xs px-2 py-1 ml-2 rounded"
                                                onClick={handleSavePopulation}
                                            >
                                                Сохранить
                                            </button>
                                        ) : (
                                            <button
                                                className="mt-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-xs px-3 py-1 rounded shadow-md hover:from-[#2563EB] hover:to-[#1D4ED8] transition ml-2"
                                                onClick={() => handleEditPopulation(habitat.pk, habitat.population)}
                                            >
                                                Редактировать
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end ml-3">
                                    <FaTrashAlt
                                        className="text-red-500 text-xl cursor-pointer bounce-on-hover"
                                        onClick={() => handleDeleteHabitat(habitat.pk)}
                                    />
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
                        className="bg-red-500 text-white px-6 py-3 rounded mt-4 hover:bg-red-700"
                        onClick={handleDelete}
                    >
                        Удалить заявку
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnimalPage;
