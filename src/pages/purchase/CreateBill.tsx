
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateBill = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [billForm, setBillForm] = useState({
    billNo: "",
    vendor: "",
    billDate: new Date().toISOString().split('T')[0],
    dueDate: "",
    paymentTerms: "Due on Receipt",
    reference: "",
    notes: "",
    items: [
      { product: "", description: "", quantity: "", rate: "", tax: "GST@18%", amount: 0 }
    ]
  });

  const addItem = () => {
    setBillForm({
      ...billForm,
      items: [
        ...billForm.items,
        { product: "", description: "", quantity: "", rate: "", tax: "GST@18%", amount: 0 }
      ]
    });
  };

  const removeItem = (index) => {
    if (billForm.items.length > 1) {
      const updatedItems = billForm.items.filter((_, i) => i !== index);
      setBillForm({ ...billForm, items: updatedItems });
    }
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...billForm.items];
    updatedItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      updatedItems[index].amount = parseFloat(updatedItems[index].quantity || "0") * parseFloat(updatedItems[index].rate || "0");
    }
    
    setBillForm({ ...billForm, items: updatedItems });
  };

  const calculateTotals = () => {
    const subtotal = billForm.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const handleSave = () => {
    if (!billForm.billNo || !billForm.vendor || !billForm.billDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bill Created",
      description: `Bill ${billForm.billNo} has been created successfully.`,
    });
    
    navigate("/purchase/bills");
  };

  const handleSaveAsDraft = () => {
    toast({
      title: "Draft Saved",
      description: `Bill draft has been saved.`,
    });
  };

  const { subtotal, tax, total } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/purchase/bills")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bills
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create Bill</h1>
        </div>
      </div>

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
                placeholder="Enter bill number"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-red-500">Vendor*</label>
              <Select value={billForm.vendor} onValueChange={(value) => setBillForm({...billForm, vendor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech Supplies Ltd">Tech Supplies Ltd</SelectItem>
                  <SelectItem value="Office Solutions">Office Solutions</SelectItem>
                  <SelectItem value="Hardware Corp">Hardware Corp</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="text-sm font-medium">Reference</label>
              <Input 
                value={billForm.reference}
                onChange={(e) => setBillForm({...billForm, reference: e.target.value})}
                placeholder="Enter reference number"
              />
            </div>
          </div>

          {/* Items Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Items</h3>
              <Button onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="w-[25%]">PRODUCT/SERVICE</TableHead>
                    <TableHead className="w-[20%]">DESCRIPTION</TableHead>
                    <TableHead className="w-[10%]">QTY</TableHead>
                    <TableHead className="w-[15%]">RATE</TableHead>
                    <TableHead className="w-[10%]">TAX</TableHead>
                    <TableHead className="w-[15%]">AMOUNT</TableHead>
                    <TableHead className="w-[5%]">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billForm.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input 
                          value={item.product}
                          onChange={(e) => updateItem(index, 'product', e.target.value)}
                          placeholder="Enter product/service"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          value={item.description}
                          onChange={(e) => updateItem(index, 'description', e.target.value)}
                          placeholder="Description"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                          placeholder="0"
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', e.target.value)}
                          placeholder="0.00"
                          className="w-24"
                        />
                      </TableCell>
                      <TableCell>
                        <Select value={item.tax} onValueChange={(value) => updateItem(index, 'tax', value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GST@18%">GST@18%</SelectItem>
                            <SelectItem value="GST@12%">GST@12%</SelectItem>
                            <SelectItem value="GST@5%">GST@5%</SelectItem>
                            <SelectItem value="Exempt">Exempt</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">₹{item.amount?.toFixed(2) || '0.00'}</span>
                      </TableCell>
                      <TableCell>
                        {billForm.items.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
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
            <Button variant="outline" onClick={() => navigate("/purchase/bills")}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleSaveAsDraft}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button onClick={handleSave}>
              Save Bill
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBill;
