import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Check, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface LinkRequest {
  id: string;
  parent_id: string;
  status: string;
  created_at: string;
  parent_profile: {
    full_name: string;
    email: string;
  } | null;
}

export function LinkRequestNotifications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch pending link requests for this student
  const { data: requests, isLoading } = useQuery({
    queryKey: ['link-requests', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('parent_link_requests')
        .select('id, parent_id, status, created_at')
        .eq('student_id', user.id)
        .eq('status', 'pending');

      if (error) throw error;
      if (!data || data.length === 0) return [];

      // Get parent profiles
      const parentIds = data.map(r => r.parent_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, email')
        .in('id', parentIds);

      return data.map(request => ({
        ...request,
        parent_profile: profiles?.find(p => p.id === request.parent_id) || null,
      })) as LinkRequest[];
    },
    enabled: !!user?.id,
  });

  // Mutation to respond to a request
  const respondMutation = useMutation({
    mutationFn: async ({ requestId, accept, parentId }: { requestId: string; accept: boolean; parentId: string }) => {
      // Update the request status
      const { error: updateError } = await supabase
        .from('parent_link_requests')
        .update({ 
          status: accept ? 'accepted' : 'rejected',
          responded_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (updateError) throw updateError;

      // If accepted, create the actual parent-student link
      if (accept && user?.id) {
        const { error: linkError } = await supabase
          .from('parent_student_links')
          .insert({
            parent_id: parentId,
            student_id: user.id,
          });

        if (linkError) throw linkError;
      }
    },
    onSuccess: (_, { accept }) => {
      toast.success(accept ? 'Parent linked successfully!' : 'Request declined');
      queryClient.invalidateQueries({ queryKey: ['link-requests'] });
    },
    onError: (error) => {
      console.error('Error responding to request:', error);
      toast.error('Failed to respond to request');
    },
  });

  if (isLoading) return null;
  if (!requests || requests.length === 0) return null;

  return (
    <Card className="mb-6 border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserPlus className="h-5 w-5 text-primary" />
          Parent Link Requests
        </CardTitle>
        <CardDescription>
          Parents are requesting to link with your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {requests.map((request) => (
          <div 
            key={request.id}
            className="flex items-center justify-between rounded-lg border bg-card p-3"
          >
            <div>
              <p className="font-medium">
                {request.parent_profile?.full_name || 'Unknown Parent'}
              </p>
              <p className="text-sm text-muted-foreground">
                {request.parent_profile?.email}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => respondMutation.mutate({ 
                  requestId: request.id, 
                  accept: false,
                  parentId: request.parent_id 
                })}
                disabled={respondMutation.isPending}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => respondMutation.mutate({ 
                  requestId: request.id, 
                  accept: true,
                  parentId: request.parent_id 
                })}
                disabled={respondMutation.isPending}
              >
                {respondMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}