
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowRight } from 'lucide-react';

interface GitHubFormProps {
  onGenerate: (data: { repoOwner: string; repoName: string }) => void;
  isLoading: boolean;
}

const GitHubForm = ({ onGenerate, isLoading }: GitHubFormProps) => {
  const [repoInput, setRepoInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate and parse repo format (owner/name)
    const repoMatch = repoInput.match(/^([^/]+)\/([^/]+)$/);
    if (!repoMatch) {
      toast({
        title: 'Invalid Repository Format',
        description: 'Please enter repository in the format: owner/repo',
        variant: 'destructive',
      });
      return;
    }
    
    const [, repoOwner, repoName] = repoMatch;
    onGenerate({ repoOwner, repoName });
  };

  return (
    <Card className="w-full border-2 border-primary/10 shadow-lg bg-gradient-to-b from-card to-background">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-primary">Repository Details</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your GitHub repository to generate a beautiful changelog
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pb-2">
          <div className="space-y-1">
            <Label htmlFor="github-repo" className="text-sm font-medium">
              Repository
            </Label>
            <div className="relative">
              <Input
                id="github-repo"
                placeholder="owner/repo"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                className="font-mono pl-4 pr-4 focus-visible:ring-primary/50"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Format: <code>username/repository</code> or <code>organization/repository</code>
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button 
            type="submit" 
            className="w-full group transition-all hover:shadow-md"
            disabled={isLoading}
          >
            {isLoading ? 'Fetching & Generating...' : 
              <span className="flex items-center gap-2">
                Fetch & Generate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            }
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GitHubForm;
