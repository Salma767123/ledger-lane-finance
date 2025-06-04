
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings, users, database, tag } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <settings className="h-8 w-8" />
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <users className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure company details, logo, and contact information.</p>
            <div className="mt-4">
              <Button variant="outline">Edit Company Info</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage user accounts, roles, and permissions.</p>
            <div className="mt-4">
              <Button variant="outline">Manage Users</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <tag className="h-5 w-5" />
              Tax Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Set up tax rates, GST settings, and tax preferences.</p>
            <div className="mt-4">
              <Button variant="outline">Configure Taxes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Backup, restore, and manage your accounting data.</p>
            <div className="mt-4">
              <Button variant="outline">Data Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Gateway</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure payment methods and gateway settings.</p>
            <div className="mt-4">
              <Button variant="outline">Payment Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Customize email templates for invoices and notifications.</p>
            <div className="mt-4">
              <Button variant="outline">Edit Templates</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Number Formats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Configure invoice, estimate, and order numbering.</p>
            <div className="mt-4">
              <Button variant="outline">Number Settings</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Connect with third-party applications and services.</p>
            <div className="mt-4">
              <Button variant="outline">Manage Integrations</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
