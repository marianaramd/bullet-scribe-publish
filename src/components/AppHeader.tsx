
import React from 'react';
import { GitBranch } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="border-b border-border">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-medium">DevChangelog</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          AI-Powered Release Notes Generator
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
