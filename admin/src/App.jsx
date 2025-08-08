import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BranchRepresentatives from "./pages/BranchRepresentatives";
import Courses from "./pages/Courses";

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="mx-auto flex">
                    <Sidebar />
                    <main className="flex-1 min-h-screen">
                        <Routes>
                            <Route path="/admin/" element={<BranchRepresentatives />} />
                            <Route path="/admin/courses" element={<Courses />} />
                            <Route
                                path="*"
                                element={
                                    <div className="p-10">
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-10">
                                            Page Not Found
                                        </div>
                                    </div>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
