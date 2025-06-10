
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CreditCard,
  Send,
  Printer,
  MoreHorizontal
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Bills = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data for bills
  const [bills] = useState([
    {
      id: 1,
      billNumber: "BILL-001",
      vendor: "Tech Supplies Ltd",
      billDate: "2024-01-15",
      dueDate: "2024-02-15",
      amount: 45000,
      paidAmount: 25000,
      status: "Partially Paid",
      reference: "REF-001"
    },
    {
      id: 2,
      billNumber: "BILL-002",
      vendor: "Office Solutions",
      billDate: "2024-01-20",
      dueDate: "2024-02-20",
      amount: 32000,
      paidAmount: 32000,
      status: "Paid",
      reference: "REF-002"
    },
    {
      id: 3,
      billNumber: "BILL-003",
      vendor: "Hardware Corp",
      billDate: "2024-01-25",
      dueDate: "2024-02-25",
      amount: 78000,
      paidAmount: 0,
      status: "Unpaid",
      reference: "REF-003"
    }
  ]);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bill.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Partially Paid":
        return "bg-yellow-100 text-yellow-800";
      case "Unpaid":
        return "bg-red-100 text-red-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleView = (billId) => {
    toast({
      title: "View Bill",
      description: `Opening bill details for ID: ${billId}`,
    });
  };

  const handleEdit = (billId) => {
    navigate(`/purchase/bills/edit/${billId}`);
  };

  const handleDelete = (billId) => {
    toast({
      title: "Delete Bill",
      description: `Bill ${billId} has been deleted.`,
      variant: "destructive"
    });
  };

  const handleRecordPayment = (billId) => {
    navigate(`/purchase/bills/record-payment/${billId}`);
  };

  const handleDownload = (billId) => {
    toast({
      title: "Download Bill",
      description: `Downloading bill ${billId}...`,
    });
  };

  const handleSend = (billId) => {
    toast({
      title: "Send Bill",
      description: `Sending bill ${billId} via email...`,
    });
  };

  const handlePrint = (billId) => {
    toast({
      title: "Print Bill",
      description: `Printing bill ${billId}...`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Bills</h1>
        <Button onClick={() => navigate("/purchase/bills/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Bill
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search bills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partially-paid">Partially Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bills Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>BILL NUMBER</TableHead>
                  <TableHead>VENDOR</TableHead>
                  <TableHead>BILL DATE</TableHead>
                  <TableHead>DUE DATE</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>PAID AMOUNT</TableHead>
                  <TableHead>BALANCE</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.billNumber}</TableCell>
                    <TableCell>{bill.vendor}</TableCell>
                    <TableCell>{bill.billDate}</TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell>₹{bill.amount.toLocaleString()}</TableCell>
                    <TableCell>₹{bill.paidAmount.toLocaleString()}</TableCell>
                    <TableCell>₹{(bill.amount - bill.paidAmount).toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(bill.status)}>
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(bill.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(bill.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRecordPayment(bill.id)}
                          disabled={bill.status === "Paid"}
                        >
                          <CreditCard className="h-4 w-4" />
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDownload(bill.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSend(bill.id)}>
                              <Send className="h-4 w-4 mr-2" />
                              Send
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePrint(bill.id)}>
                              <Printer className="h-4 w-4 mr-2" />
                              Print
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(bill.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bills;
