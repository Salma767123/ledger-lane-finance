
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Calculator, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TDSManagement = () => {
  const { toast } = useToast();
  const [isTDSRateDialogOpen, setIsTDSRateDialogOpen] = useState(false);
  const [isTDSDeductionDialogOpen, setIsTDSDeductionDialogOpen] = useState(false);
  
  const [tdsRateData, setTdsRateData] = useState({
    section: "",
    description: "",
    rate: "",
    threshold: "",
    applicableOn: ""
  });

  const [tdsDeductionData, setTdsDeductionData] = useState({
    section: "",
    deductee: "",
    amount: "",
    tdsRate: "",
    tdsAmount: "",
    date: "",
    panNumber: "",
    tanNumber: ""
  });

  const handleAddTDSRate = () => {
    if (tdsRateData.section && tdsRateData.rate && tdsRateData.threshold) {
      console.log("Adding TDS rate:", tdsRateData);
      toast({
        title: "TDS Rate Added",
        description: "TDS rate has been added successfully.",
      });
      setTdsRateData({ section: "", description: "", rate: "", threshold: "", applicableOn: "" });
      setIsTDSRateDialogOpen(false);
    }
  };

  const handleTDSDeduction = () => {
    if (tdsDeductionData.section && tdsDeductionData.amount && tdsDeductionData.deductee) {
      console.log("Processing TDS deduction:", tdsDeductionData);
      toast({
        title: "TDS Deducted",
        description: "TDS deduction has been processed successfully.",
      });
      setTdsDeductionData({
        section: "",
        deductee: "",
        amount: "",
        tdsRate: "",
        tdsAmount: "",
        date: "",
        panNumber: "",
        tanNumber: ""
      });
      setIsTDSDeductionDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          TDS (Tax Deducted at Source) Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rates">TDS Rates</TabsTrigger>
            <TabsTrigger value="deductions">Deductions</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Rate Configuration</h4>
              <Dialog open={isTDSRateDialogOpen} onOpenChange={setIsTDSRateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add TDS Rate
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add TDS Rate</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>TDS Section *</Label>
                      <Select value={tdsRateData.section} onValueChange={(value) => setTdsRateData({...tdsRateData, section: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select TDS section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="194A">194A - Interest other than on Securities</SelectItem>
                          <SelectItem value="194C">194C - Payment to Contractors</SelectItem>
                          <SelectItem value="194H">194H - Commission or Brokerage</SelectItem>
                          <SelectItem value="194I">194I - Rent</SelectItem>
                          <SelectItem value="194J">194J - Professional/Technical Services</SelectItem>
                          <SelectItem value="194O">194O - E-commerce Operator</SelectItem>
                          <SelectItem value="194Q">194Q - Purchase of Goods</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input 
                        value={tdsRateData.description}
                        onChange={(e) => setTdsRateData({...tdsRateData, description: e.target.value})}
                        placeholder="Enter description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>TDS Rate (%) *</Label>
                        <Input 
                          type="number"
                          value={tdsRateData.rate}
                          onChange={(e) => setTdsRateData({...tdsRateData, rate: e.target.value})}
                          placeholder="Enter rate"
                        />
                      </div>
                      <div>
                        <Label>Threshold Amount *</Label>
                        <Input 
                          type="number"
                          value={tdsRateData.threshold}
                          onChange={(e) => setTdsRateData({...tdsRateData, threshold: e.target.value})}
                          placeholder="Enter threshold"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Applicable On</Label>
                      <Select value={tdsRateData.applicableOn} onValueChange={(value) => setTdsRateData({...tdsRateData, applicableOn: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select applicable on" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resident">Resident</SelectItem>
                          <SelectItem value="non-resident">Non-Resident</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleAddTDSRate} className="flex-1">
                        Add Rate
                      </Button>
                      <Button variant="outline" onClick={() => setIsTDSRateDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Rate (%)</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>194J</TableCell>
                  <TableCell>Professional Services</TableCell>
                  <TableCell>10%</TableCell>
                  <TableCell>₹30,000</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>194C</TableCell>
                  <TableCell>Contractor Payments</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>₹30,000</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="deductions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Deductions</h4>
              <Dialog open={isTDSDeductionDialogOpen} onOpenChange={setIsTDSDeductionDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Record Deduction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Record TDS Deduction</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>TDS Section *</Label>
                        <Select value={tdsDeductionData.section} onValueChange={(value) => setTdsDeductionData({...tdsDeductionData, section: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="194J">194J - Professional Services</SelectItem>
                            <SelectItem value="194C">194C - Contractor</SelectItem>
                            <SelectItem value="194A">194A - Interest</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Deductee Name *</Label>
                        <Input 
                          value={tdsDeductionData.deductee}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, deductee: e.target.value})}
                          placeholder="Enter deductee name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Payment Amount *</Label>
                        <Input 
                          type="number"
                          value={tdsDeductionData.amount}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, amount: e.target.value})}
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <Label>TDS Rate (%)</Label>
                        <Input 
                          type="number"
                          value={tdsDeductionData.tdsRate}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, tdsRate: e.target.value})}
                          placeholder="TDS rate"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>TDS Amount</Label>
                        <Input 
                          type="number"
                          value={tdsDeductionData.tdsAmount}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, tdsAmount: e.target.value})}
                          placeholder="TDS amount"
                        />
                      </div>
                      <div>
                        <Label>Date of Deduction</Label>
                        <Input 
                          type="date"
                          value={tdsDeductionData.date}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>PAN Number</Label>
                        <Input 
                          value={tdsDeductionData.panNumber}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, panNumber: e.target.value})}
                          placeholder="Enter PAN"
                        />
                      </div>
                      <div>
                        <Label>TAN Number</Label>
                        <Input 
                          value={tdsDeductionData.tanNumber}
                          onChange={(e) => setTdsDeductionData({...tdsDeductionData, tanNumber: e.target.value})}
                          placeholder="Enter TAN"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleTDSDeduction} className="flex-1">
                        Record Deduction
                      </Button>
                      <Button variant="outline" onClick={() => setIsTDSDeductionDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Deductee</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>TDS Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>ABC Consultants</TableCell>
                  <TableCell>194J</TableCell>
                  <TableCell>₹50,000</TableCell>
                  <TableCell>₹5,000</TableCell>
                  <TableCell>
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Paid</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="returns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Returns Filing</h4>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                File Return
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹15,000</div>
                    <div className="text-sm text-gray-600">TDS Collected This Quarter</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹12,000</div>
                    <div className="text-sm text-gray-600">TDS Deposited</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">₹3,000</div>
                    <div className="text-sm text-gray-600">TDS Pending</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TDSManagement;
