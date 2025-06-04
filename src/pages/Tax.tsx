
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { tag, plus } from "lucide-react";

const Tax = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <tag className="h-8 w-8" />
          Tax Management
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Add Tax Rate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tax Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure tax rates for different products and services.</p>
            <div className="mt-4">
              <Button variant="outline">Manage Tax Rates</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Generate tax reports and returns.</p>
            <div className="mt-4">
              <Button variant="outline">View Tax Reports</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GST Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Handle GST calculations and filing.</p>
            <div className="mt-4">
              <Button variant="outline">GST Dashboard</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure tax calculation settings.</p>
            <div className="mt-4">
              <Button variant="outline">Tax Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tax;
