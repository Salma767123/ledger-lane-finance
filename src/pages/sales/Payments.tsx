
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { wallet, plus } from "lucide-react";

const Payments = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <wallet className="h-8 w-8" />
          Payments
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Track customer payments and payment history.</p>
          <div className="mt-4">
            <Button variant="outline">View All Payments</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
