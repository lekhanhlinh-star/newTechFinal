import { Avatar, Box, Button, Image, Flex, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { AddIcon, ArrowLeftIcon, ArrowRightIcon, DeleteIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";

import React from "react";
import AdminAPI from "../../../api/adminAPI";
import axios from "axios";
import { useCookies } from "react-cookie";
// import EDIT_STUDENT_FORM from './EDIT_PROJECT_FORM'
// https://www.figma.com/file/KlFNRecPC4tpKx6RKMIKX5/School-Management-Admin-Dashboard-UI-(Community)?type=design&node-id=293-32589&mode=design&t=PQEmOO8MvaplyP75-0
interface Student {
    role: string;
    authGoogleId: string | null;
    authType: string;
    gender: string;
    _id: string;
    email: string;
    mssv: string | null;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
    project: string;
    birthday: string;
    class: {
        _id: string;
        name: string;
        start_year: string;
        __v: number;
    };
    schoolYear: string;
}
interface Major {
    _id: string;
    name: string;
    description: string;
    timeRegistrationProjectStart: string;
    timeRegistrationProjectEnd: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ProjectInterface {
    status: string;
    review: string;
    score: number;
    _id: string;
    name: string;
    description: string;
    lecturer: string | null;
    schoolYear: string;
    major: Major | null;
    report: any[]; // You can replace `any` with the appropriate type for the `report` array
    createdAt: string;
    updatedAt: string;
    startDate: string;
    endDate: string;
}

export function StudentProjectregis() {
    const [projectList, setprojectList] = useState<ProjectInterface[]>([])
    const [page, setpage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [currentproject, Setcurrentproject] = useState<ProjectInterface>()
    const toast = useToast();
    const [cookies] = useCookies();
    const token = cookies.jwt;
    const [liststudent, setliststudent] = useState<Student[]>([])


    useEffect(() => {
        const fetch_data = async () => {
            setLoading(true)
            await AdminAPI.ManageProject.getAll({ page: page, limit: 5 }).then((data: { data: { data: React.SetStateAction<ProjectInterface[]>; }; }) => {
                console.log(data.data.data)
                setprojectList(data.data.data)
            })
                .catch((err: any) => {
                    console.log(err)
                })
            setLoading(false)
        }
        fetch_data()
    }, [page]
    )



    useEffect(() => {
        if (projectList) {
            Setcurrentproject(projectList[0])
        }
    }, [projectList])

    const handle_next_page = () => {
        if (projectList.length != 0) {
            setpage(prevState => prevState + 1)
        }

    }
    const handle_previous_page = () => {
        setpage((prevState) => Math.max(1, prevState - 1)); // Make sure page doesn't go below 1
    };


    const handleclick = async (id: string) => {
        await axios.patch(`http://localhost:5000/api/v1/projects/${id}/projectRegistrationStudent`, {
            headers: {
                'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
            }
        }).then(data => {
            toast({
                title: "Join successful", status: "success", duration: 1000, isClosable: true, position: "top",
                onCloseComplete: () => {
                    window.location.reload();
                }
            });
        }).catch(err => {
            toast({
                title: err.response.data.message, status: "error", duration: 1000, isClosable: true, position: "top",
            });
        })
    }

    return (

        <Flex mt={50} overscroll={"scroll"}
            overflowY={"scroll"}
            overflowX={"hidden"}
            width={"100%"}
        >
            <Flex direction={"column"} flex={3} borderRight={"1px solid lightgrey"}>
                <TableContainer >
                    <Table variant='simple'>
                        <Thead fontFamily={'Kumbh Sans'} fontSize={"25px"} fontStyle={"b"}>
                            <Tr>
                                <Th ml={30}>Name</Th>
                                <Th>School Year</Th>
                                <Th>Major</Th>
                                <Th>Status</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                projectList ? projectList.map((x) =>
                                    <Tr
                                        cursor="pointer"

                                        _hover={{
                                            color: 'white', bg: "#2671B1"
                                        }}>
                                        <Td>
                                            <Flex align={"center"}>
                                                <Image src="https://cdn-icons-png.flaticon.com/128/1087/1087927.png" alt="" boxSize={30}></Image>
                                                <Text ml={5}>{`${x?.name}`}</Text>
                                            </Flex>
                                        </Td>
                                        <Td> {x.schoolYear}</Td>
                                        <Td> {x.major?.name}</Td>
                                        <Td>{x.status}</Td>
                                        <Td>
                                            <Button minW={50} leftIcon={<AddIcon />} bg={"greenyellow"} onClick={() => { handleclick(x._id) }}>Join to project</Button>
                                        </Td>
                                    </Tr>
                                ) : null
                            }
                        </Tbody>

                    </Table>
                </TableContainer>
                <Spacer>

                </Spacer>

                {projectList.length == 0 ? <Box>
                    <Text fontSize={50} color={"red"}>There are no records</Text>
                </Box> : null}
                <Spacer>

                </Spacer>

                <Flex mx={5} >

                    <IconButton isLoading={loading} onClick={handle_previous_page} spinner={<BeatLoader size={8} color='black' />} variant={"ghost"} aria-label={"ArrowLeft"}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </IconButton>


                    <Spacer>

                    </Spacer>

                    <IconButton isLoading={loading} variant={"ghost"} onClick={handle_next_page}
                        aria-label={"ArrowRight"} spinner={<BeatLoader size={8} color='black' />}>
                        <ArrowRightIcon></ArrowRightIcon>
                    </IconButton>
                </Flex>
            </Flex>


        </Flex >);
}



