
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Plus, Search, Eye, Edit, Trash2, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const Vendors = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [vendors, setVendors] = useState([
    { 
      id: 1, 
      name: "Tech Supplies Ltd", 
      contact: "John Smith", 
      phone: "+91 9876543210", 
      email: "john@techsupplies.com", 
      category: "Technology", 
      status: "Active", 
      address: "123 Tech Park, Mumbai",
      salutation: "Mr",
      firstName: "John",
      lastName: "Smith",
      companyName: "Tech Supplies Ltd",
      vendorDisplayName: "Tech Supplies Ltd",
      vendorEmail: "john@techsupplies.com",
      workPhone: "+91 9876543210",
      mobile: "+91 9876543211",
      accountHolderName: "Tech Supplies Ltd",
      bankName: "HDFC Bank",
      accountNumber: "1234567890",
      ifsc: "HDFC0001234"
    },
    { 
      id: 2, 
      name: "Office Equipment Co", 
      contact: "Sarah Johnson", 
      phone: "+91 9876543211", 
      email: "sarah@officeequip.com", 
      category: "Office Supplies", 
      status: "Active", 
      address: "456 Business District, Delhi",
      salutation: "Ms",
      firstName: "Sarah",
      lastName: "Johnson",
      companyName: "Office Equipment Co",
      vendorDisplayName: "Office Equipment Co",
      vendorEmail: "sarah@officeequip.com",
      workPhone: "+91 9876543211",
      mobile: "+91 9876543212",
      accountHolderName: "Office Equipment Co",
      bankName: "SBI",
      accountNumber: "0987654321",
      ifsc: "SBIN0001234"
    },
    { 
      id: 3, 
      name: "Software Solutions", 
      contact: "Mike Brown", 
      phone: "+91 9876543212", 
      email: "mike@softsolutions.com", 
      category: "Software", 
      status: "Inactive", 
      address: "789 IT Hub, Bangalore",
      salutation: "Mr",
      firstName: "Mike",
      lastName: "Brown",
      companyName: "Software Solutions",
      vendorDisplayName: "Software Solutions",
      vendorEmail: "mike@softsolutions.com",
      workPhone: "+91 9876543212",
      mobile: "+91 9876543213",
      accountHolderName: "Software Solutions",
      bankName: "ICICI Bank",
      accountNumber: "1122334455",
      ifsc: "ICIC0001234"
    },
    { 
      id: 4, 
      name: "Furniture World", 
      contact: "Lisa Davis", 
      phone: "+91 9876543213", 
      email: "lisa@furnitureworld.com", 
      category: "Furniture", 
      status: "Active", 
      address: "321 Commercial Street, Chennai",
      salutation: "Ms",
      firstName: "Lisa",
      lastName: "Davis",
      companyName: "Furniture World",
      vendorDisplayName: "Furniture World",
      vendorEmail: "lisa@furnitureworld.com",
      workPhone: "+91 9876543213",
      mobile: "+91 9876543214",
      accountHolderName: "Furniture World",
      bankName: "Axis Bank",
      accountNumber: "5566778899",
      ifsc: "UTIB0001234"
    }
  ]);

  const [newVendor, setNewVendor] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    vendorDisplayName: "",
    vendorEmail: "",
    workPhone: "",
    mobile: "",
    category: "",
    address: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    reenterAccount: "",
    ifsc: ""
  });

  const [editVendor, setEditVendor] = useState({
    id: 0,
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    vendorDisplayName: "",
    vendorEmail: "",
    workPhone: "",
    mobile: "",
    category: "",
    address: "",
    accountHolderName: "",
    bankName: "",
    accountNumber: "",
    reenterAccount: "",
    ifsc: ""
  });

  const handleCreateVendor = () => {
    if (newVendor.companyName && newVendor.vendorEmail) {
      const vendor = {
        id: vendors.length + 1,
        name: newVendor.vendorDisplayName || newVendor.companyName,
        contact: `${newVendor.firstName} ${newVendor.lastName}`.trim(),
        phone: newVendor.workPhone,
        email: newVendor.vendorEmail,
        category: newVendor.category,
        address: newVendor.address,
        status: "Active",
        ...newVendor
      };
      setVendors([...vendors, vendor]);
      setNewVendor({
        salutation: "",
        firstName: "",
        lastName: "",
        companyName: "",
        vendorDisplayName: "",
        vendorEmail: "",
        workPhone: "",
        mobile: "",
        category: "",
        address: "",
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        reenterAccount: "",
        ifsc: ""
      });
      setIsCreateDialogOpen(false);
      toast({
        title: "Vendor Added",
        description: `${vendor.name} has been added successfully.`
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleViewVendor = (vendor) => {
    navigate(`/purchase/vendors/${vendor.id}`);
  };

  const handleEditVendor = (vendor) => {
    setEditVendor({
      id: vendor.id,
      salutation: vendor.salutation || "",
      firstName: vendor.firstName || "",
      lastName: vendor.lastName || "",
      companyName: vendor.companyName || vendor.name,
      vendorDisplayName: vendor.vendorDisplayName || vendor.name,
      vendorEmail: vendor.vendorEmail || vendor.email,
      workPhone: vendor.workPhone || vendor.phone,
      mobile: vendor.mobile || "",
      category: vendor.category || "",
      address: vendor.address || "",
      accountHolderName: vendor.accountHolderName || "",
      bankName: vendor.bankName || "",
      accountNumber: vendor.accountNumber || "",
      reenterAccount: vendor.accountNumber || "",
      ifsc: vendor.ifsc || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateVendor = () => {
    if (editVendor.companyName && editVendor.vendorEmail) {
      const updatedVendors = vendors.map(vendor => 
        vendor.id === editVendor.id 
          ? {
              ...vendor,
              name: editVendor.vendorDisplayName || editVendor.companyName,
              contact: `${editVendor.firstName} ${editVendor.lastName}`.trim(),
              phone: editVendor.workPhone,
              email: editVendor.vendorEmail,
              category: editVendor.category,
              address: editVendor.address,
              ...editVendor
            }
          : vendor
      );
      setVendors(updatedVendors);
      setIsEditDialogOpen(false);
      toast({
        title: "Vendor Updated",
        description: "Vendor has been updated successfully."
      });
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteVendor = (vendorId) => {
    setVendors(vendors.filter(vendor => vendor.id !== vendorId));
    toast({
      title: "Vendor Deleted",
      description: "Vendor has been deleted successfully."
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Vendor list is being exported..."
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Vendor filters have been applied."
    });
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>New Vendor</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Primary Contact Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Primary Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Salutation</label>
                    <Select value={newVendor.salutation} onValueChange={(value) => setNewVendor({...newVendor, salutation: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input 
                      value={newVendor.firstName}
                      onChange={(e) => setNewVendor({...newVendor, firstName: e.target.value})}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input 
                      value={newVendor.lastName}
                      onChange={(e) => setNewVendor({...newVendor, lastName: e.target.value})}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Company Name</label>
                    <Input 
                      value={newVendor.companyName}
                      onChange={(e) => setNewVendor({...newVendor, companyName: e.target.value})}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Vendor Display Name *</label>
                    <Input 
                      value={newVendor.vendorDisplayName}
                      onChange={(e) => setNewVendor({...newVendor, vendorDisplayName: e.target.value})}
                      placeholder="Vendor Display Name"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Vendor Email *</label>
                    <Input 
                      type="email"
                      value={newVendor.vendorEmail}
                      onChange={(e) => setNewVendor({...newVendor, vendorEmail: e.target.value})}
                      placeholder="vendor@example.com"
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
                    <label className="text-sm font-medium">Work Phone</label>
                    <Input 
                      value={newVendor.workPhone}
                      onChange={(e) => setNewVendor({...newVendor, workPhone: e.target.value})}
                      placeholder="Work Phone"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mobile</label>
                    <Input 
                      value={newVendor.mobile}
                      onChange={(e) => setNewVendor({...newVendor, mobile: e.target.value})}
                      placeholder="Mobile"
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-medium">Address</label>
                <Textarea 
                  value={newVendor.address}
                  onChange={(e) => setNewVendor({...newVendor, address: e.target.value})}
                  placeholder="Enter address"
                  rows={3}
                />
              </div>

              {/* Bank Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Account Holder Name</label>
                    <Input 
                      value={newVendor.accountHolderName}
                      onChange={(e) => setNewVendor({...newVendor, accountHolderName: e.target.value})}
                      placeholder="Account Holder Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bank Name</label>
                    <Input 
                      value={newVendor.bankName}
                      onChange={(e) => setNewVendor({...newVendor, bankName: e.target.value})}
                      placeholder="Bank Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Account Number *</label>
                    <Input 
                      type="password"
                      value={newVendor.accountNumber}
                      onChange={(e) => setNewVendor({...newVendor, accountNumber: e.target.value})}
                      placeholder="••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Re-enter Account Number *</label>
                    <Input 
                      value={newVendor.reenterAccount}
                      onChange={(e) => setNewVendor({...newVendor, reenterAccount: e.target.value})}
                      placeholder="Re-enter Account Number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">IFSC *</label>
                    <Input 
                      value={newVendor.ifsc}
                      onChange={(e) => setNewVendor({...newVendor, ifsc: e.target.value})}
                      placeholder="IFSC Code"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateVendor} className="flex-1">
                  Save
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
                <Input 
                  placeholder="Search vendors..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={handleFilter}>Filter</Button>
              <Button variant="outline" onClick={handleExport}>Export</Button>
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
              {filteredVendors.map((vendor) => (
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
                      <Button variant="outline" size="sm" onClick={() => handleEditVendor(vendor)}>
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

      {/* Edit Vendor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Vendor</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Primary Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Primary Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Salutation</label>
                  <Select value={editVendor.salutation} onValueChange={(value) => setEditVendor({...editVendor, salutation: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr">Mr</SelectItem>
                      <SelectItem value="Ms">Ms</SelectItem>
                      <SelectItem value="Mrs">Mrs</SelectItem>
                      <SelectItem value="Dr">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input 
                    value={editVendor.firstName}
                    onChange={(e) => setEditVendor({...editVendor, firstName: e.target.value})}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input 
                    value={editVendor.lastName}
                    onChange={(e) => setEditVendor({...editVendor, lastName: e.target.value})}
                    placeholder="Last Name"
                  />
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <Input 
                    value={editVendor.companyName}
                    onChange={(e) => setEditVendor({...editVendor, companyName: e.target.value})}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Vendor Display Name *</label>
                  <Input 
                    value={editVendor.vendorDisplayName}
                    onChange={(e) => setEditVendor({...editVendor, vendorDisplayName: e.target.value})}
                    placeholder="Vendor Display Name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Vendor Email *</label>
                  <Input 
                    type="email"
                    value={editVendor.vendorEmail}
                    onChange={(e) => setEditVendor({...editVendor, vendorEmail: e.target.value})}
                    placeholder="vendor@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={editVendor.category} onValueChange={(value) => setEditVendor({...editVendor, category: value})}>
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
                  <label className="text-sm font-medium">Work Phone</label>
                  <Input 
                    value={editVendor.workPhone}
                    onChange={(e) => setEditVendor({...editVendor, workPhone: e.target.value})}
                    placeholder="Work Phone"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Mobile</label>
                  <Input 
                    value={editVendor.mobile}
                    onChange={(e) => setEditVendor({...editVendor, mobile: e.target.value})}
                    placeholder="Mobile"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium">Address</label>
              <Textarea 
                value={editVendor.address}
                onChange={(e) => setEditVendor({...editVendor, address: e.target.value})}
                placeholder="Enter address"
                rows={3}
              />
            </div>

            {/* Bank Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Account Holder Name</label>
                  <Input 
                    value={editVendor.accountHolderName}
                    onChange={(e) => setEditVendor({...editVendor, accountHolderName: e.target.value})}
                    placeholder="Account Holder Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Bank Name</label>
                  <Input 
                    value={editVendor.bankName}
                    onChange={(e) => setEditVendor({...editVendor, bankName: e.target.value})}
                    placeholder="Bank Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Account Number *</label>
                  <Input 
                    type="password"
                    value={editVendor.accountNumber}
                    onChange={(e) => setEditVendor({...editVendor, accountNumber: e.target.value})}
                    placeholder="••••••••••••"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Re-enter Account Number *</label>
                  <Input 
                    value={editVendor.reenterAccount}
                    onChange={(e) => setEditVendor({...editVendor, reenterAccount: e.target.value})}
                    placeholder="Re-enter Account Number"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">IFSC *</label>
                  <Input 
                    value={editVendor.ifsc}
                    onChange={(e) => setEditVendor({...editVendor, ifsc: e.target.value})}
                    placeholder="IFSC Code"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleUpdateVendor} className="flex-1">
                Update
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Vendors;
