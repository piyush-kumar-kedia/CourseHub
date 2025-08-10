import React, { useState } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "./ui/modal";
import { uploadBRs } from "../apis/br";

const UploadBRs = ({ onUpload, onClose }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [warnings, setWarnings] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        // Clear previous messages when new file is selected
        setError(null);
        setSuccess(null);
        setWarnings(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        // Validate file type
        if (!file.name.toLowerCase().endsWith(".csv")) {
            setError("Please upload a CSV file.");
            return;
        }

        try {
            const response = await uploadBRs(file);
            setSuccess(response.message);
            setError(null);
            setWarnings(null);
            if (onUpload) {
                onUpload();
            }
        } catch (err) {
            // Handle partial success (409 status)
            if (err.existingEmails || err.notInUsers) {
                let warningMessage = "";
                if (err.existingEmails && err.existingEmails.length > 0) {
                    warningMessage += `Already existing BRs: ${err.existingEmails.join(", ")}. `;
                }
                if (err.notInUsers && err.notInUsers.length > 0) {
                    warningMessage += `Emails not found in users: ${err.notInUsers.join(", ")}.`;
                }
                setWarnings(warningMessage);
                setError(null);
                setSuccess("Partial upload completed.");
                if (onUpload) {
                    onUpload();
                }
            } else {
                setError(err.error || err.message || "An error occurred during file upload.");
                setSuccess(null);
                setWarnings(null);
            }
        }
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <ModalHeader>Upload BRs</ModalHeader>
            <ModalCloseButton onClose={onClose} />
            <ModalBody>
                <p className="text-sm text-gray-600 mb-4">
                    Upload a CSV file to update the BR list. The CSV should have one column named
                    "email".
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="file"
                        accept=".csv"
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
                {warnings && (
                    <p className="mt-3 text-sm text-yellow-600 bg-yellow-50 p-2 rounded shadow-sm">
                        <strong>Warning:</strong> {warnings}
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
