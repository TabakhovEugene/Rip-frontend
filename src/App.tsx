import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.tsx';
import HabitatsPage from "./HabitatsPage.tsx";
import HabitatDescriptionPage from "./HabitatDescriptionPage.tsx";
import AnimalPage from "./AnimalPage.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/habitats" element={<HabitatsPage />} />
                <Route path="/habitats/:habitatId" element={<HabitatDescriptionPage />} />
                <Route path="/animal/:animalId" element={<AnimalPage />} />
            </Routes>
        </Router>
    );
}

export default App;
