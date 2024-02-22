// import React, { useState } from "react";

// export default function Register() {
//   const [formState, setFormState] = useState({
//     email: "",
//     username: "",
//     pass: "",
//   });

//   function handleChange(event) {
//     setFormState({
//       ...formState,
//       [event.target.name]: event.target.value,
//     });
//   }
//   async function handleSubmit(event) {
//     event.preventDefault();
//     let response = await fetch(
//       "http://localhost:3000/user/register",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         mode: "cors",
//         credentials: "include",
//         body: JSON.stringify(formState),
//       }
//     );
//     const data = await response.json();
//     alert(data.msg);
//     setFormState({
//       email: "",
//       username: "",
//       pass: "",
//     });
//   }

//   return (
//     <div>
//       <h2 style={{ textAlign: "center", marginTop: "10vh" }}>Register Page</h2>
//       <div
//         style={{
//           margin: "auto",
//           textAlign: "center",
//           border: "2px solid black",
//           width: "25%",
//           padding: "10px",
//         }}
//       >
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your username"
//             onChange={handleChange}
//             value={formState.username}
//           />
//           <br />
//           <input
//             style={{ marginTop: "10px" }}
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             onChange={handleChange}
//             value={formState.email}
//           />
//           <br />
//           <input
//             style={{ marginTop: "10px" }}
//             type="password"
//             name="pass"
//             placeholder="Enter your password"
//             onChange={handleChange}
//             value={formState.pass}
//           />
//           <br />
//           <input style={{ marginTop: "10px" }} type="submit" />
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
 Select
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Signup() {
  const [userdetails, setUserdetails] = useState({
    username: "",
    email: "",
    pass: "",
  });
  const navigate = useNavigate();

  const toast = useToast();
  function handleUserdetails(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUserdetails({ ...userdetails, [name]: value });
  }
  async function handleSubmit() {
    try {
      let res = await fetch("https://healthcareserver-production.up.railway.app/user/register",
       {
        method: `POST`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdetails),
      });
      console.log(userdetails);
      let data = await res.json();
      console.log(data);
     
      toast({
        title: "Registration Successful",
        description:`user registered sucessfully`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

     
    } catch (error) {
      console.error(error);
      toast({
        position: "top",

        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <div>

      <Stack
        w="60%"
        mx="auto"
        minH={"80vh"}
        direction={{ base: "column", md: "row" }}
        mt="2%"
        mb="2%"
      >
        <Box bg="rgba(0, 120, 255, 1)" color="white">
          <Text textAlign="center" mt="110px" fontSize="24px" fontWeight="bold">
            Looks like you are new <br />
            here!
          </Text>
          <Text textAlign="center" mt="15px" fontSize="18px">
            Sign up with your email to get started
          </Text>
          {/* <Image
            display="block"
            m="auto"
            mt="160px"
            width="150px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs8a3OYLHA1EaZIxcKYEVWZolCM725KYFqKw&usqp=CAU"
          /> */}
        </Box>

        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <FormControl id="username">
              <FormLabel>Enter Username</FormLabel>
              <Input
                type="text"
                name="username"
                value={userdetails.username}
                onChange={handleUserdetails}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={userdetails.email}
                onChange={handleUserdetails}
              />
            </FormControl>

            <FormControl id="role" isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select
                    placeholder="User Role"
                    name="role"
                    onChange={handleUserdetails}
                  >
                    <option value="patient">patient</option>
                    <option value="doctor">doctor</option>
                    <option value="admin">admin</option>
                  </Select>
                </FormControl>



            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="pass"
                value={userdetails.pass}
                onChange={handleUserdetails}
              />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.500"}>Forgot password?</Text>
              </Stack>
            
              <Button
                colorScheme={"orange"}
                variant={"solid"}
                onClick={handleSubmit}
              >
                Continue
              </Button>


              <Flex m="auto" color="rgba(0, 83, 160, 1)" fontWeight="bold">
                
              <Text >Existing User?</Text>
              <Link to="/login" onClick={() => navigate("/login")}>Log in</Link>
              </Flex>


            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </div>
  );
}


