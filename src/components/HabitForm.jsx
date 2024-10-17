import { useState } from "react";
import { Box, Button, Input, Select } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { validateFields } from "../utils/validation"; // Import the validation function
import { Link } from "react-router-dom";
import Profile from "./Profile";

const HabitForm = ({ addHabit }) => {
  const [habitName, setHabitName] = useState("");
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateFields({ habitName, goal, startDate, frequency });
    if (validationError) {
      toast.error(validationError); // Show error if validation fails
      return;
    }

    const newHabit = { habitName, goal, startDate, frequency };
    addHabit(newHabit);
    toast.success(`${habitName} has been added!`);
    setHabitName("");
    setGoal("");
    setStartDate("");
    setFrequency("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit} style={{border:"3px solid blue"}}>
      <Input value={habitName} placeholder="Habit Name" onChange={(e) => setHabitName(e.target.value)} />
      <Input value={goal} placeholder="Goal" onChange={(e) => setGoal(e.target.value)} />
      <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="">Select Frequency</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </Select>
      <Button type="submit" className="btn btn-primary mb-4 mt-1"  style={{backgroundColor:"#4379F2"}}>Add Habit</Button>
   
    </Box>
  );
};

export default HabitForm;
