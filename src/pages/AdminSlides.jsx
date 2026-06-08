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
} from "@/components/ui/dialog";
import { Plus, Image, ArrowUp, ArrowDown } from "lucide-react";
import { ErrorBoundary } from "../components/ErrorBoundary";

const emptyForm = { image: "", title: "", subtitle: "" };

const isAuthed = () => localStorage.getItem("adminAuth") === "true";

function AdminSlidesInner() {
  const navigate = useNavigate();
  const slides = useQuery(api.slides.list);
  const createSlide = useMutation(api.slides.create);
  const updateSlide = useMutation(api.slides.update);
  const deleteSlide = useMutation(api.slides.remove);

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

  const openEdit = (slide) => {
    setEditing(slide._id);
    setForm({ image: slide.image, title: slide.title, subtitle: slide.subtitle });
    setDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      image: form.image,
      title: form.title,
      subtitle: form.subtitle,
    };
    if (editing) {
      await updateSlide({ id: editing, ...payload });
    } else {
      await createSlide(payload);
    }
    resetForm();
    setDialogOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this slide?")) return;
    await deleteSlide({ id });
  };

  const moveUp = (idx) => {
    if (idx <= 0 || !slides) return;
    const s = slides[idx];
    const above = slides[idx - 1];
    updateSlide({ id: s._id, order: above.order ?? idx - 1 });
    updateSlide({ id: above._id, order: s.order ?? idx });
  };

  const moveDown = (idx) => {
    if (!slides || idx >= slides.length - 1) return;
    const s = slides[idx];
    const below = slides[idx + 1];
    updateSlide({ id: s._id, order: below.order ?? idx + 1 });
    updateSlide({ id: below._id, order: s.order ?? idx });
  };

  const sorted = slides ? [...slides].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Homepage Slides</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {slides ? `${slides.length} slides` : "Loading..."}
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus /> Add Slide
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Slide" : "New Slide"}</DialogTitle>
              <DialogDescription>
                {editing ? "Update slide details below." : "Add a new homepage slideshow image."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required placeholder="https://images.unsplash.com/..." />
                {form.image && (
                  <div className="mt-2 aspect-[16/6] rounded-lg overflow-hidden bg-muted">
                    <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required placeholder="Your unforgettable experience" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subtitle</label>
                <Input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} required placeholder="starts upon arrival" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">{editing ? "Save Changes" : "Add Slide"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {slides === undefined ? (
        <Card><CardContent className="p-6 text-center text-sm text-muted-foreground">Loading slides...</CardContent></Card>
      ) : sorted.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-sm text-muted-foreground">No slides yet. Add your first homepage slide.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {sorted.map((slide, idx) => (
            <Card key={slide._id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-64 aspect-[16/6] sm:aspect-auto bg-muted shrink-0">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <div className="flex items-start gap-2">
                    <div className="flex flex-col gap-0.5 mr-2 mt-0.5">
                      <button onClick={() => moveUp(idx)} disabled={idx === 0} className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ArrowUp className="size-3.5" /></button>
                      <button onClick={() => moveDown(idx)} disabled={idx === sorted.length - 1} className="text-muted-foreground hover:text-foreground disabled:opacity-30"><ArrowDown className="size-3.5" /></button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{slide.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{slide.subtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-4 sm:border-l">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(slide)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(slide._id)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminSlides() {
  return (
    <ErrorBoundary fallback={
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          Could not load slides. Make sure Convex dev is running.
        </CardContent>
      </Card>
    }>
      <AdminSlidesInner />
    </ErrorBoundary>
  );
}
