import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { signUpWithEmail, UserMetadata } from "@/lib/supabase";

const signupSchema = z
  .object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);

    try {
      console.log("Registering user:", { email: data.email, name: data.fullName });
      
      // Prepare user metadata
      const userMetadata: UserMetadata = {
        full_name: data.fullName,
        email: data.email,
        // Parse first and last name from full name
        first_name: data.fullName.split(" ")[0],
        last_name: data.fullName.split(" ").slice(1).join(" ") || undefined,
        created_at: new Date().toISOString(),
      };
      
      const { data: userData, error } = await signUpWithEmail(
        data.email, 
        data.password, 
        userMetadata
      );
      
      console.log("Registration response:", { userData, error });
      
      if (error) {
        console.error("Registration error details:", error);
        throw error;
      }
      
      setIsSuccess(true);
      
      toast({
        title: "Registration successful",
        description: "We've sent a confirmation email. Please check your inbox.",
        variant: "default",
      });
      
    } catch (error) {
      console.error("Registration error:", error);
      
      // More descriptive error message based on the error
      let errorMessage = "An error occurred, please try again";
      
      if (error.message === "User already registered") {
        errorMessage = "This email is already registered";
      } else if (error.message?.includes("database") || error.code === "23505") {
        errorMessage = "Database error when creating your account. Please try again later.";
      }
      
      toast({
        title: "Registration error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Verify your email</h1>
          <p className="text-muted-foreground">
            We've sent a confirmation link to your email.
            <br />Please check your email to activate your account.
          </p>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button variant="outline" className="gap-2" onClick={() => navigate("/login")}>
            <Mail className="h-4 w-4" />
            Go to login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Create an account</h1>
        <p className="text-muted-foreground">
          Sign up to access all features
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="startNow" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" onClick={() => navigate("/login")} className="p-0">
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
