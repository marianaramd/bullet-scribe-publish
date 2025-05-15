
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface GitHubFormProps {
  onGenerate: (data: { token: string; repoOwner: string; repoName: string }) => void;
  isLoading: boolean;
}

const GitHubForm = ({ onGenerate, isLoading }: GitHubFormProps) => {
  const [token, setToken] = useState('');
  const [repoInput, setRepoInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate token
    if (!token.trim()) {
      toast({
        title: 'Missing Personal Access Token',
        description: 'Please enter your GitHub Personal Access Token',
        variant: 'destructive',
      });
      return;
    }
    
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
    onGenerate({ token, repoOwner, repoName });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>GitHub Repository Details</CardTitle>
        <CardDescription>
          Enter your GitHub personal access token and repository details to generate a changelog
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github-token">GitHub Personal Access Token</Label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_***********************************"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              autoComplete="off"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Needs <code>repo</code> scope permissions
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="github-repo">Repository</Label>
            <Input
              id="github-repo"
              placeholder="owner/repo"
              value={repoInput}
              onChange={(e) => setRepoInput(e.target.value)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Format: <code>username/repository</code> or <code>organization/repository</code>
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Fetching & Generating...' : 'Fetch & Generate'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GitHubForm;
