import { Avatar, Box, Button, Flex, Heading, Icon, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Radio, RadioGroup, Select, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
import EDIT_STUDENT_FORM from './EDIT_STUDENT_FORM'
import DELETE_STUDENT from "./DELETE_STUDENT";

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
    schoolYear: string,
    class: {
        id: string, name: string, start_year: number | null,
    }
}
interface FilterParams {
    role: string;
    page: number;
    limit: number;
    class?: string;
    gender?: string;
    major?: string;
    active: Boolean
}


export function STUDENT_TABLE() {
    const [studentlist, setstudentlist] = useState<studentinterface[]>([])
    const [page, setpage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [currentprofile, Setcurrentprofile] = useState<studentinterface>()
    const toast = useToast();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
    const [majorarr, setmajorarr] = useState<any[]>([])
    const [classarr, setclassarr] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState('');

    // const [value, setValue] = useState('Name')
    const [filter, setfilter] = useState<{ major: string, gender: string, class: string }>({ major: "", gender: "", class: "" })

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(name, value)
        setfilter((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };

    useEffect(() => {
        const fetch_data = async () => {
            setLoading(true)
            let param: FilterParams = {
                role: "student",
                page: page,
                limit: 5,
                active: true
            };
            if (filter.gender) {
                param.gender = filter.gender;
            }
            if (filter.major) {
                param.major = filter.major;
            }
            if (filter.class) {
                param.class = filter.class;
            }
            if (filter)
                await AdminAPI.ManageStudent.getAll(param).then((data) => {
                    console.log(data.data)
                    setstudentlist(data.data.data)
                })
                    .catch(err => {
                        console.log(err)
                    })
            setLoading(false)
        }
        fetch_data()
    }, [page, filter]
    )

    useEffect(() => {
        const fetch_data = async () => {
            await apiService.getAll("classes").then(data => {
                setclassarr(data.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetch_data()
    }, [])



    useEffect(() => {
        const fetch_data = async () => {
            await apiService.getAll("majors").then(data => {
                console.log(data.data.data)
                setmajorarr(data.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetch_data()
    }, [])

    useEffect(() => {
        if (studentlist) {
            Setcurrentprofile(studentlist[0])
        }
    }, [studentlist])

    const handle_next_page = () => {
        if (studentlist) {
            setpage(prevState => prevState + 1)

        }

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

    const handle_search = async () => {
        setLoading(true)
        await AdminAPI.ManageLectures.getAll({ role: "student", page: 1, limit: 5, active: true, search: searchValue }).then((data) => {
            setstudentlist(data.data.data)
        })
            .catch(err => {
                console.log(err)
            })
        setLoading(false)
    }

    return (

        <Flex mt={1} direction={"column"} overscroll={"scroll"}
            overflowY={"scroll"}
            overflowX={"hidden"}
        >
            <Flex mb={50}>
                <Input flex={5} minW={"777px"} h={"49px"} borderRadius={"8px"} bg={"#E0E0E0"} color={"blue"}
                    placeholder={"Search for a by firstname lastname or email"}
                    onChange={(e) => setSearchValue(e.target.value)}
                ></Input>
                <Button flex={2} ml={5} h={"49px"} bg={"#2671B1"} color={"white"} onClick={handle_search}> Search</Button>
            </Flex>

            <Flex mb={10}>
                <Text width={150} flex={1}>Filter by</Text>
                {
                    majorarr.length !== 0 ? (<Select variant="outline" placeholder={"Major"} flex={3} onChange={handleInputChange} name="major">
                        {
                            majorarr.map(x =>
                                <option value={`${x._id}`} >{x.name}</option>
                            )
                        }

                    </Select>) :
                        <Input type={"text"} onChange={handleInputChange} placeholder={"Major"} name="major"></Input>

                }

                <Select onChange={handleInputChange} name="gender" variant="outline" placeholder={"Gender"} flex={3}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </Select>
                {
                    classarr.length !== 0 ? (<Select variant="outline" placeholder={"class"} flex={3} onChange={handleInputChange} name="class">
                        {
                            classarr.map(x =>
                                <option value={`${x._id}`} >{x.name}</option>
                            )
                        }

                    </Select>) :
                        <Input type={"text"} onChange={handleInputChange} placeholder={"class"} name="class"></Input>

                }
                <Spacer flex={4}></Spacer>

            </Flex>
            <Flex >
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
                                                    <Text ml={5}>{`${x.firstName} ${x.lastName}`}</Text>
                                                </Flex>
                                            </Td>
                                            {
                                                x.mssv ? <Td>{x.mssv}</Td> : <Td></Td>
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
                            <Text as={"b"}>{`${currentprofile.firstName}  ${currentprofile.lastName}`}</Text>

                            <Text>Major</Text>
                            <Stack direction={"row"} spacing={8} fontSize={"37px"}>

                                <DELETE_STUDENT id={currentprofile._id}></DELETE_STUDENT>
                                <IconButton aria-label={""} icon={<EditIcon />} onClick={onOpen1}></IconButton>

                                <Modal closeOnOverlayClick={false} isOpen={isOpen1} onClose={onClose1}>
                                    <ModalOverlay />
                                    <ModalContent minWidth={"900px"} minH={"250px"}>
                                        <ModalCloseButton />
                                        <ModalBody minWidth={"900px"} pb={6}>
                                            <EDIT_STUDENT_FORM data={currentprofile} majorarr={majorarr} classarr={classarr} />
                                        </ModalBody>

                                    </ModalContent>
                                </Modal>

                            </Stack>
                            <Stack direction={"row"} spacing={20}>
                                <Stack direction={"column"}>
                                    <Heading size={"ml"}>Age</Heading>
                                    <Text>19</Text>
                                </Stack>

                            </Stack>
                        </Stack> : null
                    }

                </Box>

            </Flex >


        </Flex >);
}



