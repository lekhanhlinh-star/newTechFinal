import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {apiService} from "../../api/AxiosClient";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    ListItem,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    OrderedList,
    Spacer,
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {useCookies} from "react-cookie";
import {ChevronLeftIcon} from "@chakra-ui/icons";
import {FcAbout, FcCalendar, FcDocument, FcOpenedFolder} from "react-icons/fc";
import {Update_Project} from "./Update_Project";

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
    const navigate=useNavigate();
    const [cookies] = useCookies();
    const token = cookies.jwt;
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
    const toast = useToast();
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
                                                    title: 'Delete project successful', status: 'success', duration: 1000, isClosable: true, position: 'top',onCloseComplete:()=>{
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
                    <Stack>
                        <Flex>
                            <Spacer/>
                            <Heading>
                                Tasks
                            </Heading>
                            <Spacer/>
                        </Flex>
                    </Stack>


                    <OrderedList>
                        <ListItem>Lorem ipsum dolor sit amet</ListItem>
                        <ListItem>Consectetur adipiscing elit</ListItem>
                        <ListItem>Integer molestie lorem at massa</ListItem>
                        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                    </OrderedList>
                </Stack>
            </Stack>


        </Box>


    </>)

}