
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { file-text, plus } from "lucide-react";

const VendorCredits = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <file-text className="h-8 w-8" />
          Vendor Credits
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Record Vendor Credit
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Credit Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Track credits received from vendors.</p>
          <div className="mt-4">
            <Button variant="outline">View All Vendor Credits</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorCredits;
