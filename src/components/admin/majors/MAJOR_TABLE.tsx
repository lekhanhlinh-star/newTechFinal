import { Avatar, Box, Flex, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
import EDIT_STUDENT_FORM from './EDIT_MAJOR_FORM'
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

export function MAJOR_TABLE() {
    const [studentlist, setstudentlist] = useState<studentinterface[]>([])
    const [page, setpage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [currentprofile, Setcurrentprofile] = useState<studentinterface>()
    const toast = useToast();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()

    useEffect(() => {
        const fetch_data = async () => {
            setLoading(true)
            await AdminAPI.ManageLectures.getAll({ role: "lecturer", page: page, limit: 5 }).then((data) => {
                console.log(data.data)
                // if (data.data.data.length !== 0) {
                setstudentlist(data.data.data)
                // }
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
        console.log(found)
        if (found) {
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
                                <Th>Email address</Th>

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
                                                <Text ml={5}>{`${x.firstName} ${x.lastName}`}</Text>
                                            </Flex>
                                        </Td>

                                        <Td> {x.email}</Td>

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
                        <Text as={"b"}>{`${currentprofile.firstName}  ${currentprofile.lastName}`}</Text>

                        <Text>Major</Text>
                        <Stack direction={"row"} spacing={8} fontSize={"37px"}>
                            <IconButton aria-label={""} onClick={() => handledelete(currentprofile._id)} icon={<DeleteIcon />}>

                            </IconButton>
                            <IconButton aria-label={""} icon={<EditIcon />} onClick={onOpen1}></IconButton>

                            <Modal closeOnOverlayClick={false} isOpen={isOpen1} onClose={onClose1}>
                                <ModalOverlay />
                                <ModalContent minWidth={"900px"} minH={"250px"}>
                                    <ModalCloseButton />
                                    <ModalBody minWidth={"900px"} pb={6}>
                                        <EDIT_STUDENT_FORM data={currentprofile} />
                                    </ModalBody>

                                </ModalContent>
                            </Modal>

                        </Stack>
                        <Stack direction={"row"} spacing={20}>
                            <Stack direction={"column"}>
                                <Heading size={"ml"}>Age</Heading>
                                <Text>19</Text>
                            </Stack>

                            {/* <Stack direction={"column"}>
                                <Heading size={"ml"}>Gender</Heading>
                                <Text>currentprofile.ge</Text>
                            </Stack> */}
                        </Stack>
                    </Stack> : null
                }

            </Box>
        </Flex >);
}



