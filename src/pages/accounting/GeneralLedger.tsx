
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { book, plus } from "lucide-react";

const GeneralLedger = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <book className="h-8 w-8" />
          General Ledger
        </h1>
        <Button>
          <plus className="h-4 w-4 mr-2" />
          Add Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Current and fixed assets</p>
            <div className="mt-4">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Liabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Current and long-term liabilities</p>
            <div className="mt-4">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Owner's equity and retained earnings</p>
            <div className="mt-4">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Income and revenue accounts</p>
            <div className="mt-4">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Operating and other expenses</p>
            <div className="mt-4">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chart of Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Complete account structure</p>
            <div className="mt-4">
              <Button variant="outline" size="sm">View Chart</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneralLedger;
