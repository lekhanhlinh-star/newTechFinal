import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {apiService} from "../../../api/AxiosClient";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Stack,
    Tag,
    TagRightIcon,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {FcAbout, FcAdvertising, FcCalendar, FcCheckmark, FcDocument, FcOpenedFolder} from "react-icons/fc";
import {useCookies} from "react-cookie";
import {ChevronLeftIcon} from "@chakra-ui/icons";
import {Update_Project} from "./Update_Project";
import {ADD_TASK} from "../task/ADD_TASK";
import {RiDeleteBin6Line} from "react-icons/ri";
import {EDIT_TASK} from "../task/EDIT_TASK";
import {REVIEW_TASK} from "../task/REVIEW_TASK";

interface Project {
    _id: string;
    name: string;
    description: string;
    schoolYear: string;
    major: {
        name: string;
    };
    lecturer: {
        name: string;
    };
    startDate: Date;
    endDate: Date;
    feedbackLecturer: {
        name: string;
    };
    status: string;
    report: string


}

export function DetailProject() {
    const params = useParams()
    const id = params["id"]
    const [projectData, setProjectData] = useState<Project>();
    const navigate = useNavigate();
    const [cookies] = useCookies();
    const token = cookies.jwt;
    const headers = {
        'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
    }
    const [TaskList, setTaskList] = useState<any[]>([]);
    const {isOpen, onOpen, onClose} = useDisclosure()
    useEffect(() => {
        const fetch_data = async () => {
            await apiService.getOne("projects", `${id}`)
                .then(response => {
                    const data = response.data.data
                    setProjectData(data)
                    console.log(data)
                }).catch(error => {
                    console.log(error)
                })
        }
        fetch_data()

    }, []);
    useEffect(() => {
        const fetch_data = async () => {
            const params = {
                project: id
            }

            await apiService.getAll("/tasks", params, headers)
                .then(response => {

                    const data = response.data.data
                    setTaskList(data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        fetch_data()
    }, []);
    const toast = useToast();
    const handleDelete = async (id:string) => {
        await apiService.deleteOne("/tasks", id,headers)
            .then(response => {
                 toast({
                    title: 'Delete successful', status: 'success', duration: 1000, isClosable: true, position: 'top',onCloseComplete:()=>{
                        window.location.reload();
                    }
                })
            }).catch(error => {
                 toast({
                    title: 'Delete task error', status: 'error', duration: 1000, isClosable: true, position: 'top'
                })
               })
    }
    return (<>

        <Box>
            <Flex bg={"blue"} minH={"60px"} justifyItems={"center"}>
                <Button
                    minH={"60px"}
                    colorScheme='red'
                    aria-label='Call Segun'
                    size='lg'

                    leftIcon={<ChevronLeftIcon></ChevronLeftIcon>}
                >
                    Back
                </Button>


                <Spacer></Spacer>
                <Heading>
                    Topic management
                </Heading>
                <Spacer></Spacer>


            </Flex>

            <Stack m={"100px"} spacing={5}>
                <HStack>
                    <Stack>
                        <Flex justifyItems={"center"}>

                            <Icon fontSize={"50px"} as={FcDocument}></Icon>
                            <Flex>
                                <Text colorScheme='green' mx={5} as={"b"} fontSize={"20px"}>Project: </Text>
                                <Text justifyContent={"center"}>{projectData?.name}</Text>
                            </Flex>


                        </Flex>
                    </Stack>


                </HStack>

                <Stack>
                    <Flex>
                        <Icon as={FcAbout} fontSize={"50px"}></Icon>
                        <Text colorScheme='green' mx={5} as={"b"} fontSize={"20px"}>Description: </Text>

                        <Text>{projectData?.description}</Text>

                    </Flex>
                </Stack>
                <Stack>
                    <Flex>
                        <Icon as={FcOpenedFolder} fontSize={"50px"}></Icon>
                        <Text as={"b"} colorScheme='blue' mx={5} fontSize={"24px"}>Report: </Text>
                        <Text>{projectData?.report} file here</Text>

                    </Flex>
                </Stack>


                <Stack>
                    <Flex>
                        <Icon as={FcCalendar} fontSize={"50px"}></Icon>

                        <Text as={"b"} mx={5} colorScheme={"yellow"} fontSize={"20px"}>From: </Text>
                        <Text> {projectData?.startDate ? new Date(projectData.startDate).toDateString() : 'No start date available'}</Text>

                        <Text as={"b"} mx={5} colorScheme={"yellow"} fontSize={"20px"}>To: </Text>
                        <Text
                            ml={"40px"}> {projectData?.endDate ? new Date(projectData.endDate).toDateString() : 'No end date available'}</Text>

                    </Flex>
                </Stack>

                <Stack borderBottom={"solid 1px"} pb={10}>
                    <Flex>
                        <Spacer></Spacer>
                        <Stack direction={"row"} spacing={10}>
                            <Update_Project></Update_Project>
                            <Button size={"lg"} minW={"200px"} colorScheme={"yellow"}>Phê duyệt</Button>
                            <Button size={"lg"} minW={"200px"} colorScheme={"pink"} onClick={onOpen}>Delete</Button>

                            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay/>
                                <ModalContent>
                                    <ModalHeader>Are you sure you want to delete</ModalHeader>
                                    <ModalBody>


                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} onClick={async () => {
                                            await apiService.deleteOne("projects", id as string).then(response => {
                                                toast({
                                                    title: 'Delete project successful',
                                                    status: 'success',
                                                    duration: 1000,
                                                    isClosable: true,
                                                    position: 'top',
                                                    onCloseComplete: () => {
                                                        navigate("/lecturers")
                                                    }
                                                })

                                            })
                                            onClose()
                                        }}>
                                            Okay
                                        </Button>
                                        <Button colorScheme='red' onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>


                        </Stack>

                        <Spacer></Spacer>

                    </Flex>


                </Stack>

                <Stack>
                    <Stack mb={100}>
                        <Flex>
                            <Spacer/>
                            <Heading>
                                Tasks

                            </Heading>

                            <Spacer/>

                            <Flex>
                                <ADD_TASK></ADD_TASK>
                            </Flex>
                        </Flex>

                    </Stack>
                    <Stack direction={"column"} spacing={"100px"}>

                        {TaskList.map(x =>

                            <Stack>
                                <Flex>
                                    <Icon as={FcCalendar} fontSize={"30px"}></Icon>
                                    <Text as={"b"}>From </Text>
                                    <Text mx={10}>{new Date(x.startDate.toString()).toDateString()}</Text>
                                    <Text as={"b"}>To</Text>
                                    <Text mx={10}>{new Date(x.endDate.toString()).toDateString()}</Text>
                                    <Tag textTransform={"uppercase"}
                                         colorScheme={x.status === "assigned" ? "red" : x.status === "process" ? "blue":"yellow"}> {x.status}

                                        {x.status === "assigned" ? <TagRightIcon as={FcAdvertising } />  : x.status === "process" ? <TagRightIcon as={FcCheckmark} /> : "yellow"}

                                    </Tag>

                                    <Spacer></Spacer>
                                    <EDIT_TASK id={x._id}></EDIT_TASK>

                                    <Button leftIcon={<RiDeleteBin6Line />} onClick={()=>{
                                        handleDelete(x._id)
                                    }}>Delete</Button>

                                </Flex>
                                <Flex>

                                    <Text>{x.task}</Text>
                                </Flex>
                                <Stack direction={"row"}>
                                   <REVIEW_TASK id={x._id}></REVIEW_TASK>

                                </Stack>


                            </Stack>)}

                    </Stack>


                </Stack>
            </Stack>


        </Box>


    </>)

}