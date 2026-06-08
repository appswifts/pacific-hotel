import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarCheck,
  DoorOpen,
  Users,
  Mail,
  Image,
  LogOut,
  ExternalLink,
  Hotel,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/rooms", label: "Rooms", icon: DoorOpen },
  { to: "/admin/slides", label: "Slides", icon: Image },
  { to: "/admin/staff", label: "Staff", icon: Users },
  { to: "/admin/contacts", label: "Contacts", icon: Mail },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("adminEmail") || "";

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

  const isActive = (item) => {
    if (item.end) return location.pathname === item.to;
    return location.pathname.startsWith(item.to);
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar variant="inset" collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" render={<Link to="/admin" />}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Hotel className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Pacific Hotel</span>
                    <span className="truncate text-xs">Administration</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton
                        render={<Link to={item.to} />}
                        isActive={isActive(item)}
                        tooltip={item.label}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarSeparator />
            <SidebarMenu>
              <SidebarMenuItem>
              <SidebarMenuButton render={<a href="/" target="_blank" rel="noopener noreferrer" />} tooltip="View Site">
                <ExternalLink />
                <span>View Site</span>
              </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="p-2 text-xs text-muted-foreground truncate">{email}</div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 bg-background">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
            <span className="text-xs text-muted-foreground hidden sm:inline">{email}</span>
          </header>
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
