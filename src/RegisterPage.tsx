import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice'; // Импортируем экшн для авторизации
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo2.png'; // Add logo import

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Error state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(login({ username: data.username, is_staff: false })); // Авторизуем пользователя после регистрации
                navigate('/login'); // Перенаправляем на страницу входа
            } else {
                setError('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
                alert('Ошибка регистрации. Пожалуйста, проверьте введенные данные.');
            }
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка при регистрации. Пожалуйста, попробуйте позже.');
        }
    };

    return (
        <div
            className="h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Логотип в центре */}
                <div className="flex justify-center mb-6">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="w-24 h-24"/>
                    </Link>
                </div>

                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Регистрация</h2>

                {/* Ошибка (если есть) */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Электронная
                            почта</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Введите электронную почту"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Имя
                            пользователя</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Введите имя пользователя"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Введите пароль"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Зарегистрироваться
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Уже есть аккаунт?{' '}
                        <Link to="/login" className="text-purple-600 hover:underline">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;