import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Categories and tasks specific to Sound Construction
const WORK_CATEGORIES = {
  residential: {
    name: 'Residential Construction',
    tasks: {
      houseFoundation: { name: 'House Foundation', baseHours: 80, complexity: 1 },
      frameWalls: { name: 'Framing Walls', baseHours: 120, complexity: 1.2 },
      roofInstallation: { name: 'Roof Installation', baseHours: 96, complexity: 1.3 },
      interiorFinishing: { name: 'Interior Finishing', baseHours: 160, complexity: 1.5 }
    }
  },
  commercial: {
    name: 'Commercial Construction',
    tasks: {
      officeBuilding: { name: 'Office Building Framing', baseHours: 240, complexity: 1.4 },
      retailSpace: { name: 'Retail Space Construction', baseHours: 200, complexity: 1.3 },
      warehouseStructure: { name: 'Warehouse Structure', baseHours: 280, complexity: 1.5 }
    }
  },
  renovation: {
    name: 'Renovation Projects',
    tasks: {
      kitchenRemodel: { name: 'Kitchen Remodel', baseHours: 100, complexity: 1.4 },
      bathroomUpgrade: { name: 'Bathroom Upgrade', baseHours: 80, complexity: 1.3 },
      historicPreservation: { name: 'Historic Building Restoration', baseHours: 200, complexity: 1.6 }
    }
  }
};

const ConstructionHoursEstimator = () => {
  const [category, setCategory] = useState('');
  const [task, setTask] = useState('');
  const [projectSize, setProjectSize] = useState('standard');
  const [estimatedHours, setEstimatedHours] = useState(null);
  const [availableTasks, setAvailableTasks] = useState({});

  // Calculate project hours based on category, task, and size
  const calculateProjectHours = () => {
    if (!category || !task) return null;

    const selectedTask = WORK_CATEGORIES[category].tasks[task];
    let hours = selectedTask.baseHours;

    // Adjust hours based on project size
    switch (projectSize) {
      case 'small':
        hours *= 0.7;
        break;
      case 'large':
        hours *= 1.5;
        break;
      default: // standard
        hours *= 1;
    }

    // Apply complexity factor
    hours *= selectedTask.complexity;

    return Math.round(hours);
  };

  // Update available tasks when category changes
  useEffect(() => {
    if (category) {
      setAvailableTasks(WORK_CATEGORIES[category].tasks);
      setTask(''); // Reset task when category changes
    }
  }, [category]);

  const handleEstimate = () => {
    const hours = calculateProjectHours();
    setEstimatedHours(hours);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Sound Construction Hours Estimator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Category Selection */}
            <div>
              <Label>Project Category</Label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Project Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(WORK_CATEGORIES).map(([key, cat]) => (
                    <SelectItem key={key} value={key}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Task Selection */}
            <div>
              <Label>Specific Task</Label>
              <Select 
                value={task} 
                onValueChange={setTask}
                disabled={!category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Specific Task" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(availableTasks).map(([key, taskItem]) => (
                    <SelectItem key={key} value={key}>
                      {taskItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project Size */}
            <div>
              <Label>Project Size</Label>
              <Select 
                value={projectSize} 
                onValueChange={setProjectSize}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Project Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Estimate Button */}
            <Button 
              onClick={handleEstimate} 
              disabled={!category || !task}
              className="w-full"
            >
              Estimate Project Hours
            </Button>

            {/* Results Display */}
            {estimatedHours !== null && (
              <div className="text-center mt-4 p-3 bg-gray-100 rounded">
                <p className="text-xl font-bold">
                  Estimated Project Hours: {estimatedHours}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Estimate based on project complexity and size
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConstructionHoursEstimator;