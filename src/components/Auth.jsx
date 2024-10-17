import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { toast } from 'react-toastify';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || {};
    
    if (isLogin) {
      if (users[email] && users[email].password === password) {
        localStorage.setItem("currentUser", email);
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        toast.error("Invalid login");
      }
    } else {
      if (!users[email]) {
        users[email] = { password };
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", email);
        window.location.href = "/dashboard"; // Redirect to dashboard
      } else {
        toast.error("User already exists");
      }
    }
  };

  return (
    <Box className="d-flex justify-content-center  " style={{ backgroundColor:"black",justifyContent:"center",border:"4px solid #B7E0FF",height:"100vh"}}>
        
      <form onSubmit={handleSubmit} className="text-center mt-5" style={{ width: '300px',height:"200px",border:"5px solid #B7E0FF",borderRadius:"13px" }}>
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
        />
        <Input 
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="my-2 mb-3"
        />
        <Button type="submit" className=" mx-2">{isLogin ? "Login" : "Register"}</Button>
        <Button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Register" : "Switch to Login"}
        </Button>
      </form>
    </Box>
  );
};

export default Auth;
