import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hotel } from "lucide-react";

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "admin@pacifichotel.com";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("adminAuth") === "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid email or password");
      return;
    }
    localStorage.setItem("adminAuth", "true");
    localStorage.setItem("adminEmail", email);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Hotel className="size-6" />
            </div>
          </div>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Pacific Hotel Management</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@pacifichotel.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Button variant="link" onClick={() => navigate("/")}>
              &larr; Back to website
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
