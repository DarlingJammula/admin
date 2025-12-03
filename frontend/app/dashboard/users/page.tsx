'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UsersPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage buyers and sellers</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>User management interface</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">User management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
