
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Search, Eye, Edit, Trash2, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Vendors = () => {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  const [vendors, setVendors] = useState([
    { id: 1, name: "Tech Supplies Ltd", contact: "John Smith", phone: "+91 9876543210", email: "john@techsupplies.com", category: "Technology", status: "Active", address: "123 Tech Park, Mumbai" },
    { id: 2, name: "Office Equipment Co", contact: "Sarah Johnson", phone: "+91 9876543211", email: "sarah@officeequip.com", category: "Office Supplies", status: "Active", address: "456 Business District, Delhi" },
    { id: 3, name: "Software Solutions", contact: "Mike Brown", phone: "+91 9876543212", email: "mike@softsolutions.com", category: "Software", status: "Inactive", address: "789 IT Hub, Bangalore" },
    { id: 4, name: "Furniture World", contact: "Lisa Davis", phone: "+91 9876543213", email: "lisa@furnitureworld.com", category: "Furniture", status: "Active", address: "321 Commercial Street, Chennai" }
  ]);

  const [newVendor, setNewVendor] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    category: "",
    address: ""
  });

  const handleCreateVendor = () => {
    if (newVendor.name && newVendor.contact && newVendor.phone && newVendor.email) {
      const vendor = {
        id: vendors.length + 1,
        name: newVendor.name,
        contact: newVendor.contact,
        phone: newVendor.phone,
        email: newVendor.email,
        category: newVendor.category,
        address: newVendor.address,
        status: "Active"
      };
      setVendors([...vendors, vendor]);
      setNewVendor({ name: "", contact: "", phone: "", email: "", category: "", address: "" });
      setIsCreateDialogOpen(false);
      toast({
        title: "Vendor Added",
        description: `${vendor.name} has been added successfully.`
      });
    }
  };

  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setIsViewDialogOpen(true);
  };

  const handleDeleteVendor = (vendorId) => {
    setVendors(vendors.filter(vendor => vendor.id !== vendorId));
    toast({
      title: "Vendor Deleted",
      description: "Vendor has been deleted successfully."
    });
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="h-8 w-8" />
          Vendors
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Vendor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Vendor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Vendor Name *</label>
                <Input 
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
                  placeholder="Enter vendor name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contact Person *</label>
                <Input 
                  value={newVendor.contact}
                  onChange={(e) => setNewVendor({...newVendor, contact: e.target.value})}
                  placeholder="Enter contact person name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone *</label>
                <Input 
                  value={newVendor.phone}
                  onChange={(e) => setNewVendor({...newVendor, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input 
                  type="email"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({...newVendor, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <Select value={newVendor.category} onValueChange={(value) => setNewVendor({...newVendor, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input 
                  value={newVendor.address}
                  onChange={(e) => setNewVendor({...newVendor, address: e.target.value})}
                  placeholder="Enter address"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateVendor} className="flex-1">
                  Add Vendor
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
            <CardTitle>Vendors List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input placeholder="Search vendors..." className="pl-10 w-64" />
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
                <TableHead>Vendor Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {vendor.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {vendor.email}
                    </div>
                  </TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewVendor(vendor)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteVendor(vendor.id)}>
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
            <DialogTitle>Vendor Details</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Vendor Name</label>
                  <p className="text-lg font-semibold">{selectedVendor.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedVendor.status)}`}>
                    {selectedVendor.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Contact Person</label>
                  <p>{selectedVendor.contact}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p>{selectedVendor.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <p className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {selectedVendor.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {selectedVendor.email}
                  </p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-600">Address</label>
                  <p>{selectedVendor.address}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button>Edit Vendor</Button>
                <Button variant="outline">View Orders</Button>
                <Button variant="outline">Contact Vendor</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vendors;
