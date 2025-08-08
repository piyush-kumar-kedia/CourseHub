import React, { useState } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "./ui/modal";

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

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalHeader>Upload BRs</ModalHeader>
            <ModalCloseButton onClose={onClose} />
            <ModalBody>
                <p className="text-sm text-gray-600 mb-4">
                    Upload a CSV file to update the BR list.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-colors"
                    />
                    <button
                        type="submit"
                        className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-base font-medium rounded-md w-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                    >
                        Upload
                    </button>
                </form>
                {error && (
                    <p className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded shadow-sm">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="mt-3 text-sm text-green-600 bg-green-50 p-2 rounded shadow-sm">
                        {success}
                    </p>
                )}
            </ModalBody>
            <ModalFooter>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
                >
                    Close
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default UploadBRs;
