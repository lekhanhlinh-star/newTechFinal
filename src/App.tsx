import * as React from "react"
import {
  ChakraProvider,
  Box,

  theme,
} from "@chakra-ui/react"
import AuthProvider  from "./provider/AuthProvider";
import Routes from "./router/Routes"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
        <AuthProvider>
                  <Routes />
        </AuthProvider>

    </Box>
  </ChakraProvider>
)
