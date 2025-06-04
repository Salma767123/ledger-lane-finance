
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

const Estimates = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Estimates
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Estimate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estimates Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Manage your sales estimates and quotes here.</p>
          <div className="mt-4">
            <Button variant="outline">View All Estimates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Estimates;
