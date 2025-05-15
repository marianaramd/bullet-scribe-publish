
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Check, Calendar, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MarkdownEditor from './MarkdownEditor';

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
  
  // Generate markdown template from changelog items
  const generateMarkdown = (items: ChangelogItem[]) => {
    const date = formatDate();
    const repo = repoDetails ? `${repoDetails.owner}/${repoDetails.name}` : 'Repository';
    
    let markdown = `# ${repo} Changelog\n\n`;
    markdown += `## ${date}\n\n`;
    
    // Group by type
    const features = items.filter(item => item.type === 'feature');
    const improvements = items.filter(item => item.type === 'improvement');
    const bugfixes = items.filter(item => item.type === 'bugfix');
    
    if (features.length > 0) {
      markdown += '### 🚀 Features\n\n';
      features.forEach(item => {
        markdown += `- **${item.title}**: ${item.description}\n`;
      });
      markdown += '\n';
    }
    
    if (improvements.length > 0) {
      markdown += '### 🔧 Improvements\n\n';
      improvements.forEach(item => {
        markdown += `- **${item.title}**: ${item.description}\n`;
      });
      markdown += '\n';
    }
    
    if (bugfixes.length > 0) {
      markdown += '### 🐞 Bug Fixes\n\n';
      bugfixes.forEach(item => {
        markdown += `- **${item.title}**: ${item.description}\n`;
      });
      markdown += '\n';
    }
    
    return markdown;
  };
  
  const [markdownContent, setMarkdownContent] = useState<string>('');
  
  // Initialize markdown when changelog data changes
  React.useEffect(() => {
    if (changelog && changelog.length > 0) {
      setMarkdownContent(generateMarkdown(changelog));
    }
  }, [changelog]);
  
  const handleMarkdownSave = (newMarkdown: string) => {
    setMarkdownContent(newMarkdown);
    toast({
      title: 'Markdown updated',
      description: 'Your changelog markdown has been updated',
    });
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
    <div className="space-y-6">
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
      </Card>
      
      <MarkdownEditor 
        initialMarkdown={markdownContent}
        onSave={handleMarkdownSave}
      />
      
      <Button 
        className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2 group" 
        onClick={handlePublish}
        size="lg"
      >
        <FileText className="h-5 w-5 group-hover:animate-pulse" />
        Publish Changelog to GitHub
      </Button>
    </div>
  );
};

export default ChangelogOutput;
