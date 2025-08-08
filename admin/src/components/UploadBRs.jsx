import React, { useState } from "react";
import axios from "axios";

const UploadBRs = ({ onUpload, onClose }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("/api/br/updateList", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSuccess(response.data.message);
            setError(null);
            if (onUpload) {
                onUpload();
            }
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred during file upload.");
            setSuccess(null);
        }
    };

    const handleBackdropClick = (e) => {
        // Close modal when clicking on backdrop (not the modal content)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="p-8 border w-96 shadow-2xl rounded-lg bg-white relative transform transition-all duration-300 ease-out">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                >
                    ✕
                </button>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload BRs</h3>
                    <div className="mt-4 px-2 py-3">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                            />
                            <button
                                type="submit"
                                className="mt-6 px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors"
                            >
                                Upload
                            </button>
                        </form>
                        {error && (
                            <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        {success && (
                            <p className="mt-3 text-sm text-green-600 bg-green-50 p-2 rounded">
                                {success}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadBRs;
