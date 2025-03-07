
import React from "react";
import AuthLayout from "@/components/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
import { Toaster } from "@/components/ui/toaster";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
      <Toaster />
    </AuthLayout>
  );
};

export default RegisterPage;
