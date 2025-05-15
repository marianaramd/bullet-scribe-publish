
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

const AppHeader = () => {
  return (
    <header className="bg-green-500 text-white">
      <div className="container py-3 px-4 flex items-center justify-between">
        <div className="text-lg font-medium">
          14 days left in your free trial!
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="mr-1 h-4 w-4" /> Add Payment Method
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
