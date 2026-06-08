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
import { CalendarCheck, DollarSign, Users, DoorOpen } from "lucide-react";

const isAuthed = () => localStorage.getItem("adminAuth") === "true";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const bookings = useQuery(api.bookings.list);
  const rooms = useQuery(api.rooms.list);

  useEffect(() => {
    if (!isAuthed()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (!isAuthed()) return null;

  const totalRevenue = bookings
    ? bookings.reduce((sum, b) => sum + (b.total || 0), 0)
    : 0;
  const totalGuests = bookings
    ? bookings.reduce((sum, b) => sum + (b.guests || 0), 0)
    : 0;

  const stats = [
    {
      title: "Total Bookings",
      value: bookings?.length ?? "...",
      icon: CalendarCheck,
    },
    {
      title: "Total Revenue",
      value: bookings ? `$${totalRevenue.toLocaleString()}` : "...",
      icon: DollarSign,
    },
    {
      title: "Total Guests",
      value: bookings ? totalGuests.toLocaleString() : "...",
      icon: Users,
    },
    {
      title: "Active Rooms",
      value: rooms?.length ?? "...",
      icon: DoorOpen,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your hotel operations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {bookings === undefined ? (
            <div className="p-6 text-center text-sm text-muted-foreground">Loading...</div>
          ) : bookings.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No bookings yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.slice(0, 10).map((b) => (
                  <TableRow key={b._id}>
                    <TableCell className="font-medium">{b.name}</TableCell>
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
