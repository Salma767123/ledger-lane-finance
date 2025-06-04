
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

const CreditNotes = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Credit Notes
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Credit Note
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credit Notes Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Manage customer credit notes and refunds.</p>
          <div className="mt-4">
            <Button variant="outline">View All Credit Notes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditNotes;
