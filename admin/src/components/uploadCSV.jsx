import React, { useState } from "react";
import { Upload, Mail, FileText, CheckCircle, XCircle, Download } from "lucide-react";
import Papa from "papaparse";
import axios from "axios";
import { API_BASE_URL } from "../apis";

export default function CSVEmailPortal() {
    const [emails, setEmails] = useState([]);
    const [fileName, setFileName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        error: "",
        existingBRs: "",
        notInUsers: "",
    });
    const [validEmails, setValidEmails] = useState([]);
    const [invalidEmails, setInvalidEmails] = useState([]);
    const [showAnalysis, setShowAnalysis] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email?.trim());
    };

    const updateBRs = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}api/br/updateList`, {
                emails: validEmails || [],
            });

            console.log(response.data);
            setShowAnalysis(false);
            alert("Updated Successfully");
            return response.data;
        } catch (error) {
            console.log("Error updating BRs:", error);
            // alert('Error Updating');

            if (error.response) {
                // Backend responded with a non-2xx status
                console.error("Response error:", error.response.data);
                setError({
                    error: error.response.data.error,
                    existingBRs: error.response.data.existingEmails,
                    notInUsers: error.response.data.notInUsers,
                });
            } else if (error.request) {
                // Request made but no response received
                console.error("No response received:", error.request);
            } else {
                // Something else happened
                console.error("Axios error:", error.message);
            }
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith(".csv")) {
            setError("Please upload a CSV file");
            return;
        }

        setIsLoading(true);
        setError("");
        setFileName(file.name);

        Papa.parse(file, {
            complete: (results) => {
                try {
                    const allEmails = [];
                    const valid = [];
                    const invalid = [];

                    results.data.forEach((row, index) => {
                        // Handle different CSV structures
                        const rowEmails = Object.values(row).filter(
                            (value) => value && typeof value === "string" && value.includes("@")
                        );

                        rowEmails.forEach((email) => {
                            const cleanEmail = email.trim();
                            if (cleanEmail) {
                                allEmails.push({ email: cleanEmail, row: index + 1 });
                                if (validateEmail(cleanEmail)) {
                                    valid.push({ email: cleanEmail, row: index + 1 });
                                } else {
                                    invalid.push({ email: cleanEmail, row: index + 1 });
                                }
                            }
                        });
                    });

                    setEmails(allEmails);
                    setValidEmails(valid);
                    setInvalidEmails(invalid);
                    setShowAnalysis(true);
                } catch (err) {
                    console.error("Error parsing CSV file:", err);
                    setError("Error parsing CSV file");
                }
                setIsLoading(false);
            },
            error: (error) => {
                setError("Error reading file: " + error.message);
                setIsLoading(false);
            },
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
        });
    };

    const resetUpload = () => {
        setEmails([]);
        setValidEmails([]);
        setInvalidEmails([]);
        setFileName("");
        setError("");
        document.getElementById("csvFile").value = "";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Mail className="w-12 h-12 text-blue-600 mr-3" />
                        <h1 className="text-4xl font-bold text-gray-800">
                            BRs Email Uploading Portal
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Upload CSV file to extract and validate email addresses
                    </p>
                </div>

                {/* Upload Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                        <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            Upload CSV File
                        </h3>

                        <input
                            id="csvFile"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
                        />

                        <label
                            htmlFor="csvFile"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                        >
                            <FileText className="w-5 h-5 mr-2" />
                            Choose CSV File
                        </label>

                        {fileName && (
                            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                                <p className="text-sm text-gray-600">
                                    Selected: <span className="font-medium">{fileName}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {isLoading && (
                        <div className="mt-4 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="text-gray-600 mt-2">Processing file...</p>
                        </div>
                    )}

                    {error.error && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
                            <div className="flex items-center">
                                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                                <p className="text-red-700">
                                    Error: {error.error}
                                    <br />
                                    Already BR: {error.existingBRs}
                                    <br />
                                    Email not listed: {error.notInUsers}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {emails.length > 0 && showAnalysis && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Email Analysis Results
                            </h2>
                            <button
                                onClick={resetUpload}
                                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                Upload New File
                            </button>
                        </div>

                        {/* Summary Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-gray-800">
                                    {emails.length}
                                </div>
                                <div className="text-gray-600">Total Emails Found</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-green-600">
                                    {validEmails.length}
                                </div>
                                <div className="text-gray-600">Valid Emails</div>
                            </div>
                            <div className="bg-red-50 rounded-lg p-4 text-center">
                                <div className="text-3xl font-bold text-red-600">
                                    {invalidEmails.length}
                                </div>
                                <div className="text-gray-600">Invalid Emails</div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {validEmails.length > 0 && (
                            <div className="mb-6">
                                <button
                                    onClick={updateBRs}
                                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Update
                                </button>
                            </div>
                        )}

                        {/* Email Lists */}
                        <div className="space-y-6">
                            {/* Valid Emails */}
                            {validEmails.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Valid Emails ({validEmails.length})
                                    </h3>
                                    <div className="bg-green-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                                        <div className="space-y-2">
                                            {validEmails.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-white p-2 rounded border"
                                                >
                                                    <span className="text-green-700 font-mono">
                                                        {item.email}
                                                    </span>
                                                    {/* <span className="text-xs text-gray-500">Row {item.row}</span> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Invalid Emails */}
                            {invalidEmails.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                                        <XCircle className="w-5 h-5 mr-2" />
                                        Invalid Emails ({invalidEmails.length})
                                    </h3>
                                    <div className="bg-red-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                                        <div className="space-y-2">
                                            {invalidEmails.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-white p-2 rounded border"
                                                >
                                                    <span className="text-red-700 font-mono">
                                                        {item.email}
                                                    </span>
                                                    {/* <span className="text-xs text-gray-500">Row {item.row}</span> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
