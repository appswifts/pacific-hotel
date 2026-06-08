import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const isAuthed = () => localStorage.getItem("adminAuth") === "true";

export default function AdminBookings() {
  const navigate = useNavigate();
  const bookings = useQuery(api.bookings.list);

  useEffect(() => {
    if (!isAuthed()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (!isAuthed()) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {bookings ? `${bookings.length} total bookings` : "Loading..."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {bookings === undefined ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No bookings found.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b._id}>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell>{b.email}</TableCell>
                    <TableCell>{b.phone}</TableCell>
                    <TableCell>{b.roomName}</TableCell>
                    <TableCell>{b.checkIn}</TableCell>
                    <TableCell>{b.checkOut}</TableCell>
                    <TableCell>{b.guests}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${b.total?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
