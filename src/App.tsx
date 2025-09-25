import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectsPage from "@/pages/ProjectPage/ProjectsPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProjectsPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
