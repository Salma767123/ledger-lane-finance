
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Receipt, Plus, Search, Calendar } from "lucide-react";

const Invoices = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    customer: "",
    amount: "",
    dueDate: "",
    description: ""
  });

  const handleCreateInvoice = () => {
    console.log("Creating invoice:", invoiceData);
    setInvoiceData({ customer: "", amount: "", dueDate: "", description: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Receipt className="h-8 w-8 text-green-600" />
          Invoices
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Customer *</label>
                <Input 
                  value={invoiceData.customer}
                  onChange={(e) => setInvoiceData({...invoiceData, customer: e.target.value})}
                  placeholder="Select customer"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Amount *</label>
                <Input 
                  type="number"
                  value={invoiceData.amount}
                  onChange={(e) => setInvoiceData({...invoiceData, amount: e.target.value})}
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input 
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input 
                  value={invoiceData.description}
                  onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})}
                  placeholder="Enter description"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateInvoice} className="flex-1">
                  Create Invoice
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-gray-900">189</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">35</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Receipt className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">10</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Invoices</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search invoices..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Invoice #</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Due Date</th>
                  <th className="text-right p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">INV-001</td>
                  <td className="p-4">John Doe</td>
                  <td className="p-4">2024-01-15</td>
                  <td className="p-4">2024-02-15</td>
                  <td className="p-4 text-right font-semibold">₹25,000</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Paid</span>
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

export default Invoices;
