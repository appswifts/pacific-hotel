import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Construction } from "lucide-react";

const isAuthed = () => localStorage.getItem("adminAuth") === "true";

export default function AdminStaff() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (!isAuthed()) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Staff</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage hotel staff members</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Construction className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Staff management is under development. This section will allow you to
            manage employees, roles, and permissions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
