
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { activity, plus } from "lucide-react";

const RecurringBills = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <activity className="h-8 w-8" />
          Recurring Bills
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Setup Recurring Bill
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recurring Bill Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Automate recurring vendor bills and subscriptions.</p>
          <div className="mt-4">
            <Button variant="outline">View All Recurring Bills</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecurringBills;
