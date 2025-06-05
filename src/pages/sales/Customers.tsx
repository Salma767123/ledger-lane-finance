
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Search, Eye, Edit, Trash2, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Customers = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  const [customers, setCustomers] = useState([
    { id: 1, name: "ABC Corporation", contact: "Rajesh Kumar", phone: "+91 9876543210", email: "rajesh@abccorp.com", type: "Corporate", totalOrders: 15, totalValue: 450000, status: "Active" },
    { id: 2, name: "XYZ Industries", contact: "Priya Sharma", phone: "+91 9876543211", email: "priya@xyzind.com", type: "Corporate", totalOrders: 8, totalValue: 280000, status: "Active" },
    { id: 3, name: "John Smith", contact: "John Smith", phone: "+91 9876543212", email: "john.smith@email.com", type: "Individual", totalOrders: 3, totalValue: 45000, status: "Active" },
    { id: 4, name: "Tech Solutions Pvt Ltd", contact: "Amit Patel", phone: "+91 9876543213", email: "amit@techsolutions.com", type: "Corporate", totalOrders: 12, totalValue: 380000, status: "Inactive" }
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    type: "",
    address: "",
    gstNumber: ""
  });

  const handleCreateCustomer = () => {
    if (newCustomer.name && newCustomer.contact && newCustomer.phone && newCustomer.email) {
      const customer = {
        id: customers.length + 1,
        name: newCustomer.name,
        contact: newCustomer.contact,
        phone: newCustomer.phone,
        email: newCustomer.email,
        type: newCustomer.type,
        address: newCustomer.address,
        gstNumber: newCustomer.gstNumber,
        totalOrders: 0,
        totalValue: 0,
        status: "Active"
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: "", contact: "", phone: "", email: "", type: "", address: "", gstNumber: "" });
      setIsCreateDialogOpen(false);
      toast({
        title: "Customer Added",
        description: `${customer.name} has been added successfully.`
      });
    }
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsViewDialogOpen(true);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
    toast({
      title: "Customer Deleted",
      description: "Customer has been deleted successfully."
    });
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getTypeColor = (type) => {
    return type === 'Corporate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-8 w-8" />
          Customers
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Customer Name *</label>
                <Input 
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Person *</label>
                <Input 
                  value={newCustomer.contact}
                  onChange={(e) => setNewCustomer({...newCustomer, contact: e.target.value})}
                  placeholder="Enter contact person name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone *</label>
                <Input 
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input 
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Customer Type</label>
                <Select value={newCustomer.type} onValueChange={(value) => setNewCustomer({...newCustomer, type: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input 
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="text-sm font-medium">GST Number</label>
                <Input 
                  value={newCustomer.gstNumber}
                  onChange={(e) => setNewCustomer({...newCustomer, gstNumber: e.target.value})}
                  placeholder="Enter GST number"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateCustomer} className="flex-1">
                  Add Customer
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
            <CardTitle>Customers List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search customers..." className="pl-10 w-64" />
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
                <TableHead>Customer Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Total Orders</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.contact}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {customer.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(customer.type)}`}>
                      {customer.type}
                    </span>
                  </TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>₹{customer.totalValue.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewCustomer(customer)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
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
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer Name</label>
                  <p className="text-lg font-semibold">{selectedCustomer.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Person</label>
                  <p>{selectedCustomer.contact}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Customer Type</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedCustomer.type)}`}>
                    {selectedCustomer.type}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {selectedCustomer.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {selectedCustomer.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Orders</label>
                  <p className="text-lg font-semibold">{selectedCustomer.totalOrders}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Total Value</label>
                  <p className="text-lg font-semibold text-green-600">₹{selectedCustomer.totalValue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button>Create Order</Button>
                <Button variant="outline">View Orders</Button>
                <Button variant="outline">Contact Customer</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
