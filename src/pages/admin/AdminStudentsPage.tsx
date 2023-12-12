import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Spacer,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import AdminSidebarComponent from "../../components/admin/adminSidebarComponent";
import { Add_Student_FORM } from "../../components/admin/students/Add_Student_FORM";
import { Student_Table } from "../../components/admin/students/Student_Table";
import { ArrowLeftIcon, ArrowRightIcon, PhoneIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import AdminAPI from "../../api/adminAPI";

import { BeatLoader } from "react-spinners";

interface StudentInfo {
    name: string,
    email: string,
    class: string,
    student_id: string
    gender: string
}

export function AdminStudentsPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [StudentList, setStudentList] = useState<StudentInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const params = {
            page: page, limit: 5

        }
        const fetchAllStudent = async () => {
            setLoading(true)
            await AdminAPI.ManageStudent.getAll(params)
                .then(response => {

                    const data = response.data
                    console.log(data)
                    setStudentList([data])

                    setLoading(false)
                }).catch(error => {

                    console.log(error)
                })

        }
        fetchAllStudent()
    }, [page]);
    const handle_next_page = () => {

        setPage(prevState => prevState + 1)

    }
    const handle_previous_page = () => {
        setPage((prevState) => Math.max(1, prevState - 1)); // Make sure page doesn't go below 1
    };
    return (<>
        <Flex>

            < AdminSidebarComponent></AdminSidebarComponent>


            <Stack flex={2} ml={20} mt={20} direction={"column"}>
                <Button bg={"#2671B1"} color={"white"} h={"41px"} maxW={"235px"} onClick={onOpen}>Add
                    students</Button>
                <Input minW={"777px"} h={"49px"} borderRadius={"8px"} bg={"#E0E0E0"} color={"gray.200"}
                    placeholder={"Search for a student by name or email"}></Input>
                <Student_Table></Student_Table>
                <Flex mx={5}>
                    <IconButton onClick={handle_previous_page} variant={"ghost"} aria-label={"ArrowLeft"}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </IconButton>
                    <Spacer>

                    </Spacer>

                    <IconButton isLoading={loading} variant={"ghost"} onClick={handle_next_page}
                        aria-label={"ArrowRight"} spinner={<BeatLoader size={8} color='black' />}>
                        <ArrowRightIcon></ArrowRightIcon>
                    </IconButton>
                </Flex>


            </Stack>
            <Box flex={1} right={"100px"}>
                <Stack mt={40} p={"auto"} direction={"column"} alignItems={"center"} zIndex={"800"} top={"200px"}>
                    <Heading>20110377</Heading>
                    <Avatar size={"2lg"}></Avatar>
                    <Text as={"b"}>Le Khanh Linh</Text>
                    <Text>Major</Text>
                    <Stack direction={"row"} spacing={8} fontSize={"37px"}>
                        <PhoneIcon></PhoneIcon>
                        <PhoneIcon></PhoneIcon>
                        <PhoneIcon></PhoneIcon>

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
                </Stack>
            </Box>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth={"900px"} minH={"600px"}>
                    {/*<ModalHeader>Create your account</ModalHeader>*/}
                    <ModalCloseButton />
                    <ModalBody minWidth={"900px"} pb={6}>

                        <Add_Student_FORM></Add_Student_FORM>


                    </ModalBody>

                </ModalContent>
            </Modal>

        </Flex>
    </>);
}