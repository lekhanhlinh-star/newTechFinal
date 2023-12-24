import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {apiService} from "../../../api/AxiosClient";
import {useParams} from "react-router-dom";
import {useCookies} from "react-cookie";


export function Update_Project() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const params = useParams()

    const [cookies] = useCookies();
    const token = cookies.jwt;
    const id = params["id"]
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [review, setReview] = useState("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [score, setScore] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
            const taskList_fetch = async () => {
                const headers = {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
                }

                await apiService.getOne("/projects", `${id}`, headers).then(response => {
                    const data = response.data.data;

                    setName(data.name)
                    setDescription(data.description)
                    setReview(data.review)
                    setScore(data.score)
                    setEndDate(new Date(data.endDate))
                    setStartDate(new Date(data.startDate))
                    console.log("data", data)
                }).catch(error => {
                    console.log(error)
                })
            }
            taskList_fetch()
        }


        , [])


    const handleInputName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(startDate)
        const data = {
            name: name, description: description, review: review, score: score, startDate: startDate, endDate: endDate,
        }

        const headers = {
            'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
        }

        await apiService.updateOne("projects", `${id}`, data, headers)
            .then(response => {
                console.log(response)
                setIsUpdate(!isUpdate)
            }).catch(error => {
                console.log(error)
            })

    }
    return (<>
        <Button size={"lg"} onClick={onOpen} minW={"200px"} colorScheme={"red"}>Edit</Button>


        <Modal isOpen={isOpen} size={"lg"} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Edit information project</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='First name'
                                   value={name} name={"name"} onChange={handleInputName}></Input>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea placeholder='Description' value={description} onChange={e => {
                                setDescription(e.target.value)
                            }}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Review</FormLabel>
                            <Textarea value={review} onChange={e => {

                                setReview(e.target.value)
                            }}/>
                        </FormControl>
                        <Stack direction={"row"}>
                            <FormControl>
                                <FormLabel>Score</FormLabel>
                                <Input type={"number"} name="endDate" value={score} onChange={e => {
                                    setScore(`${e.target.value}`)
                                }}
                                ></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Start Date</FormLabel>

                                <Input type={"date"} value={startDate ? startDate.toISOString().split('T')[0] : ''}
                                       name="startDate"
                                       onChange={e => {

                                           setStartDate(new Date(e.target.value))


                                       }}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>End Date</FormLabel>
                                <Input type={"date"} value={endDate ? endDate.toISOString().split('T')[0] : ''}
                                       name="endDate"
                                       onChange={e => {

                                           setEndDate(new Date(e.target.value))

                                       }}
                                ></Input>
                            </FormControl>


                        </Stack>
                        <Stack mt={10}>
                            <Button minH={"40px"} colorScheme="red" size={"full"} type={"submit"}>Submit</Button>
                        </Stack>

                    </form>

                    {/*<Lorem count={2}/>*/}

                </ModalBody>

            </ModalContent>
        </Modal>
    </>)

}