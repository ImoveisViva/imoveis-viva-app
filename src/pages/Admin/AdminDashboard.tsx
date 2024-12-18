import { useEffect } from "react";
import { useUser } from "@/context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { user, authChecked } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authChecked && !user) {
      navigate('/login');
    }
  }, [user, authChecked, navigate]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {user && (
        <div className="flex h-screen animate-fadeIn">
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