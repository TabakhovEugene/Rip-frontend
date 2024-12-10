import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo2.png';
import menu from '../assets/menu2.png';
import user from '../assets/user.png';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import { logout } from "../redux/authSlice.tsx";
import { setHabitats, setInputValue, setCurrentAnimalId, setCurrentCount } from '../redux/habitatsSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, username, avatar } = useSelector((state) => state.auth); // Получаем данные о пользователе из Redux состояния
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Для управления выпадающим меню

    // Функция для выхода
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = Cookies.get('csrftoken'); // Получаем CSRF токен из cookies
            const response = await axios.post('/api/logout/', {}, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                }
            });
            if (response.status === 204) {
                dispatch(setHabitats([]));
                dispatch(setInputValue(''));
                dispatch(setCurrentAnimalId(null));
                dispatch(setCurrentCount(0));
                dispatch(logout());
                navigate('/login');
            }
        } catch (error) {
            console.error('Ошибка при выходе:', error);
            alert('Ошибка при выходе. Пожалуйста, попробуйте позже.');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="text-white py-4 px-6 flex justify-between items-center font-roboto">
            {/* Logo */}
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img src={logo} alt="logo" />
                    </div>
                    <p className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-800 hover:to-purple-700 transition-all duration-500">Дикая природа</p>
                </Link>
            </div>
            {/* Desktop Links */}
            <nav className="hidden md:flex space-x-6">
                <Link to="/habitats" className="hover:text-gray-300 transition-colors duration-300">
                    Места обитания
                </Link>
                {isAuthenticated ? (
                    <>
                        <Link to="/animals" className="hover:text-gray-300 transition-colors duration-300">
                            Заявки
                        </Link>
                        {/* User dropdown */}
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 focus:outline-none ml-16"
                            >
                                <span className="hover:text-gray-300 transition-colors duration-300">
                                    {username}
                                </span>
                                <img
                                    src={user}
                                    alt="User Avatar"
                                    className="w-6 h-6 rounded-full"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-36 bg-gray-700 text-white rounded-lg shadow-lg">
                                    <Link
                                        to="/profile"
                                        className="block px-2 py-2 hover:bg-gray-600 transition-colors duration-300"
                                    >
                                        Личный кабинет
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-2 py-2 hover:bg-gray-600 transition-colors duration-300"
                                    >
                                        Выйти
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:text-blue-400 transition-colors duration-300">
                            Вход
                        </Link>
                        <Link to="/register" className="hover:text-blue-400 transition-colors duration-300">
                            Регистрация
                        </Link>
                    </>
                )}
            </nav>
            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
                <img src={menu} alt="menu" className="w-6 h-6" />
            </button>
            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-0 right-0 h-full w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full p-4">
                    <button className="self-start mb-7" onClick={toggleMenu}>
                        <img src={menu} alt="menu" className="w-6 h-6" />
                    </button>
                    {isAuthenticated ? (
                        <>
                            <Link to="/habitats" className="text-white mb-4 hover:text-blue-400 transition-colors">
                                Места обитания
                            </Link>
                            <Link to="/animals" className="text-white mb-4 hover:text-blue-400 transition-colors">
                                Заявки
                            </Link>
                            <Link to="/profile" className="text-white mb-4 hover:text-blue-400 transition-colors">
                                Личный кабинет
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-white hover:text-red-500 transition-colors"
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/habitats" className="hover:text-blue-400 transition-colors duration-300 mb-4">
                                Места обитания
                            </Link>
                            <Link to="/login" className="text-white mb-4 hover:text-blue-400 transition-colors">
                                Вход
                            </Link>
                            <Link to="/register" className="text-white hover:text-blue-400 transition-colors">
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
