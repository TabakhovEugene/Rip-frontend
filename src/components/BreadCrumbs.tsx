import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ path }) => {
    const paths = path.split('/').filter(Boolean);

    // Соответствие между путями и их читаемыми именами
    const pathNames = {
        habitats: 'Услуги',
        // Добавьте другие соответствия по мере необходимости
    };

    return (
        <nav className="flex items-center space-x-2 text-white ml-8 mt-5 font-roboto text-lg">
            <Link to="/" className="text-gray-300 hover:text-white">
                Главная
            </Link>
            {paths.map((segment, index) => (
                <React.Fragment key={index}>
                    <span>/</span>
                    {index === paths.length - 1 ? (
                        <span className="text-white">
                            {pathNames[segment] || segment}
                        </span>
                    ) : (
                        <Link
                            to={`/${paths.slice(0, index + 1).join('/')}`}
                            className="text-gray-300 hover:text-white"
                        >
                            {pathNames[segment] || segment}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumbs;
