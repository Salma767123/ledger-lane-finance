import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Search, Calendar, FileText, Edit } from "lucide-react";

const JournalEntries = () => {
  const [isNewEntryDialogOpen, setIsNewEntryDialogOpen] = useState(false);
  const [isViewAllDialogOpen, setIsViewAllDialogOpen] = useState(false);
  const [isAdjustingEntriesOpen, setIsAdjustingEntriesOpen] = useState(false);
  const [isClosingEntriesOpen, setIsClosingEntriesOpen] = useState(false);
  const [isRecurringEntriesOpen, setIsRecurringEntriesOpen] = useState(false);
  
  const [newEntry, setNewEntry] = useState({
    date: "",
    description: "",
    reference: "",
    account: "",
    debit: "",
    credit: ""
  });

  const handleCreateEntry = () => {
    if (newEntry.date && newEntry.description && newEntry.account) {
      console.log("Creating new journal entry:", newEntry);
      setNewEntry({ date: "", description: "", reference: "", account: "", debit: "", credit: "" });
      setIsNewEntryDialogOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-purple-600" />
          Journal Entries
        </h1>
        <Dialog open={isNewEntryDialogOpen} onOpenChange={setIsNewEntryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              New Journal Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Journal Entry</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Date *</label>
                <Input 
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Input 
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Reference</label>
                <Input 
                  value={newEntry.reference}
                  onChange={(e) => setNewEntry({...newEntry, reference: e.target.value})}
                  placeholder="Enter reference"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Account *</label>
                <Select value={newEntry.account} onValueChange={(value) => setNewEntry({...newEntry, account: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="accounts-receivable">Accounts Receivable</SelectItem>
                    <SelectItem value="office-expense">Office Expense</SelectItem>
                    <SelectItem value="sales-revenue">Sales Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Debit Amount</label>
                  <Input 
                    type="number"
                    value={newEntry.debit}
                    onChange={(e) => setNewEntry({...newEntry, debit: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Credit Amount</label>
                  <Input 
                    type="number"
                    value={newEntry.credit}
                    onChange={(e) => setNewEntry({...newEntry, credit: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateEntry} className="flex-1">
                  Create Entry
                </Button>
                <Button variant="outline" onClick={() => setIsNewEntryDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Edit className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Draft Entries</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Journal Entry Management</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search entries..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            <Dialog open={isViewAllDialogOpen} onOpenChange={setIsViewAllDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">View All Journal Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>All Journal Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Entry No.</th>
                          <th className="text-left p-4">Date</th>
                          <th className="text-left p-4">Description</th>
                          <th className="text-right p-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-4">JE001</td>
                          <td className="p-4">2024-01-15</td>
                          <td className="p-4">Office Rent Expense</td>
                          <td className="p-4 text-right">₹25,000</td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-4">JE002</td>
                          <td className="p-4">2024-01-16</td>
                          <td className="p-4">Sales Revenue</td>
                          <td className="p-4 text-right">₹45,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAdjustingEntriesOpen} onOpenChange={setIsAdjustingEntriesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Adjusting Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Adjusting Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">Manage period-end adjusting entries here.</p>
                  <Button className="w-full">Create Adjusting Entry</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isClosingEntriesOpen} onOpenChange={setIsClosingEntriesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Closing Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Closing Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">Manage year-end closing entries here.</p>
                  <Button className="w-full">Create Closing Entry</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isRecurringEntriesOpen} onOpenChange={setIsRecurringEntriesOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Recurring Entries</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Recurring Entries</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">Set up and manage recurring journal entries.</p>
                  <Button className="w-full">Create Recurring Entry</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Entry No.</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Reference</th>
                  <th className="text-right p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4">JE001</td>
                  <td className="p-4">2024-01-15</td>
                  <td className="p-4">Office Rent Expense</td>
                  <td className="p-4">INV-001</td>
                  <td className="p-4 text-right">₹25,000</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Posted</span>
                  </td>
                  <td className="p-4">
                    <Button variant="outline" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntries;
