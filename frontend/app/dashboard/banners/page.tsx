'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BannersPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CMS Banners</h1>
        <p className="text-muted-foreground">Manage promotional banners</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <CardDescription>Banner management interface</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Banner management interface coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
