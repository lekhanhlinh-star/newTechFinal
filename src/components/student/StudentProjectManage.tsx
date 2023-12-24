import { Avatar, Button, Container, Text, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, useDisclosure, Box, useToast } from "@chakra-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BellIcon, CheckIcon } from "@chakra-ui/icons";


export function StudentProjectManage(data: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

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

    console.log(waiting)
    return (<>
        <Flex direction={"column"}>
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
        </Flex >

    </>);
}

export default memo(StudentProjectManage);
