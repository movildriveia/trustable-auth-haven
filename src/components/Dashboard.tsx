
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import DashboardLayout from "./dashboard/DashboardLayout";
import DocumentsSection from "./dashboard/DocumentsSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        navigate("/login");
      }
    };
    
    checkAuth();
  }, [navigate, isAuthenticated]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-custom-dark">Panel de Control</h1>
        <DocumentsSection />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
