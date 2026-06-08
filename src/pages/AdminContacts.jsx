import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Mail, Construction } from "lucide-react";

const isAuthed = () => localStorage.getItem("adminAuth") === "true";

export default function AdminContacts() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthed()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (!isAuthed()) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contacts</h1>
        <p className="text-sm text-muted-foreground mt-1">User inquiries and messages</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <Construction className="size-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Contact management is under development. This section will allow you to
            view and respond to guest inquiries.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
