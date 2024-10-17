import { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const HabitCard = ({ habit, onDelete, onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(0);
  const [completionDates, setCompletionDates] = useState([]);

  const handleComplete = () => {
    const today = new Date().toISOString().split('T')[0];
    setIsComplete(true);
    setCompletionDates((prev) => [...prev, today]);

    // Calculate streak
    if (completionDates.length > 0) {
      const lastDate = new Date(completionDates[completionDates.length - 1]);
      const isConsecutive = (new Date(today) - lastDate) / (1000 * 60 * 60 * 24) === 1;
      setStreak(isConsecutive ? streak + 1 : 1);
    } else {
      setStreak(1);
    }

    // Trigger notification for completion
    onComplete(habit.habitName);
  };

  const handleDelete = () => {
    onDelete(habit);
  };

  return (
    <Box border="1px" borderRadius="md" p={4} mb={4} style={{ backgroundColor: "#FFE3E3" }}>
      <Text fontWeight="bold">{habit.habitName}</Text>
      <Text>Goal: {habit.goal}</Text>
      <Text>Start Date: {habit.startDate}</Text>
      <Text>Frequency: {habit.frequency}</Text>
      <Text>Streak: {streak} days</Text>
      <Button onClick={handleComplete} colorScheme={isComplete ? "green" : "blue"} mr={2}>
        {isComplete ? "Completed" : "Mark as Complete"}
      </Button>
      <Button onClick={handleDelete} colorScheme="red">
        Delete
      </Button>
    </Box>
  );
};

export default HabitCard;
