
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrendingUp, TrendingDown, DollarSign, CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const BalanceSheet = () => {
  const [asOfDate, setAsOfDate] = useState<Date>(new Date());

  const balanceSheetData = {
    assets: {
      currentAssets: [
        { name: "Cash in Hand", amount: 50000 },
        { name: "Bank Account - SBI", amount: 250000 },
        { name: "Accounts Receivable", amount: 120000 },
        { name: "Inventory", amount: 85000 },
        { name: "Prepaid Insurance", amount: 15000 }
      ],
      fixedAssets: [
        { name: "Office Equipment", amount: 300000 },
        { name: "Buildings", amount: 1500000 },
        { name: "Less: Accumulated Depreciation", amount: -50000 }
      ],
      otherAssets: [
        { name: "Investments", amount: 100000 },
        { name: "Intangible Assets", amount: 75000 }
      ]
    },
    liabilities: {
      currentLiabilities: [
        { name: "Accounts Payable", amount: 75000 },
        { name: "Accrued Expenses", amount: 25000 },
        { name: "Short-term Loans", amount: 50000 }
      ],
      longTermLiabilities: [
        { name: "Bank Loan", amount: 500000 },
        { name: "Mortgage Payable", amount: 800000 }
      ]
    },
    equity: [
      { name: "Owner's Capital", amount: 1000000 },
      { name: "Retained Earnings", amount: 350000 },
      { name: "Current Year Earnings", amount: 195000 }
    ]
  };

  const totalCurrentAssets = balanceSheetData.assets.currentAssets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalFixedAssets = balanceSheetData.assets.fixedAssets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalOtherAssets = balanceSheetData.assets.otherAssets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets + totalOtherAssets;

  const totalCurrentLiabilities = balanceSheetData.liabilities.currentLiabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const totalLongTermLiabilities = balanceSheetData.liabilities.longTermLiabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = balanceSheetData.equity.reduce((sum, equity) => sum + equity.amount, 0);

  const formatCurrency = (amount: number) => {
    return `₹${Math.abs(amount).toLocaleString()}${amount < 0 ? ' (Cr)' : ''}`;
  };

  const AccountSection = ({ title, items, total, isSubSection = false }: {
    title: string;
    items: { name: string; amount: number }[];
    total: number;
    isSubSection?: boolean;
  }) => (
    <div className={`space-y-2 ${isSubSection ? 'ml-4' : ''}`}>
      <h4 className={`font-semibold ${isSubSection ? 'text-sm' : 'text-base'} text-gray-700`}>{title}</h4>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between py-1">
          <span className={`${isSubSection ? 'ml-4' : 'ml-2'} text-gray-600`}>{item.name}</span>
          <span className="font-medium">{formatCurrency(item.amount)}</span>
        </div>
      ))}
      <div className="flex justify-between py-2 border-t border-gray-300 font-semibold">
        <span className={isSubSection ? 'ml-2' : ''}>Total {title}</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          Balance Sheet
        </h1>
        <div className="flex gap-4 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium">As of Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !asOfDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {asOfDate ? format(asOfDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={asOfDate}
                  onSelect={setAsOfDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button variant="outline" className="mt-6">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAssets)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingDown className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalLiabilities)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Equity</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalEquity)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <AccountSection 
              title="Current Assets" 
              items={balanceSheetData.assets.currentAssets} 
              total={totalCurrentAssets}
              isSubSection={true}
            />
            <AccountSection 
              title="Fixed Assets" 
              items={balanceSheetData.assets.fixedAssets} 
              total={totalFixedAssets}
              isSubSection={true}
            />
            <AccountSection 
              title="Other Assets" 
              items={balanceSheetData.assets.otherAssets} 
              total={totalOtherAssets}
              isSubSection={true}
            />
            <div className="border-t-2 border-gray-900 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL ASSETS</span>
                <span>{formatCurrency(totalAssets)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Liabilities & Equity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Liabilities</h3>
              <AccountSection 
                title="Current Liabilities" 
                items={balanceSheetData.liabilities.currentLiabilities} 
                total={totalCurrentLiabilities}
                isSubSection={true}
              />
              <div className="mt-4">
                <AccountSection 
                  title="Long-term Liabilities" 
                  items={balanceSheetData.liabilities.longTermLiabilities} 
                  total={totalLongTermLiabilities}
                  isSubSection={true}
                />
              </div>
              <div className="flex justify-between py-2 border-t border-gray-400 font-semibold mt-4">
                <span>Total Liabilities</span>
                <span>{formatCurrency(totalLiabilities)}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Equity</h3>
              <div className="space-y-2">
                {balanceSheetData.equity.map((item, index) => (
                  <div key={index} className="flex justify-between py-1">
                    <span className="ml-2 text-gray-600">{item.name}</span>
                    <span className="font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-t border-gray-300 font-semibold">
                  <span>Total Equity</span>
                  <span>{formatCurrency(totalEquity)}</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-900 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>TOTAL LIABILITIES & EQUITY</span>
                <span>{formatCurrency(totalLiabilities + totalEquity)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Balance Sheet as of {asOfDate ? format(asOfDate, "MMMM dd, yyyy") : "Current Date"}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Assets = Liabilities + Equity | Balance Check: {totalAssets === (totalLiabilities + totalEquity) ? "✓ Balanced" : "⚠ Unbalanced"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceSheet;
