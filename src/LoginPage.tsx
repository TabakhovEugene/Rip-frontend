import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice'; // Import login action
import Cookie from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/logo2.png'; // Add logo import

const LoginPage = () => {
    const [username, setUsername] = useState(''); // Username state
    const [password, setPassword] = useState(''); // Password state
    const [error, setError] = useState(''); // Error state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            Cookie.remove('csrftoken');
            Cookie.remove('sessionid');
            const response = await fetch('/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }), // Send username and password
            });

            if (response.ok) {
                const data = await response.json();
                let is_staff = false;
                if (data.staff === true) {
                    is_staff = true;
                }

                // After successful login, pass username to Redux
                dispatch(login({ username, is_staff }));
                navigate('/habitats'); // Redirect to habitats page
            } else {
                setError('Неверное имя пользователя или пароль'); // Error message
            }
        } catch (error) {
            console.error('Ошибка при входе:', error);
            alert('Ошибка при входе. Пожалуйста, попробуйте позже.');
        }
    };

    return (
        <div className="h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-purple-700 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {/* Logo centered at the top */}
                <div className="flex justify-center mb-6">
                    <Link to="/"><img src={logo} alt="Logo" className="w-24 h-24" /></Link> {/* Adjust size as needed */}
                </div>

                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Войти</h2>

                {/* Error message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Имя пользователя</label>
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
                        Войти
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Нет аккаунта?{' '}
                        <Link to="/register" className="text-purple-600 hover:underline">Регистрация</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
