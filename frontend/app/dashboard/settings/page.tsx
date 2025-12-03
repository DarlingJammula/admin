'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings (RBAC)</h1>
        <p className="text-muted-foreground">Manage roles and permissions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Role-Based Access Control</CardTitle>
          <CardDescription>RBAC configuration interface</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">RBAC configuration interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
