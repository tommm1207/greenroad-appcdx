import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UsersRound, ChevronRight } from "lucide-react";

const items = [
  { id: "khach-hang-nha-cung-cap", name: "Khách hàng & nhà cung cấp", icon: UsersRound, color: "text-purple-600", bgColor: "bg-purple-100" },
];

export default function Partners() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Đối tác</h2>
        <p className="text-slate-500">Quản lý danh sách khách hàng và nhà cung cấp.</p>
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
