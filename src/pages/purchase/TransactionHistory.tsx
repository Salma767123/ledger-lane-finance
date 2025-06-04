
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, Calendar } from "lucide-react";

const TransactionHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <List className="h-8 w-8" />
          Transaction History
        </h1>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Filter by Date
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">View complete history of all purchase transactions.</p>
          <div className="mt-4">
            <Button variant="outline">View All Transactions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
