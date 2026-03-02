import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Wallet, FileText, Filter, ChevronRight } from "lucide-react";

const items = [
  { id: "chi-phi", name: "Chi phí", icon: Wallet, color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "bao-cao-chi-phi", name: "Báo cáo chi phí", icon: FileText, color: "text-indigo-600", bgColor: "bg-indigo-100" },
  { id: "loc-chi-phi", name: "Lọc chi phí", icon: Filter, color: "text-cyan-600", bgColor: "bg-cyan-100" },
];

export default function Costs() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Chi phí</h2>
        <p className="text-slate-500">Quản lý, theo dõi và báo cáo các khoản chi phí.</p>
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
