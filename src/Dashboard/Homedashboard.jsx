import React from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Main from "./Main";

export default function Homedashboard() {
  return (
    <div>
      <Grid
        templateAreas={{
          base: `
            "header"
            "nav"
            "main"
            "footer"
          `,
          md: `
            "header header"
            "nav main"
            "footer footer"
          `,
          lg: `
            "header header header header header"
            "nav main main main main"
            "footer footer footer footer footer"
          `,
        }}
        gridTemplateRows={{
          base: "auto",
          md: "50px 1fr 1fr 30px",
          lg: "50px 1fr 30px",
        }}
        gridTemplateColumns={{
          base: "1fr",
          md: "150px 1fr",
          lg: "150px repeat(4, 1fr)",
        }}
        h="100vh"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem
          pl="2"
          area={"header"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="1.5rem"
        >
          WELCOME TO THE EHR DASHBOARD
        </GridItem>

        <GridItem pl="2" area={"nav"} bg="lightgray">
          <Sidebar />
        </GridItem>
        <GridItem pl="2" area={"main"}>
          <Main />
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </div>
  );
}
