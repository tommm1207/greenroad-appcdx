import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { PackagePlus, PackageMinus, ArrowRightLeft, ClipboardList, List, Library, ChevronRight } from "lucide-react";

const items = [
  { id: "nhap-kho", name: "Nhập kho", icon: PackagePlus, color: "text-brand-600", bgColor: "bg-brand-100" },
  { id: "xuat-kho", name: "Xuất kho", icon: PackageMinus, color: "text-amber-600", bgColor: "bg-amber-100" },
  { id: "luan-chuyen-kho", name: "Luân chuyển kho", icon: ArrowRightLeft, color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "bao-cao-nhap-xuat-ton", name: "Báo cáo nhập xuất tồn", icon: ClipboardList, color: "text-purple-600", bgColor: "bg-purple-100" },
  { id: "danh-sach-kho", name: "Danh sách kho", icon: List, color: "text-slate-600", bgColor: "bg-slate-100" },
  { id: "thu-vien-vat-tu", name: "Thư viện vật tư", icon: Library, color: "text-indigo-600", bgColor: "bg-indigo-100" },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý Kho</h2>
        <p className="text-slate-500">Quản lý nhập xuất tồn, luân chuyển và danh mục vật tư.</p>
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
