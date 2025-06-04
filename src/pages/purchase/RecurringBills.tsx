
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Plus } from "lucide-react";

const RecurringBills = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Activity className="h-8 w-8" />
          Recurring Bills
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Recurring Bill
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recurring Bill Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Manage bills that recur on a regular schedule.</p>
          <div className="mt-4">
            <Button variant="outline">View All Recurring Bills</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecurringBills;
