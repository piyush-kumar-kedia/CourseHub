import { API_BASE_URL } from "./server.js";

// Fetch all branch representatives
export const fetchBRs = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}api/br/allBRs`, {
            credentials: "include",
            headers: {
                Authorization: "Bearer admin-coursehub-cc23-golang",
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching BRs:", error);
        throw error;
    }
};
