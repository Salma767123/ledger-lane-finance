
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

const JournalEntries = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          Journal Entries
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Journal Entry
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Journal Entry Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Record and manage journal entries for accounting transactions.</p>
          <div className="mt-4 space-y-3">
            <Button variant="outline" className="w-full">View All Journal Entries</Button>
            <Button variant="outline" className="w-full">Adjusting Entries</Button>
            <Button variant="outline" className="w-full">Closing Entries</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntries;
