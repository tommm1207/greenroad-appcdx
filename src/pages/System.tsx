import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UserCog, Trash2, ChevronRight } from "lucide-react";

const items = [
  { id: "quan-ly-nguoi-dung", name: "Quản lý người dùng & cài đặt", icon: UserCog, color: "text-slate-600", bgColor: "bg-slate-100" },
  { id: "thung-rac", name: "Thùng rác", icon: Trash2, color: "text-red-600", bgColor: "bg-red-100" },
];

export default function System() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Hệ thống</h2>
        <p className="text-slate-500">Cài đặt hệ thống, phân quyền và quản lý dữ liệu đã xóa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Link key={item.id} to={`/module/${item.id}`}>
            <Card className="hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer h-full border-slate-200 hover:border-brand-200">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bgColor}`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
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
