import { Avatar, Box, Flex, Heading, Icon, IconButton, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, PhoneIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
// https://www.figma.com/file/KlFNRecPC4tpKx6RKMIKX5/School-Management-Admin-Dashboard-UI-(Community)?type=design&node-id=293-32589&mode=design&t=PQEmOO8MvaplyP75-0

interface studentinterface {
    _id: string,
    authType: string | null,
    authGoogleId: string | null,
    role: string | null,
    firstName: string,
    lastName: string,
    mssv: string | null,
    email: string,
    password: string | null,
    gender: string,
    phone: string | null,
    birthday: Date | null,
    class: {
        id: string,
        name: string,
        start_year: number | null,
        lecture?: string,

    }
}

export function STUDENT_TABLE() {
    const [studentlist, setstudentlist] = useState<studentinterface[]>([])
    const [page, setpage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [currentprofile, Setcurrentprofile] = useState<studentinterface>()
    const toast = useToast();

    useEffect(() => {
        const fetch_data = async () => {
            setLoading(true)
            await AdminAPI.ManageStudent.getAll({ role: "student", page: page, limit: 5 }).then((data) => {
                console.log(data.data)
                setstudentlist(data.data)
            })
                .catch(err => {
                    console.log(err)
                })
            setLoading(false)
        }
        fetch_data()
    }, [page]
    )


    useEffect(() => {
        if (studentlist) {
            Setcurrentprofile(studentlist[0])
        }
    }, [studentlist])

    const handle_next_page = () => {
        setpage(prevState => prevState + 1)

    }
    const handle_previous_page = () => {
        setpage((prevState) => Math.max(1, prevState - 1)); // Make sure page doesn't go below 1
    };

    const handleprofile = async (id: string) => {
        const found = studentlist.find((element) => element._id == id)
        if (found) {
            console.log(found)
            Setcurrentprofile(found)
        }
    }

    const handledelete = async (id: string) => {
        await AdminAPI.ManageStudent.deleteOne(id).then(data => {
            console.log(data)
            toast({
                title: "Delete successful", status: "success", duration: 9000, isClosable: true, position: "top",
            });
            const found = studentlist.find((element) => element._id == id)
            if (found) {
                setstudentlist(studentlist.filter(item => item !== found));
            }
        }
        ).catch(err => {
            console.log(err)
            toast({
                title: err, status: "error", duration: 9000, isClosable: true, position: "top",
            });
        })
    }

    return (

        <Flex mt={50} overscroll={"scroll"}
            overflowY={"scroll"}
            overflowX={"hidden"}
        >
            <Flex direction={"column"} flex={3} borderRight={"1px solid lightgrey"}>
                <TableContainer >
                    <Table variant='simple'>
                        <Thead fontFamily={'Kumbh Sans'} fontSize={"25px"} fontStyle={"b"}>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Student ID</Th>
                                <Th>Email address</Th>
                                <Th>Class</Th>
                                <Th>Gender</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                studentlist ? studentlist.map((x) =>
                                    <Tr
                                        cursor="pointer"
                                        onClick={() => handleprofile(x._id)}
                                        _hover={{
                                            color: 'white', bg: "#2671B1"
                                        }}>
                                        <Td>
                                            <Flex align={"center"}>
                                                <Avatar
                                                    src={""}>
                                                </Avatar>
                                                <Text ml={5}>{x.firstName + x.lastName}</Text>
                                            </Flex>
                                        </Td>
                                        {
                                            x.mssv ? <Td>20110377</Td> : <Td></Td>
                                        }

                                        <Td> {x.email}</Td>


                                        <Td> {x.class?.name}</Td>
                                        <Td> {x.gender}</Td>
                                    </Tr>
                                ) : null
                            }




                        </Tbody>
                    </Table>
                </TableContainer>
                <Spacer>

                </Spacer>

                {studentlist.length == 0 ? <Box>
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


            <Box flex={1} >
                {
                    currentprofile ? <Stack p={"auto"} direction={"column"} alignItems={"center"}  >
                        <Heading>{currentprofile?.mssv}</Heading>
                        <Avatar size={"3xl"}></Avatar>
                        <Text as={"b"}>{currentprofile.firstName + currentprofile.lastName}</Text>

                        <Text>Major</Text>
                        <Stack direction={"row"} spacing={8} fontSize={"37px"}>
                            <IconButton aria-label={""} onClick={() => handledelete(currentprofile._id)} icon={<DeleteIcon />}></IconButton>
                            <IconButton aria-label={""}></IconButton>
                        </Stack>
                        <Stack direction={"row"} spacing={20}>
                            <Stack direction={"column"}>
                                <Heading size={"ml"}>Age</Heading>
                                <Text>19</Text>
                            </Stack>

                            <Stack direction={"column"}>
                                <Heading size={"ml"}>Gender</Heading>
                                <Text>Female</Text>
                            </Stack>
                        </Stack>
                    </Stack> : null
                }

            </Box>
        </Flex >);
}