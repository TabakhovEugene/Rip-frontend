import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo2.png';
import menu from '../assets/menu2.png';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { logout } from "../redux/authSlice.tsx";
import { setHabitats, setInputValue, setCurrentAnimalId, setCurrentCount } from '../redux/habitatsSlice';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, username } = useSelector((state) => state.auth); // Получаем данные о пользователе из Redux состояния

    // Функция для выхода
    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get('csrftoken'); // Получаем CSRF токен из cookies

            const response = await axios.post('/api/logout/', {}, {
                headers: {
                    'X-CSRFToken': csrfToken, // Подставляем CSRF токен в заголовок запроса
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 204) {
                dispatch(setHabitats([]));
                dispatch(setInputValue(''));
                dispatch(setCurrentAnimalId(null));
                dispatch(setCurrentCount(0));
                dispatch(logout()); // Вызываем экшен для логута в Redux
                navigate('/login'); // Перенаправляем на страницу логина
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            alert('Ошибка при выходе. Пожалуйста, попробуйте позже.');
        }
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="text-white py-4 px-6 flex justify-between items-center font-roboto">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img src={logo} alt="logo"/>
                    </div>
                    <p className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-800 hover:to-purple-700 transition-all duration-500">Дикая природа</p>
                </Link>
            </div>
            {/* Links */}
            <nav className="hidden md:flex space-x-4">
                <Link to="/habitats" className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600">
                    Места обитания
                </Link>

                {/* Если пользователь авторизован, показываем кнопки на Заявки и Личный кабинет */}
                {isAuthenticated ? (
                    <>
                        <Link to="/animals" className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600">
                            Заявки
                        </Link>
                        <Link to="/profile" className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600">
                            Личный кабинет ({username})
                        </Link>
                        {/* Кнопка выхода */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 focus:outline-none"
                        >
                            Выйти
                        </button>
                    </>
                ) : (
                    // Если пользователь не авторизован, показываем кнопки для Входа и Регистрации
                    <>
                        <Link to="/login" className="inline-block py-2 px-6 bg-white text-black rounded-md hover:bg-gray-100">
                            Вход
                        </Link>
                        <Link to="/register" className="inline-block py-2 px-6 bg-black text-white rounded-md hover:bg-gray-800">
                            Регистрация
                        </Link>
                    </>
                )}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
                <img src={menu} alt="menu" className="w-6 h-6"/>
            </button>
            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-gray-400 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-4 mt-3">
                    <button className="self-start mb-7" onClick={toggleMenu}>
                        <img src={menu} alt="menu2" className="w-6 h-6"/>
                    </button>
                    <Link to="/habitats" className="text-white mb-2">
                        Места обитания
                    </Link>

                    {/* Если пользователь авторизован, показываем кнопки на Заявки и Личный кабинет */}
                    {isAuthenticated ? (
                        <>
                            <Link to="/animals" className="text-white mb-2">
                                Заявки
                            </Link>
                            <Link to="/profile" className="text-white mb-7">
                                Личный кабинет ({username})
                            </Link>
                            {/* Кнопка выхода */}
                            <button
                                onClick={handleLogout}
                                className="block py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        // Если пользователь не авторизован, показываем кнопки для Входа и Регистрации
                        <>
                            <Link to="/login" className="block py-2 hover:text-gray-300 mt-5">
                                Вход
                            </Link>
                            <Link to="/register" className="block py-2 hover:text-gray-300">
                                Регистрация
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
