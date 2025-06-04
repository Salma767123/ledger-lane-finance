
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, Plus } from "lucide-react";

const SalesOrders = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Clipboard className="h-8 w-8" />
          Sales Orders
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Order
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Orders Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Track and manage your sales orders here.</p>
          <div className="mt-4">
            <Button variant="outline">View All Orders</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesOrders;
