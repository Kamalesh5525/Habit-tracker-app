import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const NotificationPanel = ({ notifications }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white" shadow="md">
      <Text fontWeight="bold" fontSize="lg">Notifications</Text>
      <VStack spacing={2} align="start">
        {notifications.map((notification, index) => (
          <Text key={index}>{notification}</Text>
        ))}
      </VStack>
    </Box>
  );
};

export default NotificationPanel;
