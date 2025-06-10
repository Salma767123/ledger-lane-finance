
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, Plus, X, ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreatePurchaseOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orderForm, setOrderForm] = useState({
    vendor: "",
    orderNo: "",
    reference: "",
    date: "",
    expectedDelivery: "",
    paymentTerms: "Due on Receipt",
    deliveryAddress: "",
    shipmentPreference: "",
    notes: "",
    items: [{ product: "", account: "", quantity: "", rate: "", amount: 0, tax: "" }]
  });

  const calculateItemAmount = (quantity, rate) => {
    return parseFloat(quantity || "0") * parseFloat(rate || "0");
  };

  const calculateTotals = () => {
    const subtotal = orderForm.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const discount = 0;
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax - discount;
    return { subtotal, discount, tax, total };
  };

  const addItem = () => {
    setOrderForm({
      ...orderForm,
      items: [...orderForm.items, { product: "", account: "", quantity: "", rate: "", amount: 0, tax: "" }]
    });
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...orderForm.items];
    updatedItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = calculateItemAmount(
        updatedItems[index].quantity,
        updatedItems[index].rate
      );
    }
    
    setOrderForm({ ...orderForm, items: updatedItems });
  };

  const removeItem = (index) => {
    if (orderForm.items.length > 1) {
      const updatedItems = orderForm.items.filter((_, i) => i !== index);
      setOrderForm({ ...orderForm, items: updatedItems });
    }
  };

  const generateOrderNumber = () => {
    return `PO-${(Math.floor(Math.random() * 1000) + 1).toString().padStart(3, '0')}`;
  };

  const handleCreateOrder = (status = "Draft") => {
    if (orderForm.vendor && orderForm.date && orderForm.items.some(item => item.product)) {
      const { total } = calculateTotals();
      
      toast({
        title: "Purchase Order Created",
        description: `Order has been created with status: ${status}`,
      });
      
      navigate("/purchase/orders");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };

  const { subtotal, discount, tax, total } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/purchase/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Clipboard className="h-8 w-8" />
            Create Purchase Order
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vendor Selection */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-red-500">Vendor Name*</label>
              <Select value={orderForm.vendor} onValueChange={(value) => setOrderForm({...orderForm, vendor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech Supplies Ltd">Tech Supplies Ltd</SelectItem>
                  <SelectItem value="Office Equipment Co">Office Equipment Co</SelectItem>
                  <SelectItem value="Software Solutions">Software Solutions</SelectItem>
                  <SelectItem value="Furniture World">Furniture World</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Delivery Address</label>
              <Textarea 
                value={orderForm.deliveryAddress}
                onChange={(e) => setOrderForm({...orderForm, deliveryAddress: e.target.value})}
                placeholder="Enter delivery address"
                className="min-h-[40px]"
              />
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-red-500">Purchase Order#*</label>
              <Input 
                value={orderForm.orderNo}
                onChange={(e) => setOrderForm({...orderForm, orderNo: e.target.value})}
                placeholder={generateOrderNumber()}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Reference#</label>
              <Input 
                value={orderForm.reference}
                onChange={(e) => setOrderForm({...orderForm, reference: e.target.value})}
                placeholder="Enter reference"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-red-500">Date*</label>
              <Input 
                type="date"
                value={orderForm.date}
                onChange={(e) => setOrderForm({...orderForm, date: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Expected Delivery Date</label>
              <Input 
                type="date"
                value={orderForm.expectedDelivery}
                onChange={(e) => setOrderForm({...orderForm, expectedDelivery: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">Payment Terms</label>
              <Select value={orderForm.paymentTerms} onValueChange={(value) => setOrderForm({...orderForm, paymentTerms: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Shipment Preference</label>
              <Select value={orderForm.shipmentPreference} onValueChange={(value) => setOrderForm({...orderForm, shipmentPreference: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose the shipment preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard Shipping">Standard Shipping</SelectItem>
                  <SelectItem value="Express Shipping">Express Shipping</SelectItem>
                  <SelectItem value="Heavy Freight">Heavy Freight</SelectItem>
                  <SelectItem value="Air Freight">Air Freight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Item Table */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Item Table</h3>
              <Button onClick={addItem} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add New Row
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[25%]">ITEM DETAILS</TableHead>
                    <TableHead className="w-[15%]">ACCOUNT</TableHead>
                    <TableHead className="w-[10%]">QUANTITY</TableHead>
                    <TableHead className="w-[10%]">RATE</TableHead>
                    <TableHead className="w-[10%]">TAX</TableHead>
                    <TableHead className="w-[15%]">AMOUNT</TableHead>
                    <TableHead className="w-[15%]">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderForm.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={item.product}
                          onChange={(e) => updateItem(index, 'product', e.target.value)}
                          placeholder="Type or click to select an item."
                          className="border-0 focus:ring-0"
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={item.account} 
                          onValueChange={(value) => updateItem(index, 'account', value)}
                        >
                          <SelectTrigger className="border-0 focus:ring-0">
                            <SelectValue placeholder="Select an account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inventory">Inventory</SelectItem>
                            <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                            <SelectItem value="Equipment">Equipment</SelectItem>
                            <SelectItem value="Software">Software</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          placeholder="1"
                          className="border-0 focus:ring-0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', e.target.value)}
                          placeholder="0"
                          className="border-0 focus:ring-0"
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={item.tax} 
                          onValueChange={(value) => updateItem(index, 'tax', value)}
                        >
                          <SelectTrigger className="border-0 focus:ring-0">
                            <SelectValue placeholder="Select a Tax" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GST@0%">GST@0%</SelectItem>
                            <SelectItem value="GST@5%">GST@5%</SelectItem>
                            <SelectItem value="GST@12%">GST@12%</SelectItem>
                            <SelectItem value="GST@18%">GST@18%</SelectItem>
                            <SelectItem value="GST@28%">GST@28%</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <span className="text-lg font-semibold">
                          ₹{item.amount?.toFixed(2) || '0.00'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => removeItem(index)}
                          variant="ghost" 
                          size="sm"
                          disabled={orderForm.items.length === 1}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between">
                  <span>Sub Total:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Discount:</span>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="0" className="w-16 h-8" />
                    <span>%</span>
                    <span>₹{discount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Notes */}
          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              value={orderForm.notes}
              onChange={(e) => setOrderForm({...orderForm, notes: e.target.value})}
              placeholder="Will be displayed on the purchase order"
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => navigate("/purchase/orders")}>
              Cancel
            </Button>
            <Button variant="outline" onClick={() => handleCreateOrder("Draft")}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button onClick={() => handleCreateOrder("Open")}>
              Save and Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePurchaseOrder;
