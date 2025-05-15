
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save } from 'lucide-react';

interface MarkdownEditorProps {
  initialMarkdown: string;
  onSave: (markdown: string) => void;
}

const MarkdownEditor = ({ initialMarkdown, onSave }: MarkdownEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [markdown, setMarkdown] = useState(initialMarkdown);

  const handleSave = () => {
    onSave(markdown);
    setIsEditing(false);
  };

  return (
    <Card className="w-full border shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Changelog Markdown</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          className="h-8"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? (
            <><Save className="h-4 w-4 mr-1" /> Save</>
          ) : (
            <><Pencil className="h-4 w-4 mr-1" /> Edit</>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="font-mono min-h-[300px]"
          />
        ) : (
          <div className="prose max-w-full">
            <pre className="bg-gray-50 p-4 border rounded-md overflow-auto">
              {markdown}
            </pre>
          </div>
        )}
      </CardContent>
      {isEditing && (
        <CardFooter>
          <div className="flex justify-end space-x-2 w-full">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default MarkdownEditor;
