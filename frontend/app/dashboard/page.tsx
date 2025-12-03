'use client';

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Users, Store } from 'lucide-react';

export default function DashboardPage() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/metrics');
      return response.data;
    },
  });

  const { data: alerts } = useQuery({
    queryKey: ['dashboard-alerts'],
    queryFn: async () => {
      const response = await apiClient.get('/dashboard/alerts');
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const kpiCards = [
    {
      title: 'Total Sales',
      value: `₹${metrics?.totalSales?.toLocaleString() || 0}`,
      description: 'Gross Merchandise Value',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: metrics?.totalOrders || 0,
      description: 'All time orders',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Users',
      value: metrics?.totalUsers || 0,
      description: 'Registered users',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Products',
      value: metrics?.totalProducts || 0,
      description: 'Listed products',
      icon: Store,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Woodzon Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest system notifications</CardDescription>
          </CardHeader>
          <CardContent>
            {alerts && alerts.length > 0 ? (
              <div className="space-y-4">
                {alerts.slice(0, 5).map((alert: any) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No recent alerts</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 text-left rounded-lg border hover:bg-slate-50 transition-colors">
                <p className="font-medium text-sm">Approve Sellers</p>
                <p className="text-xs text-muted-foreground">Review pending applications</p>
              </button>
              <button className="p-4 text-left rounded-lg border hover:bg-slate-50 transition-colors">
                <p className="font-medium text-sm">Approve Products</p>
                <p className="text-xs text-muted-foreground">Review new listings</p>
              </button>
              <button className="p-4 text-left rounded-lg border hover:bg-slate-50 transition-colors">
                <p className="font-medium text-sm">Manage Orders</p>
                <p className="text-xs text-muted-foreground">View and update orders</p>
              </button>
              <button className="p-4 text-left rounded-lg border hover:bg-slate-50 transition-colors">
                <p className="font-medium text-sm">Handle Refunds</p>
                <p className="text-xs text-muted-foreground">Process refund requests</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
