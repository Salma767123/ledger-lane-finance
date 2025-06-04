
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, ChartBar, Users, Wallet, TrendingUp, TrendingDown, FileText, Receipt } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Revenue",
      value: "$124,500",
      change: "+12.5%",
      trend: "up",
      icon: Wallet,
    },
    {
      title: "Total Expenses",
      value: "$78,200",
      change: "-8.2%",
      trend: "down",
      icon: TrendingDown,
    },
    {
      title: "Active Customers",
      value: "248",
      change: "+5.2%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Pending Invoices",
      value: "32",
      change: "-15.1%",
      trend: "down",
      icon: ChartBar,
    },
  ];

  const recentTransactions = [
    { id: 1, customer: "ABC Corp", amount: "$2,400", type: "Invoice", status: "Paid" },
    { id: 2, customer: "XYZ Ltd", amount: "$1,200", type: "Estimate", status: "Pending" },
    { id: 3, customer: "Tech Solutions", amount: "$800", type: "Payment", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex gap-3">
          <Button variant="outline">Export Report</Button>
          <Button>Quick Invoice</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.customer}</p>
                    <p className="text-sm text-gray-500">{transaction.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{transaction.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === "Paid" || transaction.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChartBar className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-sm">New Invoice</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Add Customer</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Receipt className="h-5 w-5" />
                <span className="text-sm">Record Payment</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <ChartBar className="h-5 w-5" />
                <span className="text-sm">View Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
