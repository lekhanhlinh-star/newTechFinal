import {
    Button,
    Flex,
    Select,
    Table,
    TableContainer,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {apiService} from "../../../api/AxiosClient";
import {useCookies} from "react-cookie";
import {FcCheckmark} from "react-icons/fc";
import {VscChromeClose} from "react-icons/vsc";
import {AssignModal} from "./AssignModal";

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
        firstName: string;
        lastName: string;
    };
    startDate: Date;
    endDate: Date;
    feedbackLecturer: {
        firstName: string;
        lastName: string;
    };
    status: string;
    report: string


}

export function PrjectMangementHoD() {
    const [ProjectList, setProjectList] = useState<Project[]>();


    const [cookies] = useCookies();
    const token = cookies.jwt;
    const toast = useToast();


    const updateStatusById = (projectId: string, newStatus: string): void => {
        // Use map to create a new array with the updated status
        const updatedProjectList = ProjectList?.map((project) => {
            // Check if the current project has the matching _id
            if (project._id === projectId) {
                // If yes, update the status and return the updated project
                return {...project, status: newStatus};
            }
            // If no match, return the original project
            return project;
        });

        // Update the state with the new array
        setProjectList(updatedProjectList);
    };
    useEffect(() => {
        const fetchProject = async () => {
            const params = {}
            const headers = {
                'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
            }
            await apiService.getAll("projects", params, headers)
                .then(response => {
                    const data = response.data.data
                    setProjectList(data)

                }).catch(error => {
                    console.log(error)
                })
        }
        fetchProject()
    }, []);
    const handleAcceptProject = async (id: string) => {

        const data = {
            status: "browsed"
        }
        const header = {
            "Accept": "application/json", 'authorization': 'Bearer ' + token
        }
        await apiService.updateOne("projects", id, data, header)
            .then(response => {
                toast({
                    title: 'This project was accepted',
                    status: 'success',
                    duration: 500,
                    isClosable: true,
                    position: 'top',
                })
                updateStatusById(id, data.status)
            })
            .catch(error => {

            })
    }


    const handleRejectProject = async (id: string) => {

        const data = {
            status: "no browse"
        }
        const header = {
            "Accept": "application/json", 'authorization': 'Bearer ' + token
        }
        await apiService.updateOne("projects", id, data, header)
            .then(response => {
                toast({
                    title: 'This project was rejected',
                    status: 'info',
                    duration: 500,
                    isClosable: true,
                    position: 'top',
                })
                updateStatusById(id, data.status)
            })
            .catch(error => {

            })
    }


    return (<>
        <Flex>
            <TableContainer>
                <Table variant='simple'>
                    <Thead fontFamily={'Kumbh Sans'} fontSize={"40px"} fontStyle={"b"}>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Year</Th>
                            <Th>Major</Th>
                            <Th>Status</Th>
                            <Th>Instruction Lecture</Th>
                            <Th>Feedback Lecture</Th>
                            <Th>Start Date</Th>
                            <Th>End Date</Th>


                        </Tr>
                    </Thead>
                    <Tbody fontSize={"15px"}>
                        {ProjectList?.map(project => <Tr>

                            <Td>
                                <Text noOfLines={[1, 2, 3, 4]} overflowWrap={"break-word"} whiteSpace={"normal"}>
                                    {project.name}

                                </Text>

                            </Td>
                            <Td>
                                {project.schoolYear}
                            </Td>
                            <Td>
                                {project.major?.name}
                            </Td>

                            <Td>
                                {project.status === "no browse" ? <Tag colorScheme={"red"}> Reject</Tag> :
                                    <Tag colorScheme={"blue"}> Accept</Tag>}
                            </Td>
                                <Td>
                                {      project?.lecturer?.firstName && project?.lecturer?.lastName ? project?.lecturer?.firstName+ " " + project.lecturer?.lastName:" "}
                            </Td>
                              <Td>
                                {      project?.feedbackLecturer?.firstName && project?.feedbackLecturer?.lastName ? project?.feedbackLecturer?.firstName+ " " + project.feedbackLecturer?.lastName:<Tag colorScheme={"red"}>No assign</Tag>}
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

                            <Td>
                                <Button  color={"green"} onClick={() => {
                                    handleAcceptProject(project._id as string)
                                }} leftIcon={<FcCheckmark/>}></Button>




                                <Button mx={5} color={"red"} leftIcon={<VscChromeClose/>} onClick={() => {
                                    handleRejectProject(project._id as string)
                                }}></Button>


                                <AssignModal id={project?._id as string}></AssignModal>
                            </Td>


                        </Tr>)}


                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>


    </>);
}