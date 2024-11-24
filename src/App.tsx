import {Routes, Route, BrowserRouter} from 'react-router-dom';
import HomePage from './HomePage.tsx';
import HabitatsPage from "./HabitatsPage.tsx";
import HabitatDescriptionPage from "./HabitatDescriptionPage.tsx";
import {useEffect} from "react";
// import {useEffect} from "react";
// import AnimalPage from "./AnimalPage.tsx";


function App() {
    // useEffect(() => {
    //     // Check if we're in a Tauri environment
    //     if (window.__TAURI__) {
    //         const { invoke } = window.__TAURI__.tauri;
    //
    //         invoke('tauri', { cmd: 'create' })
    //             .then((response: any) => console.log(response))
    //             .catch((error: any) => console.log(error));
    //
    //         return () => {
    //             invoke('tauri', { cmd: 'close' })
    //                 .then((response: any) => console.log(response))
    //                 .catch((error: any) => console.log(error));
    //         };
    //     }
    // }, []);

    return (
        <BrowserRouter basename="/Rip-frontend">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/habitats" element={<HabitatsPage />} />
                <Route path="/habitats/:habitatId" element={<HabitatDescriptionPage />} />
                {/*<Route path="/animal/:animalId" element={<AnimalPage />} />*/}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
