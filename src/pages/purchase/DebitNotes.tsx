
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

const DebitNotes = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Debit Notes
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Debit Note
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Debit Note Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Manage debit notes issued to vendors.</p>
          <div className="mt-4">
            <Button variant="outline">View All Debit Notes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebitNotes;
