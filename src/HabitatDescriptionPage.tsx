import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.tsx";
import BreadCrumbs from "./components/BreadCrumbs.tsx";
import euro from './assets/Евразия.jpg';
import afro from './assets/Африка.jpg';
import aust from './assets/Австралия.jpg';

interface Habitat {
    id: number;
    title: string;
    description: string;
    picture_url: string;
}

const mockHabitats: Habitat[] = [
    { id: 1, title: 'Евразия',
        description: 'Животный мир самого большого материка Земли уникален и разнообразен. Площадь Евразии составляет 54 млн. м². Обширная территория проходит через все географические пояса нашей планеты, поэтому в этом регионе можно встретить самые непохожие друг на друга виды животных. Одной из крупных составляющих материка является тайга, в которой можно встретить медведей, рысей, белок, росомах и других представителей биологических организмов. В горах обитают бурые медведи, а среди лесной фауны выделяются благородный олень, зубр, лисица, косуля и другие. В естественных водоемах можно найти большое количество разнообразной рыбы, в том числе, щуку, плотву, карпов и сомов.',
        picture_url: euro },
    { id: 2, title: 'Африка',
        description: 'Климат Африки, расположенной в зоне повышенной освещённости и обласканной щедрыми лучами солнца, весьма благоприятствует обитанию на его территории самых разнообразных форм жизни. Именно поэтому фауна континента чрезвычайно богата, а про животных Африки ходит множество замечательных легенд и удивительных историй. Для сохранения фауны в Африке были созданы крупнейшие национальные и природные парки, заповедники и заказники. Их численность на планете самая большая именно здесь. В зависимости от погодно-климатических условий на материке сформировались различные природные зоны: пустыни и полупустыни, саванны, джунгли, экваториальные леса. В разных уголках континента проживают хищники и крупные копытные животные, грызуны и птицы, змеи и ящерицы, насекомые, а в реках водятся крокодилы и рыбы. Здесь обитает огромное количество разных видов обезьян.',
        picture_url: afro },
    { id: 3, title: 'Австралия',
        description: 'Когда речь заходит о животном мире Австралии, сразу вспоминается кенгуру. Это животное действительно является, своего рода, символом данного материка и даже присутствует на государственном гербе. Но, помимо разнообразных кенгуру, в австралийскую фауну входят еще около 200000 живых существ. Поскольку материк отличается сравнительно небольшими размерами и расположен вдалеке от «большой земли», большинство животных, птиц и насекомых являются эндемиками. Здесь широко представлены древесные и прыгающие животные, ящерицы и змеи. Также разнообразен птичий мир.',
        picture_url: aust },
];

const HabitatDescriptionPage = () => {
    const { habitatId } = useParams();
    const [habitat, setHabitat] = useState<Habitat | null>(null);
    const [loading, setLoading] = useState(true); // Для отображения состояния загрузки
    const [error, setError] = useState(""); // Для обработки ошибок
    const [showFullDescription, setShowFullDescription] = useState(false); // Для отображения полного описания

    const fetchHabitat = async () => {
        try {
            const response = await fetch(`/api/habitats/${habitatId}/`);
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }

            const habitatData: Habitat = await response.json();
            setHabitat(habitatData);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            // Если произошла ошибка, используем мок-данные
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const mockHabitat = mockHabitats.find(item => item.id === parseInt(habitatId, 10));

            if (mockHabitat) {
                setHabitat(mockHabitat);
            } else {
                setError('Место обитания не найдено');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabitat();
    }, [habitatId]);

    // Обработка состояния загрузки и ошибок
    if (loading) {
        return <div className="text-center my-5">Загрузка данных места обитания...</div>;
    }

    if (error) {
        return <div className="text-danger text-center my-5">Ошибка: {error}</div>;
    }

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


    return (
        <div className="bg-[#060F1E] font-roboto min-h-screen">
            <Navbar />
            <BreadCrumbs path={`/habitats/${habitat?.title }`} />
            <div className="font-roboto text-white ml-8 mt-12">
                <h1 className="text-2xl font-bold md:text-4xl">Информация о континенте: {habitat?.title}</h1>
                <div className="max-w-3xl mt-5 mr-7">
                    <img
                        className="w-44 h-28 md:w-64 md:h-48 rounded-lg float-right ml-2.5"
                        src={habitat?.picture_url}
                        alt={habitat?.title}
                    />
                    <p className="w-full text-md md:text-xl">
                        {showFullDescription || !window.matchMedia("(max-width: 640px)").matches ? habitat?.description : `${habitat?.description.slice(0, 150)}...`}
                        {!showFullDescription && window.matchMedia("(max-width: 640px)").matches && (
                            <button onClick={toggleDescription} className="text-blue-500 hover:underline">
                                Показать больше
                            </button>
                        )}
                        {showFullDescription && window.matchMedia("(max-width: 640px)").matches && (
                            <button onClick={toggleDescription} className="text-blue-500 hover:underline">
                                Скрыть
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HabitatDescriptionPage;
