
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ConvertToBill = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { toast } = useToast();

  // Mock PO data - in real app, this would be fetched based on orderId
  const [poData] = useState({
    orderNo: "PO-001",
    vendor: "Tech Supplies Ltd",
    date: "2024-01-15",
    expectedDelivery: "2024-02-01",
    deliveryAddress: "123 Main St, City",
    items: [
      { product: "Product A", account: "Inventory", quantity: 10, rate: 4500, amount: 45000, tax: "GST@18%" }
    ]
  });

  const [billForm, setBillForm] = useState({
    billNo: "",
    billDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    paymentTerms: "Due on Receipt",
    reference: "",
    notes: "",
    items: poData.items.map(item => ({
      ...item,
      selected: true,
      billQuantity: item.quantity.toString(),
      billRate: item.rate.toString(),
      billAmount: item.amount
    }))
  });

  const calculateBillTotals = () => {
    const selectedItems = billForm.items.filter(item => item.selected);
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.billAmount || 0), 0);
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const updateBillItem = (index, field, value) => {
    const updatedItems = [...billForm.items];
    updatedItems[index][field] = value;
    
    if (field === 'billQuantity' || field === 'billRate') {
      updatedItems[index].billAmount = parseFloat(updatedItems[index].billQuantity || "0") * parseFloat(updatedItems[index].billRate || "0");
    }
    
    setBillForm({ ...billForm, items: updatedItems });
  };

  const toggleItemSelection = (index) => {
    const updatedItems = [...billForm.items];
    updatedItems[index].selected = !updatedItems[index].selected;
    setBillForm({ ...billForm, items: updatedItems });
  };

  const generateBillNumber = () => {
    return `BILL-${(Math.floor(Math.random() * 1000) + 1).toString().padStart(3, '0')}`;
  };

  const handleSaveAsDraft = () => {
    const selectedItems = billForm.items.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item to save as draft.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Draft Saved",
      description: `Bill draft ${billForm.billNo || generateBillNumber()} has been saved.`,
    });
  };

  const handleConvertToBill = () => {
    const selectedItems = billForm.items.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one item to convert to bill.",
        variant: "destructive"
      });
      return;
    }

    if (!billForm.billDate) {
      toast({
        title: "Error",
        description: "Please enter a bill date.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bill Created Successfully",
      description: `Bill ${billForm.billNo || generateBillNumber()} has been created from PO ${poData.orderNo}.`,
    });
    
    navigate("/purchase/bills");
  };

  const { subtotal, tax, total } = calculateBillTotals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/purchase/orders")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Convert PO to Bill
          </h1>
        </div>
      </div>

      {/* Purchase Order Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">PO Number</label>
              <Input value={poData.orderNo} disabled />
            </div>
            <div>
              <label className="text-sm font-medium">Vendor</label>
              <Input value={poData.vendor} disabled />
            </div>
            <div>
              <label className="text-sm font-medium">PO Date</label>
              <Input value={poData.date} disabled />
            </div>
            <div>
              <label className="text-sm font-medium">Expected Delivery</label>
              <Input value={poData.expectedDelivery} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bill Details */}
      <Card>
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-red-500">Bill Number*</label>
              <Input 
                value={billForm.billNo}
                onChange={(e) => setBillForm({...billForm, billNo: e.target.value})}
                placeholder={generateBillNumber()}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-red-500">Bill Date*</label>
              <Input 
                type="date"
                value={billForm.billDate}
                onChange={(e) => setBillForm({...billForm, billDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input 
                type="date"
                value={billForm.dueDate}
                onChange={(e) => setBillForm({...billForm, dueDate: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Payment Terms</label>
              <Select value={billForm.paymentTerms} onValueChange={(value) => setBillForm({...billForm, paymentTerms: value})}>
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
          </div>

          <div>
            <label className="text-sm font-medium">Reference</label>
            <Input 
              value={billForm.reference}
              onChange={(e) => setBillForm({...billForm, reference: e.target.value})}
              placeholder="Enter reference number"
            />
          </div>

          {/* Items Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Items to Bill</h3>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[5%]">SELECT</TableHead>
                    <TableHead className="w-[25%]">ITEM DETAILS</TableHead>
                    <TableHead className="w-[15%]">PO QTY</TableHead>
                    <TableHead className="w-[15%]">BILL QTY</TableHead>
                    <TableHead className="w-[10%]">RATE</TableHead>
                    <TableHead className="w-[10%]">TAX</TableHead>
                    <TableHead className="w-[20%]">AMOUNT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billForm.items.map((item, index) => (
                    <TableRow key={index} className={!item.selected ? "bg-gray-50 opacity-60" : ""}>
                      <TableCell>
                        <Checkbox 
                          checked={item.selected}
                          onCheckedChange={() => toggleItemSelection(index)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.product}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={item.billQuantity}
                          onChange={(e) => updateBillItem(index, 'billQuantity', e.target.value)}
                          disabled={!item.selected}
                          className="w-20"
                          max={item.quantity}
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={item.billRate}
                          onChange={(e) => updateBillItem(index, 'billRate', e.target.value)}
                          disabled={!item.selected}
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>{item.tax}</TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          ₹{item.selected ? item.billAmount?.toFixed(2) || '0.00' : '0.00'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between">
                  <span>Sub Total:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea 
              value={billForm.notes}
              onChange={(e) => setBillForm({...billForm, notes: e.target.value})}
              placeholder="Additional notes for the bill"
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => navigate("/purchase/orders")}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSaveAsDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button onClick={handleConvertToBill}>
              Convert to Bill
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConvertToBill;
