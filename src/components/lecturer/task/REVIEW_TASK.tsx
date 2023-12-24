import {
    Button,
    FormControl,
    FormLabel,
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


interface Task {
    review: string
    project: string
}

interface idTask {
    id: string;
}

export function REVIEW_TASK(props: idTask) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const params = useParams()
    const toast = useToast()

    const id = params["id"]
    const [taskData, setTaskData] = useState<Task>({
        review: "", project: id as string,


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


        <Button onClick={onOpen} colorScheme={"facebook"}>Review</Button>

        <Modal

            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <form onSubmit={handleSubmit}>
                <ModalContent>
                    <ModalHeader>Review Task</ModalHeader>
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Stack direction={"column"}>
                            <Stack>
                                <FormControl mt={4} isRequired>
                                    <FormLabel>Review</FormLabel>
                                    <Textarea name={"review"} placeholder='Description' value={taskData.review}
                                              onChange={handleChange}/>
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