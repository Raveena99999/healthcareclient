import { Box, VStack, Text, StackDivider, Link } from "@chakra-ui/react";
import React from "react";
// import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div>
      <Box p="2rem">
        <Text mb="2rem"> EHR</Text>

        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box>
            <Link to="/" onClick={() => navigate("/")}>
              Home
            </Link>
          </Box>
          <Box>
            <Link to="/register" onClick={() => navigate("/register")}>
              register
            </Link>
          </Box>
          <Box>
            <Link to="/login" onClick={() => navigate("/login")}>
              Login
            </Link>
          </Box>
          <Box>
            <Link>patient</Link>
          </Box>
          <Box>
            <Link to="/blogs" onClick={() => navigate("/blogs")}>
              Records
            </Link>{" "}
          </Box>
        </VStack>
      </Box>
    </div>
  );
}
