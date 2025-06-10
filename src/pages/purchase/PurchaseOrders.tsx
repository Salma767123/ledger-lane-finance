
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clipboard, Plus, Search, Eye, Edit, Trash2, Download, Send, FileText, Filter, Upload, RefreshCw, Check, Clock, Truck, Ban, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PurchaseOrders = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [purchaseOrders, setPurchaseOrders] = useState([
    { 
      id: 1, 
      orderNo: "PO-001", 
      vendor: "Tech Supplies Ltd", 
      date: "2024-01-15", 
      totalAmount: 45000, 
      status: "Open", 
      items: [{ product: "Product A", account: "Inventory", quantity: 10, rate: 4500, amount: 45000, tax: "GST@18%" }], 
      reference: "REF-001", 
      expectedDelivery: "2024-02-01", 
      paymentTerms: "Due on Receipt", 
      deliveryAddress: "123 Main St, City", 
      shipmentPreference: "Standard Shipping",
      notes: "Urgent delivery required",
      vendorDetails: {
        name: "Tech Supplies Ltd",
        address: "123 Tech Park, Mumbai",
        phone: "+91 9876543210",
        email: "vendor@techsupplies.com",
        gst: "27AABCT1332L1ZZ"
      }
    },
    { 
      id: 2, 
      orderNo: "PO-002", 
      vendor: "Office Equipment Co", 
      date: "2024-01-16", 
      totalAmount: 32000, 
      status: "Draft", 
      items: [{ product: "Product B", account: "Inventory", quantity: 8, rate: 4000, amount: 32000, tax: "GST@18%" }], 
      reference: "REF-002", 
      expectedDelivery: "2024-02-05", 
      paymentTerms: "Net 30", 
      deliveryAddress: "456 Oak Ave, Town", 
      shipmentPreference: "Express Shipping",
      notes: "Standard delivery",
      vendorDetails: {
        name: "Office Equipment Co",
        address: "456 Business Park, Delhi",
        phone: "+91 9876543211",
        email: "vendor@officeequip.com",
        gst: "07AABCT1332L1ZZ"
      }
    },
    { 
      id: 3, 
      orderNo: "PO-003", 
      vendor: "Software Solutions", 
      date: "2024-01-17", 
      totalAmount: 25000, 
      status: "Billed", 
      items: [{ product: "Product C", account: "Office Supplies", quantity: 5, rate: 5000, amount: 25000, tax: "GST@18%" }], 
      reference: "REF-003", 
      expectedDelivery: "2024-01-25", 
      paymentTerms: "Net 15", 
      deliveryAddress: "789 Pine St, Village", 
      shipmentPreference: "Standard Shipping",
      notes: "Digital delivery",
      vendorDetails: {
        name: "Software Solutions",
        address: "789 Software Park, Bangalore",
        phone: "+91 9876543212",
        email: "vendor@softsol.com",
        gst: "29AABCT1332L1ZZ"
      }
    },
    { 
      id: 4, 
      orderNo: "PO-004", 
      vendor: "Furniture World", 
      date: "2024-01-18", 
      totalAmount: 65000, 
      status: "Closed", 
      items: [{ product: "Product D", account: "Equipment", quantity: 13, rate: 5000, amount: 65000, tax: "GST@18%" }], 
      reference: "REF-004", 
      expectedDelivery: "2024-02-10", 
      paymentTerms: "Due on Receipt", 
      deliveryAddress: "321 Elm Dr, County", 
      shipmentPreference: "Heavy Freight",
      notes: "Fragile items",
      vendorDetails: {
        name: "Furniture World",
        address: "321 Furniture Plaza, Chennai",
        phone: "+91 9876543213",
        email: "vendor@furniture.com",
        gst: "33AABCT1332L1ZZ"
      }
    }
  ]);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (order) => {
    navigate(`/purchase/orders/edit/${order.id}`);
  };

  const handleDeleteOrder = (orderId) => {
    setPurchaseOrders(purchaseOrders.filter(order => order.id !== orderId));
    toast({
      title: "Order Deleted",
      description: "Purchase order has been deleted successfully."
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setPurchaseOrders(purchaseOrders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast({
      title: "Status Updated",
      description: `Order status changed to ${newStatus}.`
    });
  };

  const handleConvertToBill = (order) => {
    if (order.status === "Open" || order.status === "Closed") {
      navigate(`/purchase/convert-to-bill/${order.id}`);
    } else {
      toast({
        title: "Cannot Convert",
        description: "Only Open or Closed orders can be converted to bills.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadOrder = (order) => {
    toast({
      title: "Download Started",
      description: `Downloading PDF for order ${order.orderNo}`
    });
  };

  const handleSendOrder = (order) => {
    toast({
      title: "Order Sent",
      description: `Order ${order.orderNo} has been sent to vendor`
    });
  };

  const handlePrintOrder = (order) => {
    window.print();
    toast({
      title: "Print Started",
      description: `Printing order ${order.orderNo}`
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter Applied",
      description: "Filters have been applied to the purchase orders list."
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Exporting purchase orders data to Excel file."
    });
  };

  const handleBulkImport = () => {
    toast({
      title: "Bulk Import",
      description: "Opening bulk import dialog for purchase orders."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Billed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Closed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Draft': return <RefreshCw className="h-4 w-4" />;
      case 'Open': return <Clock className="h-4 w-4" />;
      case 'Billed': return <Check className="h-4 w-4" />;
      case 'Cancelled': return <Ban className="h-4 w-4" />;
      case 'Closed': return <XCircle className="h-4 w-4" />;
      default: return <RefreshCw className="h-4 w-4" />;
    }
  };

  const filteredOrders = purchaseOrders.filter(order =>
    order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Clipboard className="h-8 w-8" />
          Purchase Orders
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkImport}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
          <Button onClick={() => navigate("/purchase/orders/create")}>
            <Plus className="h-4 w-4 mr-2" />
            New Purchase Order
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Purchase Orders List</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input 
                  placeholder="Search orders..." 
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={handleFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" onClick={handleExport}>
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order No</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNo}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                      <SelectTrigger className={`w-32 ${getStatusColor(order.status)}`}>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Billed">Billed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)} title="View">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditOrder(order)} title="Edit">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteOrder(order.id)} title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {(order.status === "Open" || order.status === "Closed") && (
                        <Button variant="outline" size="sm" onClick={() => handleConvertToBill(order)} title="Convert to Bill">
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Purchase Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Invoice Header */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">PURCHASE ORDER</h2>
                    <p className="text-lg font-semibold text-blue-600">{selectedOrder.orderNo}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vendor and Order Info */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Vendor Details</h3>
                  <div className="space-y-1">
                    <p className="font-medium">{selectedOrder.vendorDetails?.name || selectedOrder.vendor}</p>
                    <p>{selectedOrder.vendorDetails?.address || "Vendor Address Line 1"}</p>
                    <p>Vendor Address Line 2</p>
                    <p>Phone: {selectedOrder.vendorDetails?.phone || "+91 9876543210"}</p>
                    <p>Email: {selectedOrder.vendorDetails?.email || "vendor@example.com"}</p>
                    <p>GST: {selectedOrder.vendorDetails?.gst || "27AABCT1332L1ZZ"}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                  <div className="space-y-1">
                    <p><span className="font-medium">Order Date:</span> {selectedOrder.date}</p>
                    <p><span className="font-medium">Order No:</span> {selectedOrder.orderNo}</p>
                    <p><span className="font-medium">Reference:</span> {selectedOrder.reference || "REF-001"}</p>
                    <p><span className="font-medium">Expected Delivery:</span> {selectedOrder.expectedDelivery || "2024-02-01"}</p>
                    <p><span className="font-medium">Payment Terms:</span> {selectedOrder.paymentTerms || "Due on Receipt"}</p>
                    <p><span className="font-medium">Status:</span> {selectedOrder.status}</p>
                  </div>
                </div>
              </div>

              {selectedOrder.deliveryAddress && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Delivery Address</h3>
                  <p>{selectedOrder.deliveryAddress}</p>
                </div>
              )}
              
              {/* Items Table */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Item</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-right">Rate</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell>{item.account || "Inventory"}</TableCell>
                        <TableCell className="text-center">{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{item.rate.toLocaleString()}</TableCell>
                        <TableCell className="text-right">₹{item.amount.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals */}
              <div className="flex justify-end border-t pt-4">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                {(selectedOrder.status === "Open" || selectedOrder.status === "Closed") && (
                  <Button onClick={() => {
                    setIsViewDialogOpen(false);
                    handleConvertToBill(selectedOrder);
                  }}>
                    <FileText className="h-4 w-4 mr-2" />
                    Convert to Bill
                  </Button>
                )}
                <Button variant="outline" onClick={() => {
                  setIsViewDialogOpen(false);
                  handleEditOrder(selectedOrder);
                }}>
                  Edit Order
                </Button>
                <Button variant="outline" onClick={() => handlePrintOrder(selectedOrder)}>
                  Print Order
                </Button>
                <Button variant="outline" onClick={() => handleDownloadOrder(selectedOrder)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={() => handleSendOrder(selectedOrder)}>
                  <Send className="h-4 w-4 mr-2" />
                  Send to Vendor
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchaseOrders;
