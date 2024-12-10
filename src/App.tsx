import {Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './HomePage.tsx';
import HabitatsPage from "./HabitatsPage.tsx";
import HabitatDescriptionPage from "./HabitatDescriptionPage.tsx";
import AnimalPage from "./AnimalPage.tsx";
import AnimalsHistoryPage from "./AnimalsHistoryPage.tsx";
import LoginPage from "./LoginPage.tsx";
import RegisterPage from "./RegisterPage.tsx";
import ProfilePage from "./ProfilePage.tsx";
import {useEffect} from "react";

function App() {
    useEffect(() => {
        // Check if we're in a Tauri environment
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (window.__TAURI__) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const { invoke } = window.__TAURI__.tauri;

            invoke('tauri', { cmd: 'create' })
                .then((response: never) => console.log(response))
                .catch((error: never) => console.log(error));

            return () => {
                invoke('tauri', { cmd: 'close' })
                    .then((response: never) => console.log(response))
                    .catch((error: never) => console.log(error));
            };
        }

    }, []);

    return (
        <BrowserRouter basename="/animals-frontend">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/habitats" element={<HabitatsPage />} />
                <Route path="/habitats/:habitatId" element={<HabitatDescriptionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/animal/:animalId" element={<AnimalPage />} />
                <Route path="/animals" element={<AnimalsHistoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
