
import React from 'react';
import { User, Code, MessageSquare, Terminal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to DevChangelog!</h1>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg text-gray-600 mb-2">Overall Progress</h2>
        <div className="flex items-center mb-2">
          <div className="text-2xl font-bold mr-2">1 of 4 completed</div>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-gray-600" />
              <CardTitle>Generate Changelogs</CardTitle>
            </div>
            <CardDescription>
              Create beautiful, structured changelogs from your GitHub repository with AI
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
              Generate Changelogs
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border shadow hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-600" />
              <CardTitle>Invite Your Team</CardTitle>
            </div>
            <CardDescription>
              Collaborate with your team members for better productivity.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Invite Your Team
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="border shadow hover:shadow-md transition-shadow bg-gray-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gray-600" />
              <CardTitle>Chat with Your Codebase</CardTitle>
            </div>
            <CardDescription>
              Interact with your codebase using natural language.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Chatted with Codebase
            </div>
          </CardContent>
        </Card>
        
        <Card className="border shadow hover:shadow-md transition-shadow bg-gray-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-gray-600" />
              <CardTitle>Make Your First API Call</CardTitle>
            </div>
            <CardDescription>
              Integrate powerful features into your workflow.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Made an API Call
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
