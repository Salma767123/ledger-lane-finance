
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Plus, Search, Eye, Edit, Trash2, CreditCard, Download, Send, Filter, Upload, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Bills = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [bills, setBills] = useState([
    { 
      id: 1, 
      billNo: "BILL-001", 
      vendor: "Tech Supplies Ltd", 
      date: "2024-01-15", 
      dueDate: "2024-02-15", 
      amount: 45000, 
      paidAmount: 0,
      status: "Pending", 
      category: "Equipment",
      poReference: "PO-001",
      description: "Office equipment purchase",
      paymentTerms: "Net 30",
      notes: "Urgent delivery required"
    },
    { 
      id: 2, 
      billNo: "BILL-002", 
      vendor: "Office Equipment Co", 
      date: "2024-01-16", 
      dueDate: "2024-02-16", 
      amount: 32000, 
      paidAmount: 32000,
      status: "Paid", 
      category: "Supplies",
      poReference: "PO-002",
      description: "Office supplies",
      paymentTerms: "Net 15",
      notes: ""
    }
  ]);

  const handleView = (bill) => {
    toast({
      title: "View Bill",
      description: `Viewing bill ${bill.billNo}`
    });
  };

  const handleEdit = (bill) => {
    toast({
      title: "Edit Bill",
      description: `Editing bill ${bill.billNo}`
    });
  };

  const handleDelete = (billId) => {
    setBills(bills.filter(bill => bill.id !== billId));
    toast({
      title: "Bill Deleted",
      description: "Bill has been deleted successfully."
    });
  };

  const handleRecordPayment = (bill) => {
    navigate(`/purchase/record-payment/${bill.id}`);
  };

  const handleDownload = (bill) => {
    toast({
      title: "Download Bill",
      description: `Downloading bill ${bill.billNo}`
    });
  };

  const handleSend = (bill) => {
    toast({
      title: "Send Bill",
      description: `Sending bill ${bill.billNo}`
    });
  };

  const handlePrint = (bill) => {
    toast({
      title: "Print Bill",
      description: `Printing bill ${bill.billNo}`
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Partially Paid': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Receipt className="h-8 w-8" />
          Bills
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => navigate("/purchase/bills/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Bill
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Bills List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search bills..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill No</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-medium">{bill.billNo}</TableCell>
                  <TableCell>{bill.vendor}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.dueDate}</TableCell>
                  <TableCell>₹{bill.amount.toLocaleString()}</TableCell>
                  <TableCell>₹{bill.paidAmount.toLocaleString()}</TableCell>
                  <TableCell>₹{(bill.amount - bill.paidAmount).toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(bill.status)}`}>
                      {bill.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleView(bill)} title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(bill)} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {bill.status !== "Paid" && (
                        <Button variant="outline" size="sm" onClick={() => handleRecordPayment(bill)} title="Record Payment">
                          <CreditCard className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleDelete(bill.id)} title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(bill)} title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleSend(bill)} title="Send">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePrint(bill)} title="Print">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bills;
