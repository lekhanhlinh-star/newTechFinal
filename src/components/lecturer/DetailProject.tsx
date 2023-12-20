import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {apiService} from "../../api/AxiosClient";
import {Box, Button, Checkbox, Flex, HStack, Spacer, Stack, Tag, Text} from "@chakra-ui/react";

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
    const [projectData, setProjectData] = useState<Project>();
    const id = params["id"]
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
    return (<>

        <Box textAlign={"left"} m={200}>


            <Stack spacing={12}>
                <HStack>
                    <Stack>
                        <Flex>
                            <Tag colorScheme='green' mr={5} fontSize={"24px"}>Project: </Tag>
                            <Text>{projectData?.name}</Text>

                        </Flex>
                    </Stack>
                    <Spacer></Spacer>

                    <Stack>

                        <Button>Delete</Button>
                    </Stack>
                   

                </HStack>

                <Stack>
                    <Flex>
                        <Tag colorScheme='blue' mr={5} fontSize={"24px"}>Description: </Tag>
                        <Text>{projectData?.description}</Text>

                    </Flex>
                </Stack>
                <Stack>
                    <Flex>
                        <Tag colorScheme='blue' mr={5} fontSize={"24px"}>Report: </Tag>
                        <Text>{projectData?.report} file here</Text>

                    </Flex>
                </Stack>


                <Stack>
                    <Flex>
                        <Tag mr={5} colorScheme={"yellow"} fontSize={"24px"}>Start Date: </Tag>
                        <Text> {projectData?.startDate ? new Date(projectData.startDate).toDateString() : 'No start date available'}</Text>

                    </Flex>
                </Stack>
                <Stack>
                    <Flex>
                        <Tag colorScheme={"red"} mr={5} fontSize={"24px"}>End Date: </Tag>
                        <Text> {projectData?.endDate ? new Date(projectData.endDate).toDateString() : 'No end date available'}</Text>

                    </Flex>
                </Stack>
                <Stack>
                    <Button colorScheme={"red"}>Edit project</Button>

                    <Button colorScheme={"blue"}>Add Task</Button>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>

                        <Checkbox size='lg' colorScheme='orange' defaultChecked>
                            Task 1
                        </Checkbox>
                    </Stack>
                      <Stack spacing={[1, 5]} direction={['column', 'row']}>

                        <Checkbox size='lg' colorScheme='orange' defaultChecked>
                            Task 1
                        </Checkbox>
                    </Stack>
                      <Stack spacing={[1, 5]} direction={['column', 'row']}>

                        <Checkbox size='lg' colorScheme='orange' defaultChecked>
                            Task 1
                        </Checkbox>
                    </Stack>
                </Stack>


            </Stack>


        </Box>


    </>);
}