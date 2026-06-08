import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";

const emptyForm = {
  name: "", description: "", price: "", size: "", capacity: 2,
  image: "", features: "", gallery: "",
};

const isAuthed = () => localStorage.getItem("adminAuth") === "true";

export default function AdminRooms() {
  const navigate = useNavigate();
  const rooms = useQuery(api.rooms.list);
  const createRoom = useMutation(api.rooms.create);
  const updateRoom = useMutation(api.rooms.update);
  const deleteRoom = useMutation(api.rooms.remove);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!isAuthed()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (!isAuthed()) return null;

  const resetForm = () => { setForm(emptyForm); setEditing(null); };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (room) => {
    setEditing(room._id);
    setForm({
      name: room.name, description: room.description, price: String(room.price),
      size: room.size, capacity: room.capacity, image: room.image,
      features: (room.features || []).join(", "),
      gallery: (room.gallery || []).join(", "),
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name, description: form.description, price: Number(form.price),
      size: form.size, capacity: Number(form.capacity), image: form.image,
      features: form.features.split(",").map((s) => s.trim()).filter(Boolean),
      gallery: form.gallery
        ? form.gallery.split(",").map((s) => s.trim()).filter(Boolean)
        : undefined,
    };
    if (editing) {
      await updateRoom({ id: editing, ...payload });
    } else {
      await createRoom(payload);
    }
    resetForm();
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    await deleteRoom({ id });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Rooms</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {rooms ? `${rooms.length} rooms` : "Loading..."}
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus /> Add Room
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Room" : "New Room"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update room details below." : "Fill in the details for the new room."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full min-h-[80px] rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price/night</label>
                  <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Size</label>
                  <Input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} required placeholder="45 m²" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Capacity</label>
                  <Input type="number" min="1" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gallery URLs (comma-separated)</label>
                <Input value={form.gallery} onChange={(e) => setForm({ ...form, gallery: e.target.value })} placeholder="Optional" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Features (comma-separated)</label>
                <Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} required placeholder="King Bed, Ocean View, WiFi" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editing ? "Save Changes" : "Create Room"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {rooms === undefined ? (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            Loading rooms...
          </CardContent>
        </Card>
      ) : rooms.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            No rooms yet. Add your first room.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room._id} className="overflow-hidden">
              <div className="aspect-[16/9] bg-muted overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription>
                      {room.size} &middot; Up to {room.capacity} guests
                    </CardDescription>
                  </div>
                  <div className="text-lg font-bold shrink-0">
                    ${room.price}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {(room.features || []).slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                  {room.features.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{room.features.length - 3} more
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t p-3 justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => openEdit(room)}>
                  <Edit /> Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(room._id)}>
                  <Trash2 /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
