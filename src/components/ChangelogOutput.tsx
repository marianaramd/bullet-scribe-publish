
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChangelogItem {
  type: 'feature' | 'improvement' | 'bugfix';
  title: string;
  description: string;
}

interface ChangelogOutputProps {
  isLoading: boolean;
  changelog: ChangelogItem[] | null;
  repoDetails: { owner: string; name: string } | null;
}

const ChangelogOutput = ({ isLoading, changelog, repoDetails }: ChangelogOutputProps) => {
  const formatDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  };
  
  const handlePublish = () => {
    // In a real app, this would push to GitHub or another service
    toast({
      title: 'Changelog published!',
      description: 'Your changelog has been published successfully.',
      variant: 'default',
    });
  };
  
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <Skeleton className="h-6 w-60" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="changelog-item">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
  
  if (!changelog || changelog.length === 0) {
    return null;
  }
  
  const getTagClass = (type: string) => {
    switch (type) {
      case 'feature':
        return 'tag-feature';
      case 'improvement':
        return 'tag-improvement';
      case 'bugfix':
        return 'tag-bugfix';
      default:
        return 'tag-feature';
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {repoDetails ? `${repoDetails.owner}/${repoDetails.name} - ${formatDate()}` : 'Changelog'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {changelog.map((item, index) => (
          <div key={index} className="changelog-item">
            <div className="changelog-item-header">
              <span className={getTagClass(item.type)}>
                {item.type.toUpperCase()}
              </span>
              <span>{item.title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full flex items-center gap-2" 
          onClick={handlePublish}
        >
          <Check className="h-4 w-4" />
          Publish Changelog
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChangelogOutput;
