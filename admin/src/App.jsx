import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BranchRepresentatives from "./pages/BranchRepresentatives";

function App() {
    return (
        <Router>
            <div className="flex">
                <Sidebar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/admin/br" element={<BranchRepresentatives />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
