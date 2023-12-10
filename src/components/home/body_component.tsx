import {
    Avatar,
    Box,
    Button,
    Card,
    Center,
    Flex,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { FcPanorama } from "react-icons/fc";
import React, { useRef, useState } from "react";
import axios from "axios";



export function BodyComponent() {
    return (
        <Box minH={50} backgroundColor={"#f8f8f8"} p={2} position={"sticky"} top={0}>
            <Flex minH={600} >
                <Box flex={1} >
                    <Box py={30} fontSize={50} alignItems={"left"} alignContent={"left"} backgroundColor={"orange"}>
                        <Text align={"left"} fontFamily={"fantasy"} ml={100}>Learn a New Skill</Text>
                        <Text align={"left"} fontFamily={"fantasy"} ml={100}>Everyday, Anytime,</Text>
                        <Text align={"left"} fontFamily={"fantasy"} ml={100}>And Anywhere.</Text>
                    </Box>

                    <Flex mt={50} direction={"column"}>
                        <Text ml={55} my={2} align={"left"} fontFamily={"fantasy"} >Let Login</Text>
                        <Button ml={50} my={2} backgroundColor={"blue"} border="1px solid #d9d9d9d9" color={"white"} maxW={150} borderRadius={50} >Login</Button>
                    </Flex>
                </Box>

                <Box flex={1} >
                    <Image src='https://static.vecteezy.com/system/resources/previews/002/629/922/large_2x/portrait-of-woman-university-student-holding-book-in-studio-grey-background-free-photo.jpg' />

                </Box>
            </Flex>
        </Box >
    );
}