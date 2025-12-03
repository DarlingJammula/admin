'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export default function SellersPage() {
  const queryClient = useQueryClient();
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const { data: sellers, isLoading } = useQuery({
    queryKey: ['sellers'],
    queryFn: async () => {
      const response = await apiClient.get('/sellers/applications');
      return response.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => apiClient.patch(`/sellers/applications/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellers'] });
      setSelectedSeller(null);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      apiClient.patch(`/sellers/applications/${id}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellers'] });
      setSelectedSeller(null);
      setShowRejectDialog(false);
      setRejectReason('');
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      PENDING: 'default',
      APPROVED: 'success',
      REJECTED: 'destructive',
      NEEDS_INFO: 'warning',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Seller Approvals</h1>
        <p className="text-muted-foreground">Review and approve seller applications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {sellers && sellers.length > 0 ? (
            sellers.map((seller: any) => (
              <Card
                key={seller.id}
                className={`cursor-pointer transition-all ${
                  selectedSeller?.id === seller.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSeller(seller)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{seller.businessName}</CardTitle>
                      <CardDescription>{seller.user.email}</CardDescription>
                    </div>
                    {getStatusBadge(seller.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    <p>Tax ID: {seller.taxId || 'N/A'}</p>
                    <p>Submitted: {new Date(seller.createdAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No seller applications found
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {selectedSeller ? (
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Business Name</p>
                  <p className="text-sm text-muted-foreground">{selectedSeller.businessName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Business Address</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSeller.businessAddress || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tax ID (PAN/GST)</p>
                  <p className="text-sm text-muted-foreground">{selectedSeller.taxId || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  {getStatusBadge(selectedSeller.status)}
                </div>
                {selectedSeller.documents && selectedSeller.documents.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Documents</p>
                    <div className="space-y-2">
                      {selectedSeller.documents.map((doc: string, idx: number) => (
                        <a
                          key={idx}
                          href={doc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline block"
                        >
                          Document {idx + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {selectedSeller.status === 'PENDING' && (
                  <div className="flex gap-2 pt-4">
                    <Button
                      className="flex-1"
                      onClick={() => approveMutation.mutate(selectedSeller.id)}
                      disabled={approveMutation.isPending}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => setShowRejectDialog(true)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Select an application to view details
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>Please provide a reason for rejection</DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                rejectMutation.mutate({ id: selectedSeller.id, reason: rejectReason })
              }
              disabled={!rejectReason || rejectMutation.isPending}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
