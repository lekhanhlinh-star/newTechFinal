import {
    Avatar,
    Button,
    Flex,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Spacer,
    Stack,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {apiService} from "../../api/AxiosClient";

interface Project {
    _id: string;
    name: string;
    description: string;
    schoolYear: string;
    major: {
        name: string;
    };
    score: string
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

export function ProjectTable() {

    const {isOpen, onOpen, onClose} = useDisclosure()

    const _id_lecturer = "65798ccc4899d53f90551575";
    const [project, setProject] = useState<Project>();

    const [ProjectList, setProjectList] = useState<Project[]>();
    useEffect(() => {
        const fetchProject = async () => {
            const params = {
                lecturer: _id_lecturer
            }
            await apiService.getAll("projects", params)
                .then(response => {
                    const data = response.data.data
                    setProjectList(data)

                }).catch(error => {
                    console.log(error)
                })
        }
        fetchProject()
    }, []);
    const handle_click_project = async (id: string) => {

        await apiService.getOne("projects", id)
            .then(response => {
                const data = response.data.data
                setProject(data)
            })
            .catch(error => {
                console.log(error)
            })


    }


    return (<>
        <Flex>
            <TableContainer>
                <Table variant='simple'>
                    <Thead fontFamily={'Kumbh Sans'} fontSize={"40px"} fontStyle={"b"}>
                        <Tr>
                            <Th>Name</Th>
                            <Th>School year</Th>
                            <Th>Major</Th>
                            <Th>Feedback Lecturer</Th>
                            <Th>Report</Th>
                            <Th>Status</Th>
                            <Th>Score</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>


                        </Tr>
                    </Thead>
                    <Tbody fontSize={"15px"}>
                        {ProjectList?.map(project => <Tr

                            cursor="pointer"
                            onClick={() => {
                                handle_click_project(project._id)
                                onOpen()
                            }}

                            _hover={{
                                color: 'white', bg: "#2671B1"
                            }}>

                            <Td>
                                <Text noOfLines={[1, 2, 3, 4]} overflowWrap={"break-word"} whiteSpace={"normal"}>
                                    {project.name}

                                </Text>

                            </Td>
                            <Td>
                                {project.schoolYear}
                            </Td>
                            <Td>
                                {project.major.name}
                            </Td>
                            <Td>
                                {project.feedbackLecturer?.name}
                            </Td>

                            <Td>
                                {project.report}
                            </Td>
                            <Td>
                                {

                                    project.status

                                }
                            </Td>
                            <Td>
                                10
                            </Td>
                            <Td>
                                <Text>
                                    {new Date(project.startDate.toString()).toDateString()}
                                </Text>

                            </Td>
                            <Td>
                                <Text>
                                    {new Date(project.endDate.toString()).toDateString()}
                                </Text>
                            </Td>

                        </Tr>)}


                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>


        <Modal
            onClose={onClose}
            isOpen={isOpen}

        >
            <ModalOverlay/>
            <ModalContent justifyItems={"center"} minWidth={"900px"} minH={"600px"}>

                <ModalCloseButton/>
                <ModalBody>
                    <Flex justify={"center"}>
                        <Stack direction={['column', 'row']} minW={"100px"}>


                            <Stack spacing={"20px"} fontFamily={"Oswald"}>
                                <Heading mt={50} textAlign="center">Project</Heading>
                                <Flex>
                                    <Spacer></Spacer>
                                    <Avatar h={"70px"} w={"70px"} src={"projectIcon.png"}></Avatar>
                                    <Spacer></Spacer>
                                </Flex>


                                <HStack alignContent={"left"} spacing={8}>
                                    <Tag>Name: </Tag>
                                    <Text>{project?.name}</Text>


                                </HStack>
                                <HStack spacing={8} textAlign={"left"} justifyItems={"top"}>
                                    <Tag colorScheme={"red"}>Description: </Tag>
                                    <Text noOfLines={[1, 2, 3, 4, 5, 6]}
                                          maxWidth={"400px"}>{project?.description}</Text>


                                </HStack>


                                <HStack spacing={8}>
                                    <Tag colorScheme={"red"}>Major: </Tag>
                                    <Text noOfLines={[1, 2, 3, 4, 5, 6]}
                                          maxWidth={"400px"}>{project?.major.name}</Text>


                                </HStack>
                                <HStack spacing={8}>

                                    <Tag colorScheme={"red"}>Start Date: </Tag>
                                    <Text> {project?.startDate ? new Date(project.startDate).toDateString() : 'No start date available'}</Text>

                                </HStack>
                                <HStack spacing={8}>

                                    <Tag colorScheme={"red"}>End Date: </Tag>
                                    <Text> {project?.endDate ? new Date(project.endDate).toDateString() : 'No start date available'}</Text>

                                </HStack>
                                <HStack spacing={8}>

                                    <Tag colorScheme={"red"}>Score: </Tag>
                                    <Text> {project?.score}</Text>

                                </HStack>

                                <HStack spacing={8}>

                                    <Tag colorScheme={"red"}>Feedback Lecturer: </Tag>
                                    <Text> {project?.feedbackLecturer?.name}</Text>

                                </HStack>
                                <HStack spacing={8}>

                                    <Tag colorScheme={"red"}>Review: </Tag>
                                    <Text> {project?.feedbackLecturer?.name}</Text>

                                </HStack>


                            </Stack>
                        </Stack>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>);
}