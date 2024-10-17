import { useState } from "react";
import { Box, Input, Button, Card } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const currentUser = localStorage.getItem("currentUser");
  const [name, setName] = useState("");
  const [goals, setGoals] = useState("");

  const handleSave = () => {
    const profile = { name, goals };
    localStorage.setItem(currentUser, JSON.stringify(profile));
    
    // Show success notification
    toast.success("Profile saved successfully!");

    // Clear inputs after saving
    setName("");
    setGoals("");
  };

  // Retrieve profile to display
  const storedProfile = JSON.parse(localStorage.getItem(currentUser));

  return (
    <Box>
      <Input 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <Input 
        placeholder="Personal Goals" 
        value={goals} 
        onChange={(e) => setGoals(e.target.value)} 
      />
      <Button onClick={handleSave}>Save Profile</Button>

      {/* Toast Notification Container */}
      <ToastContainer position="top-center "/>

      {/* Bootstrap Card to display profile */}
      {storedProfile && (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title">Profile Information</h5>
            <p className="card-text"><strong>Name:</strong> {storedProfile.name}</p>
            <p className="card-text"><strong>Goals:</strong> {storedProfile.goals}</p>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Profile;
