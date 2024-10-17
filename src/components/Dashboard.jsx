import { useEffect, useState } from "react";
import HabitForm from "./HabitForm";
import HabitCard from "./HabitCard";
import NotificationPanel from "./NotificationPanel"; // Import the NotificationPanel
import { Box, SimpleGrid } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { validateFields } from "../utils/validation";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [notifications, setNotifications] = useState([]); // New state for notifications

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(storedHabits);
  }, []);

  const addHabit = (habit) => {
    const validationError = validateFields(habit);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const updatedHabits = [...habits, habit];
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    toast.success(`${habit.habitName} has been added!`);

    // Add notification
    setNotifications(prev => [...prev, `Don't forget to complete your habit: ${habit.habitName}!`]);
  };

  const deleteHabit = (habitToDelete) => {
    const updatedHabits = habits.filter(habit => habit.habitName !== habitToDelete.habitName);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    toast.success(`${habitToDelete.habitName} has been deleted!`);
  };

  const completeHabit = (habitName) => {
    setNotifications(prev => [...prev, `Great job on completing your habit: ${habitName}! Keep it up!`]);
  };

  return (
    <Box>
      <HabitForm addHabit={addHabit} />
      <NotificationPanel notifications={notifications} /> {/* Render the Notification Panel */}
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {habits.map((habit, index) => (
          <HabitCard key={index} habit={habit} onDelete={deleteHabit} onComplete={completeHabit} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
