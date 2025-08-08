import React, { useState, useEffect } from "react";
import axios from "axios";
import BrTable from "../components/brTable";
import UploadBRs from "../components/UploadBRs";
import { API_BASE_URL } from "../apis";

export default function BranchRepresentatives() {
    const [brs, setBrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const fetchBRs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}api/br/allBRs`);
            setBrs(response.data.brs);
            setLoading(false);
        } catch (err) {
            setError(err.message || "An error occurred while fetching BRs.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBRs();
    }, []);

    const handleUploadSuccess = () => {
        setShowUploadModal(false);
        fetchBRs();
    };

    return (
        <div>
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">{/* Content moved to BrTable */}</div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            type="button"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => setShowUploadModal(true)}
                        >
                            Upload BRs
                        </button>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && <BrTable brs={brs} />}
            </div>
            {showUploadModal && (
                <UploadBRs
                    onUpload={handleUploadSuccess}
                    onClose={() => setShowUploadModal(false)}
                />
            )}
        </div>
    );
}
