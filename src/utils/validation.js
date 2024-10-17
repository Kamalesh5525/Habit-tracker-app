// src/utils/validation.js

export const validateFields = (habit) => {
    if (!habit.habitName || !habit.goal || !habit.startDate || !habit.frequency) {
      return "Please fill in all required fields.";
    }
    return null; // No errors
  };
  