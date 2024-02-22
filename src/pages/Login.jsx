// import React, { useState } from "react";
// import Cookies from "js-cookie";
// export default function Login() {
//   const [formState, setFormState] = useState({
//     email: "",
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
//     let res = await fetch(
//       // `https://tiny-pink-eagle-cape.cyclic.app/user/login`,
      // "http://localhost:3000/user/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         mode: "cors",
//         credentials: "include",
//         body: JSON.stringify(formState),
//       }
//     );
//     let data = await res.json();
//     alert(data.msg);
//     setFormState({
//       email: "",
//       pass: "",
//     });
//   }
//   return (
//     <div>
//       <h2 style={{ textAlign: "center", marginTop: "10vh" }}>Login Page</h2>
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
import React, { useContext, useState } from "react";

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
  
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function Login() {
  const [userdetails, setUserdetails] = useState({ email: "", pass: "" });
  
  const navigate = useNavigate();
  const toast = useToast();

  function handleChange(e) {
    setUserdetails({
      ...userdetails,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit() {
    try {
      let res = await fetch( "https://healthcareserver-production.up.railway.app/user/login",

       {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        credentials: "include",
        mode: "cors",
        body: JSON.stringify(userdetails),
      });
      

      const data = await res.json();
      console.log(data);
      if (data.msg === "Login Successful") {

     
        toast({
          position:"top",
          title: "Login Successful",
          description: "You Logged in Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        

      } else {
       
        toast({
          position:"top",

          title: "Invalid Credential",
          description: "Please enter valid credentials",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      
    } catch (error) {
      
      console.log("login failed", error);
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
            Login
          </Text>
          <Text textAlign="center" mt="15px" fontSize="18px">
            Get access to your <br />patient  details and patient records
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={handleChange}
                value={userdetails.email}
                name="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={handleChange}
                value={userdetails.password}
                name="password"
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
                
                <Text >New to EHR?</Text>
                <Link to="/register" onClick={() => navigate("/register")}>Sign up</Link>
                </Flex>



            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </div>
  );
}
