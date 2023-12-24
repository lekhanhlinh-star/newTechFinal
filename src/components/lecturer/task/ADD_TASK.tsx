import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    useDisclosure, useToast
} from "@chakra-ui/react";
import React, {useState} from "react";
import {apiService} from "../../../api/AxiosClient";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {FaTasks} from "react-icons/fa";

interface Task {
    _id: string;
    task: string;
    endDate: string;
    startDate: string;
}

export function ADD_TASK() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const params = useParams()
    const toast = useToast()

    const id = params["id"]
    const [taskData, setTaskData] = useState<object>({
        "project": id, "task": "", "endDate": new Date(), " endDate": new Date(),
    });
    const [cookies] = useCookies();
    const token = cookies.jwt;
    const handleChange = (event: any) => {
        const {name, value} = event.target;
        console.log(name, value)
        setTaskData((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    }
    const headers = {
        'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
    }
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await apiService.createOne("/tasks", taskData,headers)
            .then(response => {

                toast({
                    title: 'Create a new task successful', status: 'success', duration: 1000, isClosable: true, position: 'top',onCloseComplete:()=>{
                        window.location.reload();
                    }
                })

                console.log(response)
            })
            .catch(error => {
               toast({
                    title: 'Create a new task error', status: 'error', duration: 1000, isClosable: true, position: 'top',
                })
            })
    }
    return (<>


        <Button onClick={onOpen} leftIcon={    <FaTasks />} >Add Task</Button>

        <Modal

            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <form onSubmit={handleSubmit}>
                <ModalContent>
                    <ModalHeader>Add Task</ModalHeader>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Stack direction={"column"}>
                            <Stack>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Task</FormLabel>
                                    <Textarea name={"task"} placeholder='Description' onChange={handleChange}/>
                                </FormControl>
                            </Stack>
                            <Stack direction={"row"}>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input name={"startDate"} onChange={handleChange} type={"date"}/>
                                </FormControl>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>End Date</FormLabel>
                                    <Input name={"endDate"} onChange={handleChange} type={"date"}/>
                                </FormControl>
                            </Stack>

                        </Stack>


                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' type={"submit"} mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    </>);
}