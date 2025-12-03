'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RefundsPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Refunds & Returns</h1>
        <p className="text-muted-foreground">Manage refund requests</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Refund Requests</CardTitle>
          <CardDescription>Refund management interface</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Refund management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
