
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { file, plus } from "lucide-react";

const Challans = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <file className="h-8 w-8" />
          Challans
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Create Challan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Challans</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Manage delivery challans and shipping documents.</p>
          <div className="mt-4">
            <Button variant="outline">View All Challans</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Challans;
