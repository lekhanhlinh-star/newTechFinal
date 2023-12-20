import {Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {apiService} from "../../api/AxiosClient";

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
    feedbackLecturer:{
        name: string;
};
    status: string;
    report:string


}

export function ProjectTable() {

    const _id_lecturer = "65798ccc4899d53f90551575";

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
                            {ProjectList?.map(project =>
                                <Tr
                                cursor="pointer"

                                _hover={{
                                    color: 'white', bg: "#2671B1"
                                }}>

                                <Td>
                                    <Text noOfLines={[1, 2, 3, 4]} overflowWrap={"break-word"} whiteSpace={"normal"}>
                                        {
                                            project.name
                                        }

                                    </Text>

                                </Td>
                                <Td>
                                    {
                                        project.schoolYear
                                    }
                                </Td>
                                <Td>
                                    {
                                        project.major.name
                                    }
                                </Td>
                                <Td>
                                    {
                                        project.feedbackLecturer?.name
                                    }
                                </Td>

                                <Td>
                                    {
                                        project.report
                                    }
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
                                            {
                                         new Date(project.startDate.toString()).toDateString()
                                    }
                                    </Text>

                                </Td>
                                <Td>
                                     <Text>
                                            {
                                         new Date(project.endDate.toString()).toDateString()
                                    }
                                    </Text>
                                </Td>

                            </Tr>)}


                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>);
}