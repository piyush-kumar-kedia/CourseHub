import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white">
            <div className="p-4 text-2xl font-bold">Admin</div>
            <nav>
                <ul>
                    <li className="p-4 hover:bg-gray-700">
                        <Link to="/br">Branch Representatives</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
