// import {useNavigate, useParams} from "react-router-dom";
// import {useEffect, useState} from "react";
// import Navbar from "./components/Navbar.tsx";
//
//
// const mockAnimal = [
//     {
//         animalId: '1',
//         habitats: [
//             {
//                 pk: '1',
//                 title: 'Евразия',
//                 population: 15000,
//                 description: 'Краткое описание Евразии.',
//                 picture_url: 'http://127.0.0.1:9000/test/Евразия.jpg'
//
//             },
//             {
//                 pk: '2',
//                 title: 'Австралия',
//                 population: 12000,
//                 description: 'Краткое описание Австралия.',
//                 picture_url: 'http://127.0.0.1:9000/test/Австралия.jpg'
//             },
//         ],
//     },
// ];
//
// const AnimalPage = () => {
//     const navigate = useNavigate();
//     const {animalId} = useParams();
//     const [currentHabitats, setCurrentHabitats] = useState([]);
//     const [loading, setLoading] = useState(true); // Для состояния загрузки
//     const [errorMessage, setErrorMessage] = useState(''); // Для обработки ошибок
//
//     const fetchAnimalData = async () => {
//         if (!animalId) {
//             setLoading(false); // Если reqId не установлен, выходим из функции
//             return;
//         }
//
//         try {
//             const response = await fetch(`/api/animal/${animalId}/`);
//
//             if (!response.ok) {
//                 throw new Error('Ошибка загрузки данных! Заявка не активна или необходимо авторизоваться!');
//             }
//
//             const animalData = await response.json();
//             setCurrentHabitats(animalData.habitats); // Устанавливаем угрозы из ответа
//         } catch (err) {
//             // Если произошла ошибка, используем мок-данные только если нет соединения
//             const mockAni = mockAnimal.find(animal => animal.animalId === animalId);
//
//             if (mockAni) {
//                 setCurrentHabitats(mockAni.habitats);
//             } else {
//                 setErrorMessage('Заявка не найдена');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
//
//
//     useEffect(() => {
//         fetchAnimalData();
//     }, [animalId]);
//
//     const handleDelete = async (animalId) => {
//         if (!animalId) return; // Если reqId не установлен, ничего не делаем
//
//         try {
//             const response = await fetch(`/api/delete-animal/${animalId}/`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'X-CSRFToken': getCsrfToken() // добавьте CSRF токен, если используете Django
//                 },
//                 // body: JSON.stringify({ animal_id: animalId })
//             });
//             if (response.ok) {
//                 // alert('Запрос успешно удален');
//                 setCurrentHabitats([]);
//                 navigate('/habitats');// Очищаем угрозы после удаления
//             } else {
//                 alert('Ошибка при удалении запроса');
//             }
//         } catch (error) {
//             console.error('Ошибка:', error);
//         }
//     };
//
//     return(
//         <div className="bg-[#060F1E] font-roboto bg-fixed">
//             <Navbar/>
//             <h1 className="flex justify-center font-roboto font-bold text-5xl text-white mt-12">
//                 РЕГИСТРАЦИЯ НОВОГО ВИДА ЖИВОТНОГО
//             </h1>
//
//             <div className="flex flex-col items-center my-12 font-roboto">
//                 <div className="w-5/6">
//                     <select className="rounded-md p-2 w-full">
//                         <option>Олень Северный</option>
//                         {/*{data.types.map((type, index) => (*/}
//                         {/*    <option key={index}>{type}</option>*/}
//                         {/*))}*/}
//                     </select>
//                 </div>
//
//                 <div className="w-5/6 mt-5">
//                     <select className="rounded-md p-2 w-full">
//                         <option>Олени</option>
//                         {/*{data.genuses.map((genus, index) => (*/}
//                         {/*    <option key={index}>{genus}</option>*/}
//                         {/*))}*/}
//                     </select>
//                 </div>
//             </div>
//
//             <div className="flex justify-center">
//                 <ul className="w-full p-0 list-none flex flex-col items-center">
//                     {currentHabitats.length > 0 ? (
//                         currentHabitats.map((habitat, index) => (
//                             <li
//                                 key={index}
//                                 className="shadow-md transition-all duration-300 rounded-md border w-1/3 h-50 my-5 bg-white text-decoration-none flex items-start"
//                             >
//                                 <img
//                                     className="h-48 w-64 object-cover rounded-l-md"
//                                     src={habitat.picture_url}
//                                     alt="habitat img"
//                                 />
//                                 <div className="flex flex-col ml-5 mt-5">
//                                     <a
//                                         className="font-roboto no-underline text-black text-2xl"
//                                         href={`/habitat/${habitat.pk}`}
//                                     >
//                                         {habitat.title}
//                                     </a>
//                                     <p className="text-gray-700 mt-2">{habitat.description}</p>
//                                     <form action={`/habitats/${habitat.pk}`}>
//                                         <input
//                                             className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//                                             type="submit" value="Подробнее"/>
//                                     </form>
//                                 </div>
//                             </li>
//                         ))
//                     ) : (
//                         <li className="font-roboto text-white">Корзина пуста</li>
//                     )}
//                 </ul>
//             </div>
//
//             <div className="flex justify-center">
//                 <button
//                     onClick={() => handleDelete(animalId)}
//                     className="mb-5 w-24 bg-white text-darkred border rounded ml-6 mt-1.5 transition-all duration-500 border-darkred hover:bg-red-600 hover:text-white">
//                     Удалить
//                 </button>
//             </div>
//         </div>
//     );
// }
//
// export default AnimalPage;