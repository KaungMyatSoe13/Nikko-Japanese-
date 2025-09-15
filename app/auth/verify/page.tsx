"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtpSchema } from "@/lib/utils/validation";
import { verifyOtp } from "@/lib/utils/auth-helpers";
import { set, z } from "zod";
import { useEffect } from "react";

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  type FormData = z.infer<typeof verifyOtpSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verificationEmail");
    if (!storedEmail) {
      router.push("/auth/signup");
      return;
    }

    const passwordResetFlag = sessionStorage.getItem("isPasswordReset");
    setIsPasswordReset(passwordResetFlag === "true");

    setEmail(storedEmail);
  }, [router]);

  const handleVerify = async (data: FormData) => {
    if (!email) {
      setError("Email not found. Please sign up again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyOtp(email, data.otp);
      sessionStorage.removeItem("verificationEmail");

      if (isPasswordReset) {
        router.push("/auth/new-password");
      } else {
        sessionStorage.removeItem("isPasswordReset");
        await fetch("/api/resend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "welcome",
            email: email,
            origin: window.location.origin,
          }),
        });
        router.push("/shop");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Verify Your Email
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Enter the 6-digit code we sent to your email
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              {...form.register("otp")} // Connect input to form
              type="text"
              maxLength={6}
              placeholder="Enter OTP"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-center tracking-widest text-lg"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Didn’t get the code?{" "}
            <button
              type="button"
              className="text-amber-600 hover:text-amber-700 font-medium"
              onClick={async () => {
                setError("");
                const res = await fetch("/api/resend", { method: "POST" });
                if (!res.ok) setError("Failed to resend OTP.");
              }}
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
