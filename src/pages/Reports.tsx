import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { FileBarChart, PackageSearch, History, ArrowDownToLine, ArrowUpFromLine, ChevronRight } from "lucide-react";

const reports = [
  { id: "ton-theo-kho", name: "Tồn theo kho", icon: PackageSearch, color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: "bao-cao-ton-kho-thoi-gian", name: "Báo cáo tồn kho theo thời gian", icon: History, color: "text-purple-600", bgColor: "bg-purple-100" },
  { id: "bao-cao-nhap-kho", name: "Báo cáo nhập kho", icon: ArrowDownToLine, color: "text-brand-600", bgColor: "bg-brand-100" },
  { id: "bao-cao-xuat-kho", name: "Báo cáo xuất kho", icon: ArrowUpFromLine, color: "text-amber-600", bgColor: "bg-amber-100" },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Báo cáo</h2>
        <p className="text-slate-500">Xem các báo cáo tổng hợp về kho và chi phí.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <Link key={report.id} to={`/module/${report.id}`}>
            <Card className="hover:shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer h-full border-slate-200 hover:border-brand-200">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${report.bgColor}`}>
                  <report.icon className={`h-6 w-6 ${report.color}`} />
                </div>
                <CardTitle className="text-lg leading-tight">{report.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-brand-600 font-medium">
                  Xem chi tiết <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
