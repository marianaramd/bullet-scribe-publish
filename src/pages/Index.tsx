
import React, { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import GitHubForm from '@/components/GitHubForm';
import ChangelogOutput from '@/components/ChangelogOutput';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleGenerate = async ({ repoOwner, repoName, token }: { repoOwner: string; repoName: string; token?: string }) => {
    setIsLoading(true);
    
    try {
      console.log('Repo details:', repoOwner + '/' + repoName);
      
      const generatedChangelog = await generateChangelog(repoOwner, repoName, token);
      
      setChangelog(generatedChangelog);
      setRepoDetails({ owner: repoOwner, name: repoName });
      setActiveTab("changelog");
      
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
    <div className="flex flex-col h-screen">
      <AppHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="generate">Generate Changelog</TabsTrigger>
                {changelog && (
                  <TabsTrigger value="changelog">View Changelog</TabsTrigger>
                )}
              </TabsList>
              
              <div className="mt-6">
                <TabsContent value="dashboard">
                  <Dashboard />
                </TabsContent>
                
                <TabsContent value="generate">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Generate Changelog</h2>
                    <GitHubForm 
                      onGenerate={handleGenerate} 
                      isLoading={isLoading} 
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="changelog">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Changelog Result</h2>
                    <ChangelogOutput 
                      isLoading={isLoading} 
                      changelog={changelog} 
                      repoDetails={repoDetails} 
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
