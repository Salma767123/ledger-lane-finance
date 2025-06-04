
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { users, plus } from "lucide-react";

const Vendors = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <users className="h-8 w-8" />
          Vendors
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Manage your suppliers and vendor information.</p>
          <div className="mt-4">
            <Button variant="outline">View All Vendors</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Vendors;
