import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Users, Clock, Banknote, FileSpreadsheet, Calculator, UserCog, Settings, ChevronRight } from "lucide-react";

const hrModules = [
  { id: "cham-cong", name: "Chấm công", icon: Clock, color: "text-blue-600", bgColor: "bg-blue-100", path: "/attendance" },
  { id: "tam-ung-phu-cap", name: "Tạm ứng & phụ cấp", icon: Banknote, color: "text-amber-600", bgColor: "bg-amber-100", path: "/module/tam-ung-phu-cap" },
  { id: "bao-cao-luong", name: "Báo cáo lương", icon: FileSpreadsheet, color: "text-purple-600", bgColor: "bg-purple-100", path: "/module/bao-cao-luong" },
  { id: "tong-hop-luong", name: "Tổng hợp lương/tháng", icon: Users, color: "text-brand-600", bgColor: "bg-brand-100", path: "/module/tong-hop-luong" },
  { id: "tinh-luong", name: "Tính lương", icon: Calculator, color: "text-indigo-600", bgColor: "bg-indigo-100", path: "/module/tinh-luong" },
  { id: "quan-ly-nhan-su", name: "Quản lý nhân sự", icon: UserCog, color: "text-rose-600", bgColor: "bg-rose-100", path: "/module/quan-ly-nhan-su" },
  { id: "cai-dat-luong", name: "Cài đặt lương", icon: Settings, color: "text-slate-600", bgColor: "bg-slate-100", path: "/module/cai-dat-luong" },
];

export default function HR() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Nhân sự</h2>
        <p className="text-slate-500">Quản lý thông tin nhân sự, chấm công và tính lương.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hrModules.map((mod) => (
          <Link key={mod.id} to={mod.path}>
            <Card className="hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer h-full border-slate-200 hover:border-brand-200">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${mod.bgColor}`}>
                  <mod.icon className={`h-6 w-6 ${mod.color}`} />
                </div>
                <CardTitle className="text-lg leading-tight">{mod.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-brand-600 font-medium">
                  Truy cập <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
