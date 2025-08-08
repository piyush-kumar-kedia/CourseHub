import React, { useState, useEffect } from "react";
import BrTable from "../components/brTable";
import UploadBRs from "../components/UploadBRs";
import { fetchBRs } from "@/apis/br";

export default function BranchRepresentatives() {
    const [brs, setBrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const loadBRs = async () => {
        try {
            setLoading(true);
            const response = await fetchBRs();
            setBrs(response.brs);
            setLoading(false);
        } catch (err) {
            setError(err.message || "An error occurred while fetching BRs.");
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBRs();
    }, []);

    const handleUploadSuccess = () => {
        setShowUploadModal(false);
        loadBRs();
    };

    return (
        <div className="p-6 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Branch Representatives</h1>
                        <p className="text-gray-600 mt-1">Manage and upload BR data</p>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                            onClick={() => setShowUploadModal(true)}
                        >
                            Upload BRs
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/60 p-6">
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
