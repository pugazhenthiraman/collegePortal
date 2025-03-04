"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

export default function AdminLoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setErrorMessage("");
    
    // Simulated login logic (Replace this with API authentication)
    setTimeout(() => {
      if (data.email === "admin@saas.com" && data.password === "admin123") {
        router.push("/admin/adminhome"); // ✅ Redirect to Admin Home
      } else {
        setErrorMessage("Invalid email or password");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-gray-100 flex items-center justify-center">
      <div className="min-h-screen w-full flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-gray-300">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Admin <span className="text-indigo-600">Login</span>
          </h2>

          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Password Field */}
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg shadow-md transition-all hover:scale-[1.02] ${
                loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
