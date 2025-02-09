import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Suggest: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [insight, setInsight] = useState('');

  useEffect(() => {
    const simulatedInsight = "You have spent $45 within the past 24 hours. That'll be $1350 a month if this continues!";
    setInsight(simulatedInsight);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="p-4">
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Insight</AlertTitle>
        <AlertDescription>
          {insight}
        </AlertDescription>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </Alert>
    </div>
  );
};

export default Suggest;
