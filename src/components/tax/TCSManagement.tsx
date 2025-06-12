
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
import { Plus, FileText, TrendingUp, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TCSManagement = () => {
  const { toast } = useToast();
  const [isTCSRateDialogOpen, setIsTCSRateDialogOpen] = useState(false);
  const [isTCSCollectionDialogOpen, setIsTCSCollectionDialogOpen] = useState(false);
  
  const [tcsRateData, setTcsRateData] = useState({
    section: "",
    description: "",
    rate: "",
    threshold: "",
    applicableOn: ""
  });

  const [tcsCollectionData, setTcsCollectionData] = useState({
    section: "",
    buyer: "",
    saleAmount: "",
    tcsRate: "",
    tcsAmount: "",
    date: "",
    invoiceNumber: "",
    buyerPAN: ""
  });

  const handleAddTCSRate = () => {
    if (tcsRateData.section && tcsRateData.rate && tcsRateData.threshold) {
      console.log("Adding TCS rate:", tcsRateData);
      toast({
        title: "TCS Rate Added",
        description: "TCS rate has been added successfully.",
      });
      setTcsRateData({ section: "", description: "", rate: "", threshold: "", applicableOn: "" });
      setIsTCSRateDialogOpen(false);
    }
  };

  const handleTCSCollection = () => {
    if (tcsCollectionData.section && tcsCollectionData.saleAmount && tcsCollectionData.buyer) {
      console.log("Processing TCS collection:", tcsCollectionData);
      toast({
        title: "TCS Collected",
        description: "TCS collection has been recorded successfully.",
      });
      setTcsCollectionData({
        section: "",
        buyer: "",
        saleAmount: "",
        tcsRate: "",
        tcsAmount: "",
        date: "",
        invoiceNumber: "",
        buyerPAN: ""
      });
      setIsTCSCollectionDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          TCS (Tax Collected at Source) Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="rates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rates">TCS Rates</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TCS Rate Configuration</h4>
              <Dialog open={isTCSRateDialogOpen} onOpenChange={setIsTCSRateDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add TCS Rate
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add TCS Rate</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>TCS Section *</Label>
                      <Select value={tcsRateData.section} onValueChange={(value) => setTcsRateData({...tcsRateData, section: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select TCS section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="206C(1)">206C(1) - Sale of Goods</SelectItem>
                          <SelectItem value="206C(1H)">206C(1H) - E-commerce Operator</SelectItem>
                          <SelectItem value="206C(1A)">206C(1A) - Sale of Alcoholic Liquor</SelectItem>
                          <SelectItem value="206C(1B)">206C(1B) - Sale of Tendu Leaves</SelectItem>
                          <SelectItem value="206C(1C)">206C(1C) - Sale of Timber</SelectItem>
                          <SelectItem value="206C(1D)">206C(1D) - Sale of Iron Ore</SelectItem>
                          <SelectItem value="206C(1E)">206C(1E) - Sale of Minerals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Input 
                        value={tcsRateData.description}
                        onChange={(e) => setTcsRateData({...tcsRateData, description: e.target.value})}
                        placeholder="Enter description"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>TCS Rate (%) *</Label>
                        <Input 
                          type="number"
                          value={tcsRateData.rate}
                          onChange={(e) => setTcsRateData({...tcsRateData, rate: e.target.value})}
                          placeholder="Enter rate"
                        />
                      </div>
                      <div>
                        <Label>Threshold Amount *</Label>
                        <Input 
                          type="number"
                          value={tcsRateData.threshold}
                          onChange={(e) => setTcsRateData({...tcsRateData, threshold: e.target.value})}
                          placeholder="Enter threshold"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Applicable On</Label>
                      <Select value={tcsRateData.applicableOn} onValueChange={(value) => setTcsRateData({...tcsRateData, applicableOn: value})}>
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
                      <Button onClick={handleAddTCSRate} className="flex-1">
                        Add Rate
                      </Button>
                      <Button variant="outline" onClick={() => setIsTCSRateDialogOpen(false)} className="flex-1">
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
                  <TableCell>206C(1)</TableCell>
                  <TableCell>Sale of Goods</TableCell>
                  <TableCell>0.1%</TableCell>
                  <TableCell>₹50,00,000</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>206C(1H)</TableCell>
                  <TableCell>E-commerce Operator</TableCell>
                  <TableCell>1%</TableCell>
                  <TableCell>₹5,00,000</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="collections" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TCS Collections</h4>
              <Dialog open={isTCSCollectionDialogOpen} onOpenChange={setIsTCSCollectionDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Record Collection
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Record TCS Collection</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>TCS Section *</Label>
                        <Select value={tcsCollectionData.section} onValueChange={(value) => setTcsCollectionData({...tcsCollectionData, section: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="206C(1)">206C(1) - Sale of Goods</SelectItem>
                            <SelectItem value="206C(1H)">206C(1H) - E-commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Buyer Name *</Label>
                        <Input 
                          value={tcsCollectionData.buyer}
                          onChange={(e) => setTcsCollectionData({...tcsCollectionData, buyer: e.target.value})}
                          placeholder="Enter buyer name"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Sale Amount *</Label>
                        <Input 
                          type="number"
                          value={tcsCollectionData.saleAmount}
                          onChange={(e) => setTcsCollectionData({...tcsCollectionData, saleAmount: e.target.value})}
                          placeholder="Enter sale amount"
                        />
                      </div>
                      <div>
                        <Label>TCS Rate (%)</Label>
                        <Input 
                          type="number"
                          value={tcsCollectionData.tcsRate}
                          onChange={(e) => setTcsCollectionData({...tcsCollectionData, tcsRate: e.target.value})}
                          placeholder="TCS rate"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>TCS Amount</Label>
                        <Input 
                          type="number"
                          value={tcsCollectionData.tcsAmount}
                          onChange={(e) => setTcsCollectionData({...tcsCollectionData, tcsAmount: e.target.value})}
                          placeholder="TCS amount"
                        />
                      </div>
                      <div>
                        <Label>Date of Collection</Label>
                        <Input 
                          type="date"
                          value={tcsCollectionData.date}
                          onChange={(e) => setTcsCollectionData({...tcsCollectionData, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Invoice Number</Label>
                        <Input 
                          value={tcsCollectionData.invoiceNumber}
                          onChange={(e) => setTcsCollectionData({...tcsCollectionData, invoiceNumber: e.target.value})}
                          placeholder="Enter invoice number"
                        />
                      </div>
                      <div>
                        <Label>Buyer PAN</Label>
                        <Input 
                          value={tcsCollectionData.buyerPAN}
                          onChange={(e) => setTcsCollectionData({...tcsCollectionData, buyerPAN: e.target.value})}
                          placeholder="Enter buyer PAN"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleTCSCollection} className="flex-1">
                        Record Collection
                      </Button>
                      <Button variant="outline" onClick={() => setIsTCSCollectionDialogOpen(false)} className="flex-1">
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
                  <TableHead>Buyer</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Sale Amount</TableHead>
                  <TableHead>TCS Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-01-10</TableCell>
                  <TableCell>XYZ Trading Co.</TableCell>
                  <TableCell>206C(1)</TableCell>
                  <TableCell>₹6,00,000</TableCell>
                  <TableCell>₹600</TableCell>
                  <TableCell>
                    <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">Collected</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="returns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">TCS Returns Filing</h4>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-2" />
                File Return
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">₹8,500</div>
                    <div className="text-sm text-gray-600">TCS Collected This Quarter</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹7,000</div>
                    <div className="text-sm text-gray-600">TCS Deposited</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">₹1,500</div>
                    <div className="text-sm text-gray-600">TCS Pending</div>
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

export default TCSManagement;
