import { Avatar, Button, Container, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure, Box, useToast } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { AddIcon, BellIcon, CheckIcon } from "@chakra-ui/icons";
import StudentEditTask from "./StudentEditTask";


export function StudentProjectManage(data: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast();

    const [tasksprogress, settasksprogress] = useState<any[]>([])
    const [tasksdone, settasksdone] = useState<any[]>([])
    const [loading, setLoading] = useState(true);


    const [waiting, setwaiting] = useState<any[]>([])
    useEffect(() => {
        const getWaiting = async () => {
            await axios.get(`http://localhost:5000/api/v1/users?projectWaiting=${data.data.current._id}`, {
                headers: {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + data.token
                }
            }).then(data => {
                console.log(data.data.data.data)
                setwaiting(data.data.data.data)
            }).catch((err) => {
                console.log(err)
            })


        }
        getWaiting()
    }, [])

    useEffect(() => {
        const task = async () => {

            await axios.get(`http://localhost:5000/api/v1/tasks?project=${data.data.current._id}&status=assigned`, {
                headers: {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + data.token
                }
            }).then(data => {
                console.log(data.data.data.data)
                settasksprogress(data.data.data.data)
            }).catch((err) => {
                console.log(err)
            })

            await axios.get(`http://localhost:5000/api/v1/tasks?project=${data.data.current._id}&status=done`, {
                headers: {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + data.token
                }
            }).then(data => {
                settasksdone(data.data.data.data)
            }).catch((err) => {
                console.log(err)
            })
            setLoading(false)

        }
        task()
    }, [])

    const handleAccept = async (id: string) => {
        await axios.patch(`http://localhost:5000/api/v1/projects/${id}/browseProjectMember`, {
            headers: {
                'Content-Type': 'application/json', 'authorization': 'Bearer ' + data.token
            }
        }).then(data => {
            toast({
                title: "Update successful", status: "success", duration: 1000, isClosable: true, position: "top",
                onCloseComplete: () => {
                    window.location.reload();
                }
            });
        }).catch((err) => {
            console.log(err)
            toast({
                title: err.response.data.message, status: "error", duration: 1000, isClosable: true, position: "top",
            });
        })
    }


    if (loading) {
        return <p>Loading...</p>; // Render a loading indicator while waiting for useEffect to complete
    }

    return (<>
        <Flex direction={"column"} width={"100%"} >
            {
                waiting.length != 0 ? <Button m={5} leftIcon={<BellIcon />} onClick={onOpen} color="red">{`You have ${waiting.length} waiting to accept`}
                    < Modal isOpen={isOpen} onClose={onClose} >
                        <ModalOverlay />
                        <ModalContent minH={500}>
                            <ModalHeader>Waiting</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {
                                    waiting ? waiting.map((x: any) =>
                                        <Flex mb={5} p={5} _hover={{
                                            background: "lightgray",
                                            color: "black",
                                        }}>
                                            <Avatar src="https://cdn-icons-png.flaticon.com/128/3135/3135773.png"></Avatar>
                                            <Text ml={3} mt={3}>{x.firstName} {x.lastName}</Text>
                                            <Spacer></Spacer>
                                            <Button rightIcon={<CheckIcon />} bg={"greenyellow"} onClick={() => {
                                                handleAccept(x._id)
                                            }}>Accept</Button>
                                        </Flex>
                                    ) : null
                                }
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Button> : null
            }
            <Box m={10} borderRadius={30} bg={"orange"} minH={50} minW={150} maxW={200} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: "fantasy"
            }}
            >
                Progress
            </Box>
            <Flex direction={"column"}>
                {
                    tasksprogress?.map(x =>
                        <Flex py={4} px={20} _hover={{ background: "lightgray", color: "black" }}>
                            <Text flex={1} textAlign="left">{x.task}</Text>
                            <Text flex={1} textAlign="left">{x.startDate.slice(0, 10)}</Text>
                            <Text flex={1} textAlign="left">{x.endDate.slice(0, 10)}</Text>
                            <StudentEditTask data={x}></StudentEditTask>
                        </Flex>
                    )
                }

            </Flex>


            <Box m={10} borderRadius={30} bg={"greenyellow"} minH={50} minW={150} maxW={200} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: "fantasy"
            }}
            >
                Done
            </Box>

            <Flex direction={"column"}>
                {
                    tasksdone?.map(x =>
                        <Flex py={4} px={20} _hover={{
                            background: "lightgray",
                            color: "black",
                        }}>
                            <Text flex={1} textAlign={"left"}>{x.task}</Text>
                            <Text flex={1} textAlign={"left"}>{x.descriptionOfStudent}</Text>
                            <Text flex={1} textAlign={"left"}>{x.review}</Text>
                            <Text flex={1} textAlign={"left"}>{x.report}</Text>
                        </Flex>
                    )
                }

            </Flex>

        </Flex >

    </>);
}

export default memo(StudentProjectManage);
