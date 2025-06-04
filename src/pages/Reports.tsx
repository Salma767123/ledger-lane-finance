
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Calendar } from "lucide-react";

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <PieChart className="h-8 w-8" />
          Reports & Analytics
        </h1>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Custom Date Range
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Profit & Loss</Button>
              <Button variant="outline" size="sm" className="w-full">Balance Sheet</Button>
              <Button variant="outline" size="sm" className="w-full">Cash Flow</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Sales Summary</Button>
              <Button variant="outline" size="sm" className="w-full">Customer Report</Button>
              <Button variant="outline" size="sm" className="w-full">Product Performance</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Purchase Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Purchase Summary</Button>
              <Button variant="outline" size="sm" className="w-full">Vendor Report</Button>
              <Button variant="outline" size="sm" className="w-full">Expense Analysis</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">GST Report</Button>
              <Button variant="outline" size="sm" className="w-full">Tax Summary</Button>
              <Button variant="outline" size="sm" className="w-full">TDS Report</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Stock Report</Button>
              <Button variant="outline" size="sm" className="w-full">Valuation Report</Button>
              <Button variant="outline" size="sm" className="w-full">Movement Report</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">Create Report</Button>
              <Button variant="outline" size="sm" className="w-full">Saved Reports</Button>
              <Button variant="outline" size="sm" className="w-full">Scheduled Reports</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
