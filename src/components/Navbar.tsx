import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="text-white py-4 px-6 flex justify-between items-center font-roboto">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-12 h-12">
                        <img src="http://127.0.0.1:9000/test/logo2.png" alt="logo"/>
                    </div>
                    <p className="hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-blue-800 hover:to-purple-700 transition-all duration-500">Дикая природа</p>
                </Link>
            </div>
            {/* Links */}
            <nav className="space-x-4">
                <Link to="/habitats" className="hover:text-gray-300">
                    Места обитания
                </Link>
                <Link to="/animals" className="pointer-events-none hover:text-gray-300">
                    Заявки
                </Link>
            </nav>
        </header>
    );
};

export default Navbar;