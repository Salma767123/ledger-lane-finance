
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
import { Plus, FileText, Calculator, Download, Upload, Eye, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TDSManagement = () => {
  const { toast } = useToast();
  const [isTDSRateDialogOpen, setIsTDSRateDialogOpen] = useState(false);
  const [isTDSDeductionDialogOpen, setIsTDSDeductionDialogOpen] = useState(false);
  const [isFileReturnDialogOpen, setIsFileReturnDialogOpen] = useState(false);
  const [isViewCertificateDialogOpen, setIsViewCertificateDialogOpen] = useState(false);
  
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
    tanNumber: "",
    paymentMode: "",
    challanNumber: "",
    bankName: "",
    certificateNumber: ""
  });

  const [returnData, setReturnData] = useState({
    quarter: "",
    year: "",
    returnType: "",
    filingDate: "",
    acknowledgmentNumber: "",
    status: "draft"
  });

  // Calculate TDS amount automatically
  const calculateTDSAmount = () => {
    const amount = parseFloat(tdsDeductionData.amount) || 0;
    const rate = parseFloat(tdsDeductionData.tdsRate) || 0;
    const tdsAmount = (amount * rate) / 100;
    setTdsDeductionData(prev => ({...prev, tdsAmount: tdsAmount.toFixed(2)}));
  };

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
    if (tdsDeductionData.section && tdsDeductionData.amount && tdsDeductionData.deductee && tdsDeductionData.panNumber) {
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
        tanNumber: "",
        paymentMode: "",
        challanNumber: "",
        bankName: "",
        certificateNumber: ""
      });
      setIsTDSDeductionDialogOpen(false);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
    }
  };

  const handleFileReturn = () => {
    if (returnData.quarter && returnData.year && returnData.returnType) {
      console.log("Filing TDS return:", returnData);
      toast({
        title: "Return Filed",
        description: "TDS return has been filed successfully.",
      });
      setReturnData({
        quarter: "",
        year: "",
        returnType: "",
        filingDate: "",
        acknowledgmentNumber: "",
        status: "draft"
      });
      setIsFileReturnDialogOpen(false);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
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
            <TabsTrigger value="returns">Returns & Filing</TabsTrigger>
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
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Record TDS Deduction</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-3 text-sm text-gray-700">Basic Information</h5>
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
                              <SelectItem value="194I">194I - Rent</SelectItem>
                              <SelectItem value="194H">194H - Commission</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Date of Deduction *</Label>
                          <Input 
                            type="date"
                            value={tdsDeductionData.date}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, date: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Deductee Information */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-3 text-sm text-gray-700">Deductee Information</h5>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Deductee Name *</Label>
                          <Input 
                            value={tdsDeductionData.deductee}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, deductee: e.target.value})}
                            placeholder="Enter deductee name"
                          />
                        </div>
                        <div>
                          <Label>PAN Number *</Label>
                          <Input 
                            value={tdsDeductionData.panNumber}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, panNumber: e.target.value.toUpperCase()})}
                            placeholder="Enter PAN (e.g., ABCDE1234F)"
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment & TDS Details */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-3 text-sm text-gray-700">Payment & TDS Details</h5>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Payment Amount *</Label>
                          <Input 
                            type="number"
                            value={tdsDeductionData.amount}
                            onChange={(e) => {
                              setTdsDeductionData({...tdsDeductionData, amount: e.target.value});
                            }}
                            onBlur={calculateTDSAmount}
                            placeholder="Enter amount"
                          />
                        </div>
                        <div>
                          <Label>TDS Rate (%)</Label>
                          <Input 
                            type="number"
                            value={tdsDeductionData.tdsRate}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, tdsRate: e.target.value})}
                            onBlur={calculateTDSAmount}
                            placeholder="TDS rate"
                          />
                        </div>
                        <div>
                          <Label>TDS Amount</Label>
                          <Input 
                            type="number"
                            value={tdsDeductionData.tdsAmount}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, tdsAmount: e.target.value})}
                            placeholder="Calculated TDS amount"
                            className="bg-gray-50"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label>Payment Mode</Label>
                          <Select value={tdsDeductionData.paymentMode} onValueChange={(value) => setTdsDeductionData({...tdsDeductionData, paymentMode: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="cheque">Cheque</SelectItem>
                              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                              <SelectItem value="online">Online Payment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Certificate Number</Label>
                          <Input 
                            value={tdsDeductionData.certificateNumber}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, certificateNumber: e.target.value})}
                            placeholder="TDS certificate number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Challan & Bank Details */}
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-3 text-sm text-gray-700">Challan & Bank Details</h5>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>TAN Number</Label>
                          <Input 
                            value={tdsDeductionData.tanNumber}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, tanNumber: e.target.value.toUpperCase()})}
                            placeholder="Enter TAN"
                            maxLength={10}
                          />
                        </div>
                        <div>
                          <Label>Challan Number</Label>
                          <Input 
                            value={tdsDeductionData.challanNumber}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, challanNumber: e.target.value})}
                            placeholder="Enter challan number"
                          />
                        </div>
                        <div>
                          <Label>Bank Name</Label>
                          <Input 
                            value={tdsDeductionData.bankName}
                            onChange={(e) => setTdsDeductionData({...tdsDeductionData, bankName: e.target.value})}
                            placeholder="Enter bank name"
                          />
                        </div>
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
                  <TableHead>Certificate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-01-15</TableCell>
                  <TableCell>ABC Consultants</TableCell>
                  <TableCell>194J</TableCell>
                  <TableCell>₹50,000</TableCell>
                  <TableCell>₹5,000</TableCell>
                  <TableCell>TDS/001/2024</TableCell>
                  <TableCell>
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Paid</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-01-20</TableCell>
                  <TableCell>XYZ Contractors</TableCell>
                  <TableCell>194C</TableCell>
                  <TableCell>₹1,00,000</TableCell>
                  <TableCell>₹1,000</TableCell>
                  <TableCell>TDS/002/2024</TableCell>
                  <TableCell>
                    <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded text-xs">Pending</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="returns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TDS Returns Filing</h4>
              <div className="flex gap-2">
                <Dialog open={isFileReturnDialogOpen} onOpenChange={setIsFileReturnDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      File New Return
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>File TDS Return</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Return Type *</Label>
                          <Select value={returnData.returnType} onValueChange={(value) => setReturnData({...returnData, returnType: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select return type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="24Q">Form 24Q (Non-Salary)</SelectItem>
                              <SelectItem value="26Q">Form 26Q (Salary)</SelectItem>
                              <SelectItem value="27Q">Form 27Q (Other than Salary)</SelectItem>
                              <SelectItem value="27EQ">Form 27EQ (TCS)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Quarter *</Label>
                          <Select value={returnData.quarter} onValueChange={(value) => setReturnData({...returnData, quarter: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quarter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Q1">Q1 (Apr-Jun)</SelectItem>
                              <SelectItem value="Q2">Q2 (Jul-Sep)</SelectItem>
                              <SelectItem value="Q3">Q3 (Oct-Dec)</SelectItem>
                              <SelectItem value="Q4">Q4 (Jan-Mar)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Financial Year *</Label>
                          <Select value={returnData.year} onValueChange={(value) => setReturnData({...returnData, year: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2024-25">2024-25</SelectItem>
                              <SelectItem value="2023-24">2023-24</SelectItem>
                              <SelectItem value="2022-23">2022-23</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Filing Date</Label>
                          <Input 
                            type="date"
                            value={returnData.filingDate}
                            onChange={(e) => setReturnData({...returnData, filingDate: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Acknowledgment Number</Label>
                        <Input 
                          value={returnData.acknowledgmentNumber}
                          onChange={(e) => setReturnData({...returnData, acknowledgmentNumber: e.target.value})}
                          placeholder="Enter acknowledgment number (after filing)"
                        />
                      </div>
                      <div className="bg-blue-50 p-4 rounded">
                        <h6 className="font-medium text-blue-800 mb-2">Filing Instructions:</h6>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Ensure all TDS deductions for the quarter are recorded</li>
                          <li>• Verify challan details and payment status</li>
                          <li>• Generate and review the return before filing</li>
                          <li>• Keep acknowledgment receipt for records</li>
                        </ul>
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button onClick={handleFileReturn} className="flex-1">
                          File Return
                        </Button>
                        <Button variant="outline" onClick={() => setIsFileReturnDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
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
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4</div>
                    <div className="text-sm text-gray-600">Returns Filed</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Returns History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Returns Filing History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return Type</TableHead>
                      <TableHead>Quarter</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Filing Date</TableHead>
                      <TableHead>Acknowledgment No.</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Form 24Q</TableCell>
                      <TableCell>Q3</TableCell>
                      <TableCell>2023-24</TableCell>
                      <TableCell>2024-01-31</TableCell>
                      <TableCell>ACK123456789</TableCell>
                      <TableCell>
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Filed</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Form 26Q</TableCell>
                      <TableCell>Q2</TableCell>
                      <TableCell>2023-24</TableCell>
                      <TableCell>2023-10-31</TableCell>
                      <TableCell>ACK987654321</TableCell>
                      <TableCell>
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Filed</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TDSManagement;
