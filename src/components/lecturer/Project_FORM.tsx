import {
    Avatar,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Select,
    Spacer,
    Stack,
    Textarea,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {apiService} from "../../api/AxiosClient";


interface Project {
    name: string;
    description: string;
    schoolYear: string;
    major: string;
    lecturer: string;
    startDate: Date;
    endDate: Date;


}

interface Major {
    _id: string;
    name: string;

}

export function Project_FORM() {
    const toast = useToast()
    const [majorList, setMajorList] = useState<Major[]>([]);

    const id_lecturer = "65798ccc4899d53f90551575"
    const [projectInfo, setProjectInfo] = useState<Project | object>({
        lecturer: id_lecturer

    });
    useEffect(() => {

        const fetch = async () => {
            await apiService.getAll("majors")
                .then(response => {
                    const majors = response.data.data
                    console.log(majors)
                    setMajorList(majors)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        fetch()
        console.log(majorList)

    }, []);
    const handleInputChange = (event: any) => {
        const {name, value} = event.target;
        setProjectInfo((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
        console.log(projectInfo)

    }
    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            await apiService.createOne("projects", projectInfo).then(response => {


                toast({
                    title: 'Create a new project successful',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })


            }).catch(e => {
                toast({
                    title: 'Create a new project fail',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top',
                })
            })


        } catch (error) {
            console.error('Login error:', error);
        }

    }
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (<>
    <Button bg={"#2671B1"} color={"white"} h={"41px"} maxW={"235px"} onClick={onOpen}>Add
        Project</Button>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent minWidth={"900px"} minH={"600px"}>
            {/*<ModalHeader>Create your account</ModalHeader>*/}
            <ModalCloseButton/>
            <ModalBody minWidth={"900px"} pb={6}>


                <Flex justify={"center"}>
                    <Stack direction={['column', 'row']}>
                        <form onSubmit={handleSubmitForm}>

                            <Stack spacing={"20px"} fontFamily={"Oswald"}>
                                <Heading mt={50} textAlign="center">Create a new project</Heading>
                                <Flex>
                                    <Spacer></Spacer>
                                    <Avatar h={"70px"} w={"70px"} src={"projectIcon.png"}></Avatar>
                                    <Spacer></Spacer>
                                </Flex>


                                <HStack spacing={8}>

                                    <FormControl isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input minW={"600px"} type={"text"} onChange={handleInputChange}
                                               placeholder={"Name"} name="name"></Input>
                                    </FormControl>


                                </HStack>
                                <HStack spacing={8}>


                                    <FormControl isRequired>
                                        <FormLabel>School year</FormLabel>
                                        <Input type={"text"} onChange={handleInputChange}
                                               placeholder={"School year"} name="schoolYear"></Input>
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Major</FormLabel>
                                        <Select placeholder='Select major'  onChange={handleInputChange}
                                                name="major">


                                        {majorList.map((major) => <option
                                            value={major._id}>{major.name}</option>)}


                                    </Select>
                                </FormControl>

                            </HStack>


                            <HStack spacing={8}>


                                <FormControl isRequired>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input type={"date"} onChange={handleInputChange} name="startDate"
                                           placeholder={"Start Date"}></Input>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>End Date</FormLabel>
                                    <Input type={"date"} onChange={handleInputChange} name="endDate"
                                           placeholder={"End Date"}></Input>
                                </FormControl>


                            </HStack>
                            <HStack spacing={8}>


                                <FormControl isRequired>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea onChange={handleInputChange} name={"description"}
                                              placeholder='Here is the description'/>
                                </FormControl>


                            </HStack>
                            <Button border='2px'
                                    borderColor='green.500' type={"submit"} colorScheme={"red"}
                                    w={"full"}>Add</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>

    </ModalBody>

    </ModalContent>
</Modal>


</>)

}