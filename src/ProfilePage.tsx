import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import Navbar from './components/Navbar';
import BreadCrumbs from './components/BreadCrumbs';
import axios from 'axios';
import Cookies from 'js-cookie';
import logo from './assets/logo2.png';
import user from './assets/user.png';

const ProfilePage = () => {
    const { username, isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = Cookies.get('csrftoken');
            const data = {};

            if (email) data.email = email;
            if (password) data.password = password;

            if (Object.keys(data).length === 0) {
                setError('Необходимо ввести хотя бы один параметр для обновления.');
                setSuccess('');
                return;
            }

            const response = await axios.put('/api/profile/', data, {
                headers: {
                    'X-CSRFToken': csrfToken,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setSuccess('Профиль обновлен успешно');
                setError('');
                dispatch(logout());
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            setError('Ошибка при обновлении данных профиля');
            setSuccess('');
        }
    };

    return (
        <div className="min-h-screen bg-[#060F1E] text-gray-200">
            <Navbar />

            <BreadCrumbs path="/profile" />

            <div className="container mx-auto mt-8 px-4">
                <div className="flex items-center gap-6">
                    <img src={user} alt="User Avatar" className="h-24 w-24 rounded-full border-4 border-gray-300" />
                    <h2 className="text-2xl font-semibold">Добро пожаловать, {username || 'Пользователь'}!</h2>
                </div>

                <form onSubmit={handleProfileUpdate} className="mt-8 bg-[#1A1D2B] p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Обновление профиля</h3>

                    {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}
                    {success && <div className="bg-green-500 text-white p-3 rounded mb-4">{success}</div>}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Новый Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-[#2C2F3B] text-gray-200 rounded focus:ring focus:ring-blue-500"
                            placeholder="Введите новый email"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                            Новый пароль
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 bg-[#2C2F3B] text-gray-200 rounded focus:ring focus:ring-blue-500"
                            placeholder="Введите новый пароль"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Обновить профиль
                    </button>
                </form>

                <div className="mt-6">
                    <Link
                        to="/login"
                        onClick={() => dispatch(logout())}
                        className="text-red-500 hover:underline"
                    >
                        Выйти из аккаунта
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
