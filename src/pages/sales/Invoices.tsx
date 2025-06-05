
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Search, Eye, Edit, Trash2, Download, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Invoices = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  
  const [invoices, setInvoices] = useState([
    { id: 1, invoiceNo: "INV-001", customer: "ABC Corporation", date: "2024-01-15", dueDate: "2024-02-15", amount: 85000, tax: 15300, total: 100300, status: "Paid" },
    { id: 2, invoiceNo: "INV-002", customer: "XYZ Industries", date: "2024-01-16", dueDate: "2024-02-16", amount: 65000, tax: 11700, total: 76700, status: "Pending" },
    { id: 3, invoiceNo: "INV-003", customer: "John Smith", date: "2024-01-17", dueDate: "2024-02-17", amount: 25000, tax: 4500, total: 29500, status: "Overdue" },
    { id: 4, invoiceNo: "INV-004", customer: "Tech Solutions Pvt Ltd", date: "2024-01-18", dueDate: "2024-02-18", amount: 45000, tax: 8100, total: 53100, status: "Draft" }
  ]);

  const [newInvoice, setNewInvoice] = useState({
    customer: "",
    description: "",
    quantity: "",
    rate: "",
    taxRate: "18"
  });

  const handleCreateInvoice = () => {
    if (newInvoice.customer && newInvoice.description && newInvoice.quantity && newInvoice.rate) {
      const amount = parseFloat(newInvoice.quantity) * parseFloat(newInvoice.rate);
      const tax = amount * (parseFloat(newInvoice.taxRate) / 100);
      const total = amount + tax;
      
      const invoice = {
        id: invoices.length + 1,
        invoiceNo: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        customer: newInvoice.customer,
        date: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        amount: amount,
        tax: tax,
        total: total,
        status: "Draft"
      };
      setInvoices([...invoices, invoice]);
      setNewInvoice({ customer: "", description: "", quantity: "", rate: "", taxRate: "18" });
      setIsCreateDialogOpen(false);
      toast({
        title: "Invoice Created",
        description: `Invoice ${invoice.invoiceNo} has been created successfully.`
      });
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  const handleDeleteInvoice = (invoiceId) => {
    setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
    toast({
      title: "Invoice Deleted",
      description: "Invoice has been deleted successfully."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-8 w-8" />
          Invoices
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
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
                <Select value={newInvoice.customer} onValueChange={(value) => setNewInvoice({...newInvoice, customer: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABC Corporation">ABC Corporation</SelectItem>
                    <SelectItem value="XYZ Industries">XYZ Industries</SelectItem>
                    <SelectItem value="John Smith">John Smith</SelectItem>
                    <SelectItem value="Tech Solutions Pvt Ltd">Tech Solutions Pvt Ltd</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Input 
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                  placeholder="Enter item description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Quantity *</label>
                <Input 
                  type="number"
                  value={newInvoice.quantity}
                  onChange={(e) => setNewInvoice({...newInvoice, quantity: e.target.value})}
                  placeholder="Enter quantity"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Rate *</label>
                <Input 
                  type="number"
                  value={newInvoice.rate}
                  onChange={(e) => setNewInvoice({...newInvoice, rate: e.target.value})}
                  placeholder="Enter rate per unit"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tax Rate (%)</label>
                <Select value={newInvoice.taxRate} onValueChange={(value) => setNewInvoice({...newInvoice, taxRate: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tax rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0%</SelectItem>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateInvoice} className="flex-1">
                  Create Invoice
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Invoices List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search invoices..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>₹{invoice.tax.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">₹{invoice.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleViewInvoice(invoice)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteInvoice(invoice.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Invoice Number</label>
                  <p className="text-lg font-semibold">{selectedInvoice.invoiceNo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer</label>
                  <p>{selectedInvoice.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Invoice Date</label>
                  <p>{selectedInvoice.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Due Date</label>
                  <p>{selectedInvoice.dueDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Amount</label>
                  <p>₹{selectedInvoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Tax</label>
                  <p>₹{selectedInvoice.tax.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Amount</label>
                  <p className="text-2xl font-bold text-green-600">₹{selectedInvoice.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button>Send Invoice</Button>
                <Button variant="outline">Download PDF</Button>
                <Button variant="outline">Edit Invoice</Button>
                <Button variant="outline">Record Payment</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Invoices;
