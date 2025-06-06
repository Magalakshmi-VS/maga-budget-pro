
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignup && !showOtp) {
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive"
        });
        return;
      }
      setShowOtp(true);
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code",
      });
      return;
    }

    if (isSignup && showOtp) {
      if (otp === "123456") {
        toast({
          title: "Account Created",
          description: "Welcome to MAGA BUDGET PRO!",
        });
        onLogin();
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct verification code",
          variant: "destructive"
        });
      }
      return;
    }

    // Login logic
    if (email && password) {
      toast({
        title: "Login Successful",
        description: "Welcome back to MAGA BUDGET PRO!",
      });
      onLogin();
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Social Login",
      description: `Logging in with ${provider}...`,
    });
    setTimeout(() => onLogin(), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            MAGA BUDGET PRO
          </CardTitle>
          <CardDescription>
            {isSignup ? "Create your account" : "Welcome back! Please sign in"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {showOtp && (
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <p className="text-sm text-gray-600">Use: 123456 for demo</p>
              </div>
            )}

            <Button type="submit" className="w-full">
              {isSignup ? (showOtp ? "Verify & Create Account" : "Send OTP") : "Sign In"}
            </Button>
          </form>

          {!showOtp && (
            <>
              

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignup(!isSignup);
                    setShowOtp(false);
                    setOtp("");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  {isSignup ? "Already have an account? Sign in" : "Need an account? Sign up"}
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
