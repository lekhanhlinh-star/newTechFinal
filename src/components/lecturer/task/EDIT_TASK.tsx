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
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {apiService} from "../../../api/AxiosClient";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";
import {FaEdit} from "react-icons/fa";


interface Task {
    _id: string;
    task: string;
    endDate: Date;
    startDate: Date;
    project: string
}

interface idTask {
    id: string;
}

export function EDIT_TASK(props: idTask) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const params = useParams()
    const toast = useToast()

    const id = params["id"]
    const [taskData, setTaskData] = useState<Task>({
        _id: props.id as string
        , project: id as string,
        task: "",
        endDate: new Date(),
        startDate: new Date(),
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
    useEffect(() => {
        const FetchData = async () => {
            await apiService.getOne("tasks", props.id as string, headers)
                .then(response => {
                    // console.log(response)
                    // setTaskData()
                    const data = response.data.data
                    setTaskData(data)
                }).catch(error => {
                    console.log(error)
                })
        }
        FetchData()
    }, []);
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await apiService.updateOne("/tasks", props.id, taskData, headers)
            .then(response => {

                toast({
                    title: 'Update new task successful', status: 'success', duration: 1000, isClosable: true, position: 'top', onCloseComplete: () => {
                        window.location.reload();
                    }
                })

                console.log(response)
            })
            .catch(error => {
                toast({
                    title: 'Update a new task error', status: 'error', duration: 1000, isClosable: true, position: 'top',
                })
            })
    }
    return (<>


        <Button leftIcon={<FaEdit/>} onClick={onOpen} mx={12}>Edit</Button>

        <Modal

            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <form onSubmit={handleSubmit}>
                <ModalContent>
                    <ModalHeader>Edit Task</ModalHeader>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Stack direction={"column"}>
                            <Stack>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Task</FormLabel>
                                    <Textarea name={"task"} placeholder='Description' value={taskData.task}
                                              onChange={handleChange}/>
                                </FormControl>
                            </Stack>
                            <Stack direction={"row"}>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input name={"startDate"} onChange={handleChange} type={"date"}/>
                                </FormControl>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>End Date</FormLabel>
                                    <Input name={"endDate"} onChange={handleChange}  value={taskData?.endDate ? new Date( taskData.endDate).toISOString().split('T')[0] : ''} type={"date"}/>
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