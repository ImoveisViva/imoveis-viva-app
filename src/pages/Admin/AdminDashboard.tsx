import { useEffect } from "react";
import { useUser } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function AdminDashboard() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
            <Toaster />
          </main>
        </div>
      )}
    </>
  );
}
