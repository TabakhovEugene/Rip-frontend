import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo2.png';
import menu from '../assets/menu2.png';

const Navbar = () => {
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
                <Link to="/habitats" className="hover:text-gray-300">
                    Места обитания
                </Link>
                <Link to="/animals" className="pointer-events-none hover:text-gray-300">
                    Заявки
                </Link>
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
                    <Link to="/habitats" className="block py-2 hover:text-gray-300">
                        Места обитания
                    </Link>
                    <span className="cursor-not-allowed pointer-events-none block py-2 hover:text-gray-300">
                        Заявки
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
