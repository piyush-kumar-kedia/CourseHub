import { API_BASE_URL } from "./server.js";

export async function adminLogin({ userId, password }) {
    const res = await fetch(`${API_BASE_URL}api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
}

export async function adminLogout() {
    const res = await fetch(`${API_BASE_URL}api/admin/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
    return res.json();
}

export async function checkAdminSession() {
    const res = await fetch(`${API_BASE_URL}api/admin/`, {
        credentials: "include",
        headers: { Authorization: "Bearer admin-coursehub-cc23-golang" },
    });
    // Even though server uses middleware isAdmin with JWT, some older routes may still accept header; cookie is primary.
    return res.ok;
}
