import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Routes from "./router/Routes"
export const App = () => (
  <ChakraProvider theme={theme}>
 <Box textAlign="center" fontSize="xl">
               
                  <Routes />
              


        </Box>
  </ChakraProvider>
)
