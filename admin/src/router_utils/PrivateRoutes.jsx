import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdminSession } from "@/apis/auth";

export default function PrivateRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [ok, setOk] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const isOk = await checkAdminSession();
                if (mounted) setOk(isOk);
            } catch {
                if (mounted) setOk(false);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    if (loading) return null;
    if (!ok) return <Navigate to="/admin/login" replace />;
    return children;
}
