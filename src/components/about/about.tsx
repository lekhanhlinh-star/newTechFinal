import {
    Avatar,
    Box,
    Button,
    Card,
    Center,
    Flex,
    IconButton,
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
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AdminAPI from "../../api/adminAPI";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { useScroll, useTransform } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
interface lecturerinterface {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    phone: string | null,
    birthday: Date | null,
}


export function AboutComponent() {
    const [major, setmajor] = useState<lecturerinterface[]>([])

    useEffect(() => {
        const fetch_data = async () => {
            await AdminAPI.ManageLectures.getAll({ role: "lecturer" })
                .then((data) => {
                    console.log(data.data.data)
                    setmajor(data.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        fetch_data()
    }, []
    )
    const targetref = useRef<HTMLDivElement | null>(null)
    const { scrollYProgress } = useScroll({
        target: targetref,
    });


    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])
    return (
        <Box minH={50} p={2} position={"sticky"} top={0}>
            <Box >
                <Image flex={1} src="https://t4.ftcdn.net/jpg/04/45/70/71/360_F_445707107_elptpcI7pUDPa9kMdnX9e3506QdHfo7r.jpg" style={{ width: '100%' }} />
            </Box>
            <Box mt={50}>
                <Text fontSize={30}>About us</Text>
                <Text whiteSpace="pre-wrap" textAlign="justify" fontFamily={"cursive"}>
                    The project " BUILDING A WEBSITE FOR MANAGING IT PROJECT" project aims to build a web system to meet the needs of managing and tracking students' final projects in a university or similar educational institution. This website will provide an intuitive and convenient interface for students, faculty and administrators to manage projects, communicate and track progress.</Text>
            </Box>

            <Flex direction={"column"} mt={50}>
                <Text fontSize={30}>Team members</Text>
                <Flex direction={"column"}>
                    {
                        major ? major.map(x =>
                            <Flex flex={4} mb={10} ml={30}>
                                <Avatar boxSize={40} src="https://cdn-icons-png.flaticon.com/128/1048/1048949.png"></Avatar>
                                <Flex direction={"column"}>
                                    <Flex ml={10} mb={5} mt={4}>
                                        <Image
                                            boxSize='30px'
                                            src="https://cdn-icons-png.flaticon.com/128/3596/3596091.png"
                                            alt=""
                                            mr={5}
                                        />
                                        <Text>{x.firstName} {x.lastName}</Text>
                                    </Flex>

                                    <Flex ml={10} mb={5} >

                                        <Image
                                            boxSize='30px'
                                            src="https://cdn-icons-png.flaticon.com/128/2165/2165061.png"
                                            alt=""
                                            mr={5}
                                        />
                                        <Text>{x.email}</Text>
                                    </Flex>
                                    <Flex ml={10} mb={5}>
                                        <Image
                                            boxSize='30px'
                                            src="https://cdn-icons-png.flaticon.com/128/126/126509.png"
                                            alt=""
                                            mr={5}
                                        />
                                        <Text>{x.phone}</Text>
                                    </Flex>


                                </Flex>
                            </Flex>
                        ) : null
                    }



                </Flex>
            </Flex>

            <Box backgroundColor={"#f8f8f8"} mt={50}>
                <Text>Phone : 090909992</Text>
                <Text>Mail  : mjks@gmail.com</Text>

            </Box>
        </Box >
    );
}
