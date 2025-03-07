
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, AlertCircle } from "lucide-react";
import { signInWithEmail } from "@/lib/supabase";

const loginSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setEmailNotConfirmed(false);

    try {
      const { data: userData, error } = await signInWithEmail(data.email, data.password);
      
      if (error) {
        // Verificamos si el error es por email no confirmado
        if (error.message === "Email not confirmed") {
          setEmailNotConfirmed(true);
          throw new Error("Email not confirmed");
        }
        throw error;
      }
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo al dashboard...",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
      // Manejo específico para email no confirmado
      if (error.message === "Email not confirmed") {
        toast({
          title: "Email no confirmado",
          description: "Por favor confirma tu correo electrónico para poder iniciar sesión",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error al iniciar sesión",
          description: "Por favor verifica tus credenciales e intenta nuevamente",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Iniciar Sesión</h1>
        <p className="text-muted-foreground">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      {emailNotConfirmed && (
        <div className="mb-6 p-4 border border-amber-200 bg-amber-50 rounded-md flex items-start">
          <AlertCircle className="text-amber-500 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Correo no verificado</h3>
            <p className="text-sm text-amber-700 mt-1">
              Por favor verifica tu correo electrónico para poder iniciar sesión. Revisa tu bandeja de entrada.
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Button variant="link" onClick={() => navigate("/register")} className="p-0">
            Regístrate
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
