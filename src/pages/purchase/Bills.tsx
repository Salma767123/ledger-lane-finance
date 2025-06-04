
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { receipt, plus } from "lucide-react";

const Bills = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <receipt className="h-8 w-8" />
          Bills
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Add Bill
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bill Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Track and manage vendor bills and expenses.</p>
          <div className="mt-4">
            <Button variant="outline">View All Bills</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bills;
