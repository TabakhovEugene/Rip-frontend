import Navbar from "./components/Navbar.tsx";

function HomePage() {
    return (
        <div className="w-full h-screen bg-cover bg-center bg-[url('./assets/background.jpg')] flex flex-col">
            {/* Header */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h2 className="shadow-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-400 text-4xl font-bold mb-4">Дикая природа</h2>
                <p className="text-white mb-6 max-w-md">
                    Исследуйте природные заповедники, редкие экосистемы и места обитания дикой природы, чтобы лучше понять и сохранить наше природное наследие.
                </p>
                {/*<div className="space-x-4">*/}
                {/*    <Link*/}
                {/*        to="/habitats"*/}
                {/*        className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"*/}
                {/*    >*/}
                {/*        Места обитания*/}
                {/*    </Link>*/}
                {/*    <Link*/}
                {/*        to={`/animals`}*/}
                {/*        className="pointer-events-none px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"*/}
                {/*    >*/}
                {/*        Сформированные заявки*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </main>
        </div>
    );
}

export default HomePage;