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
    Select,
    Stack,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {apiService, AxiosClient} from "../../../api/AxiosClient";
import {useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";


interface Lecture {
    id: string;
}

interface User {
    _id: string;
    firstName: string;
    lastName: string;
}

export function AssignModal(props: Lecture) {


    const [cookies] = useCookies();
    const token = cookies.jwt;
    const toast = useToast()
    const headers = {
        'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
    }
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [searchString, setSearchString] = useState("");
    const [Lecturer, setLecturer] = useState<User[]>();
    const [feedback, setFeedback] = useState("");
    const hanleSearch = async () => {
        const params = {
            search: searchString, role: "lecturer"
        }
        await apiService.getAll("users", params)
            .then(response => {
                setLecturer(response.data.data);
            })
            .catch(error => {
                console.log(error)
            })
    }
    const hanleAssign = async () => {
        if (feedback !== "") {
            const body = {
                lecturer: feedback
            }


            const id = props.id as string
            await AxiosClient.patch(`projects/${id}/feedBackLecturer`, body, {
                headers: {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + token

                }
            })
                .then(respon => {
                             toast({
                    title: 'Assign feedback lecturer success',
                    status: 'info',
                    duration: 500,
                    isClosable: true,
                    position: 'top',
                })
                }).catch(error =>  toast({
                    title: 'Assign feedback lecturer error',
                    status: 'error',
                    duration: 500,
                    isClosable: true,
                    position: 'top',
                }))
        }

    }
    return (<>

            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Assign feedback lecturer </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={10}>
                            <Stack direction={"row"}>


                                <Input type='text' onChange={e => {
                                    setSearchString(e.target.value as string);
                                }}/>

                                <Button onClick={() => hanleSearch()}>search</Button>
                            </Stack>


                            <FormControl isRequired>
                                <FormLabel>Select lecture</FormLabel>
                                <Select placeholder='Select lecture' onChange={e => {
                                    setFeedback(e.target.value as string);
                                }}>
                                    {Lecturer?.map(O => <option
                                        value={O._id}>{O.firstName + " " + O.lastName}</option>)}


                                </Select>
                            </FormControl>


                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>{
                            hanleAssign()
                        }}>
                            Assign
                        </Button>
                        <Button onClick={onClose} variant='ghost'>Cannel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )

}