import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileBarChart, Users, LogOut, Wallet, Package, UsersRound, Settings, CalendarCheck, Menu, X, ShieldAlert, UserCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [rawRole, setRawRole] = useState("");
  const [hrProfile, setHrProfile] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserRole(user.role || "user");
      setUserName(user.name || user.id);
      setUserId(user.id || "");
      setRawRole(user.rawRole || user.role || "user");
    }
  }, []);

  useEffect(() => {
    if (isProfileModalOpen && userId && !hrProfile) {
      const fetchHrProfile = async () => {
        try {
          const res = await fetch(`/api/modules/quan-ly-nhan-su`);
          if (res.ok) {
            const result = await res.json();
            const data = result.data || [];
            const profile = data.find((emp: any) => String(emp.ID) === String(userId) || String(emp.id) === String(userId));
            if (profile) {
              setHrProfile(profile);
            }
          }
        } catch (error) {
          console.error("Failed to fetch HR profile:", error);
        }
      };
      fetchHrProfile();
    }
  }, [isProfileModalOpen, userId, hrProfile]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const allNavItems = [
    { name: "Trang chủ", path: "/", icon: LayoutDashboard, roles: ["admin", "admin app", "user"] },
    { name: "Kho", path: "/inventory", icon: Package, roles: ["admin", "admin app", "user"] },
    { name: "Chấm công", path: "/attendance", icon: CalendarCheck, roles: ["admin", "admin app", "user"] },
    { name: "Báo cáo", path: "/reports", icon: FileBarChart, roles: ["admin", "admin app", "user"] },
    { name: "Chi phí", path: "/costs", icon: Wallet, roles: ["admin", "admin app"] },
    { name: "Đối tác", path: "/partners", icon: UsersRound, roles: ["admin", "admin app"] },
    { name: "Nhân sự", path: "/hr", icon: Users, roles: ["admin", "admin app"] },
    { name: "Hệ thống", path: "/system", icon: Settings, roles: ["admin", "admin app"] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(userRole.toLowerCase()));

  // Items for mobile bottom nav (max 4-5 items)
  const mobileNavItems = navItems.slice(0, 4);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F8E9] flex flex-col">
      {/* Fixed Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-[60px] bg-[#2E7D32] text-white flex items-center justify-between px-3 md:px-4 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1.5 rounded-md transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="h-8 w-8 bg-white rounded-sm p-1 flex items-center justify-center">
              <img src="./logo.png" alt="Logo" className="h-full w-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <span className="font-bold text-lg hidden sm:block tracking-wide">QUẢN LÝ KHO CDX</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div 
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-md cursor-pointer transition-colors"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <UserCircle className="h-5 w-5" />
            <span className="font-medium hidden md:block">{userName}</span>
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-[60px] bottom-0 left-0 z-40 w-[260px] bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 shadow-sm",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#2E7D32]/10 rounded-full flex items-center justify-center text-[#2E7D32] font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                {userRole.toLowerCase().includes('admin') ? <ShieldAlert className="h-3 w-3 text-amber-500" /> : null}
                {userRole.toLowerCase() === 'admin app' ? 'Quản trị viên App' : userRole.toLowerCase() === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )
              }
            >
              <item.icon className={cn("h-5 w-5", "transition-colors")} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* User Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={() => setIsProfileModalOpen(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#2E7D32] p-6 text-white text-center relative">
              <button 
                className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-colors"
                onClick={() => setIsProfileModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3 border-2 border-white/50">
                {userName.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold">{userName}</h3>
              <p className="text-white/80 text-sm mt-1">{rawRole}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500 text-sm">Mã nhân viên (ID)</span>
                  <span className="font-medium text-slate-900">{userId}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500 text-sm">Phân quyền hệ thống</span>
                  <span className="font-medium text-slate-900">{userRole.toLowerCase() === 'admin app' ? 'Quản trị viên App' : userRole.toLowerCase() === 'admin' ? 'Quản trị viên' : 'Nhân viên'}</span>
                </div>
                {hrProfile ? (
                  Object.entries(hrProfile)
                    .filter(([key]) => {
                      const lowerKey = key.toLowerCase();
                      return lowerKey !== '_id' && lowerKey !== 'app_pass' && lowerKey !== 'app pass' && lowerKey !== 'mật khẩu' && lowerKey !== 'mật khẩu ứng dụng' && lowerKey !== 'id' && lowerKey !== 'tên' && lowerKey !== 'name';
                    })
                    .map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100">
                        <span className="text-slate-500 text-sm">{key}</span>
                        <span className="font-medium text-slate-900">{String(value)}</span>
                      </div>
                    ))
                ) : (
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Chức vụ (HR)</span>
                    <span className="font-medium text-slate-900">{rawRole}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="destructive" 
                  className="w-full gap-2 h-11"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 pt-[60px] md:pl-[260px] pb-[65px] md:pb-0 flex flex-col min-h-screen">
        <div className="flex-1 min-w-0 p-3 md:p-6 overflow-x-hidden">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[65px] bg-white border-t border-slate-200 flex items-center justify-around z-40 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-[#2E7D32]" : "text-slate-500 hover:text-slate-900"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
