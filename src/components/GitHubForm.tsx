
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowRight, Code, Github } from 'lucide-react';

interface GitHubFormProps {
  onGenerate: (data: { repoOwner: string; repoName: string; token?: string }) => void;
  isLoading: boolean;
}

const GitHubForm = ({ onGenerate, isLoading }: GitHubFormProps) => {
  const [repoInput, setRepoInput] = useState('');
  const [token, setToken] = useState('');

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
    onGenerate({ repoOwner, repoName, token: token.trim() || undefined });
  };

  return (
    <Card className="w-full border-2 border-primary/20 shadow-xl bg-gradient-to-br from-card to-background/60 hover:shadow-lg transition-all">
      <CardHeader className="pb-4 space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <Github className="h-5 w-5 text-primary" />
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Repository Details</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Enter your GitHub repository and access token to generate a beautiful changelog
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github-repo" className="text-sm font-medium flex items-center gap-1">
              <Code className="h-4 w-4" /> Repository
            </Label>
            <div className="relative">
              <Input
                id="github-repo"
                placeholder="owner/repo"
                value={repoInput}
                onChange={(e) => setRepoInput(e.target.value)}
                className="font-mono pl-4 pr-4 focus-visible:ring-primary/50 transition-all"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Format: <code className="px-1 py-0.5 bg-muted rounded text-xs">username/repository</code> or <code className="px-1 py-0.5 bg-muted rounded text-xs">organization/repository</code>
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="github-token" className="text-sm font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg> Personal Access Token
            </Label>
            <Input
              id="github-token"
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="font-mono focus-visible:ring-primary/50 transition-all"
            />
            <p className="text-xs text-muted-foreground">
              Your token is never stored and only used to access the repo data
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button 
            type="submit" 
            className="w-full group transition-all hover:shadow-md border-primary/20 hover:bg-primary/90"
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
