
import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import GitHubForm from '@/components/GitHubForm';
import ChangelogOutput from '@/components/ChangelogOutput';
import { toast } from '@/hooks/use-toast';

// Mock function to simulate fetching from GitHub API and AI-generation
// In a real application, this would call the GitHub API and then process with AI
const generateChangelog = async (owner: string, repo: string, token?: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real implementation, the token would be used for GitHub API authentication
  console.log('Using token:', token ? 'Token provided' : 'No token provided');
  
  // Mock response - in a real app this would be from GitHub API + AI
  return [
    {
      type: 'feature',
      title: 'Add authentication system',
      description: 'Implemented OAuth 2.0 based authentication flow with GitHub and Google providers'
    },
    {
      type: 'improvement',
      title: 'Enhance performance of data loading',
      description: 'Optimized database queries and implemented caching to improve page load times by 40%'
    },
    {
      type: 'bugfix',
      title: 'Fix user profile image upload',
      description: 'Resolved issue where uploaded profile images weren\'t being processed correctly on mobile devices'
    },
    {
      type: 'feature',
      title: 'Add dark mode support',
      description: 'Implemented system-preference based theme switching with manual override option'
    },
    {
      type: 'improvement',
      title: 'Refactor component structure',
      description: 'Restructured components to improve code reusability and maintainability'
    }
  ];
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [changelog, setChangelog] = useState<any[] | null>(null);
  const [repoDetails, setRepoDetails] = useState<{ owner: string; name: string } | null>(null);

  const handleGenerate = async ({ repoOwner, repoName, token }: { repoOwner: string; repoName: string; token?: string }) => {
    setIsLoading(true);
    
    try {
      console.log('Repo details:', repoOwner + '/' + repoName);
      
      const generatedChangelog = await generateChangelog(repoOwner, repoName, token);
      
      setChangelog(generatedChangelog);
      setRepoDetails({ owner: repoOwner, name: repoName });
      
      toast({
        title: 'Changelog generated successfully!',
        description: `Generated ${generatedChangelog.length} changelog items for ${repoOwner}/${repoName}`,
      });
    } catch (error) {
      console.error('Error generating changelog:', error);
      
      toast({
        title: 'Error generating changelog',
        description: 'Failed to fetch repository data or generate the changelog',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      
      <main className="container py-8 flex-1">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">AI-Powered Changelog Generator</h2>
            <p className="text-muted-foreground">
              Generate beautiful, structured changelogs from your GitHub repository with AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <div>
              <GitHubForm 
                onGenerate={handleGenerate} 
                isLoading={isLoading} 
              />
              
              <div className="mt-4 text-sm text-center text-muted-foreground">
                <p>
                  Need help? See our
                  <a href="#" className="text-primary hover:underline ml-1">
                    documentation
                  </a>.
                </p>
              </div>
            </div>
            
            <div>
              <ChangelogOutput 
                isLoading={isLoading} 
                changelog={changelog} 
                repoDetails={repoDetails} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container text-center text-sm text-muted-foreground">
          <p>DevChangelog – AI-powered release notes generator for developers</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
