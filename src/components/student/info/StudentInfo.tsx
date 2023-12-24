import { Avatar, Container, Flex, Icon, Text, Image, Stack, Button, Spacer, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import StudentSlidebar from "../StudentSlidebar";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import { apiService } from "../../../api/AxiosClient";
import { useCookies } from "react-cookie";
import EDIT_ME from "./EditInfo"

export function StudentInfo() {
    const [info, setinfo] = useState<any>()
    const [cookies] = useCookies();

    const token = cookies.jwt;
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
    useEffect(() => {
        const fetch_data = async () => {
            await axios.get("http://localhost:5000/api/v1/" + "users/me", {
                headers: {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
                }
            }).then(data => {
                console.log(data.data.data.data)
                setinfo(data.data.data.data)
            })
        }
        fetch_data()
    }, [])

    return (<>
        <Flex letterSpacing={2} >
            < StudentSlidebar></StudentSlidebar>
            <Flex direction={"column"} width={"100%"}>
                <Flex >
                    <Avatar src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg" size={"xl"} mx={20} my={10}></Avatar>
                    <Flex my={10} direction={"column"} alignItems={"flex-start"}>
                        <Text size={"xl"}>{`${info?.firstName} ${info?.lastName}`}</Text>
                        <Text size={"xl"}>{info?.major?.name}</Text>
                        <Text>{info?.class?.name}</Text>
                    </Flex>
                </Flex>
                <Flex mx={20} my={10}>
                    <Flex flex={1}>
                        <Image
                            boxSize='70px'
                            src="https://cdn-icons-png.flaticon.com/128/2165/2165061.png"
                            alt=""
                        />
                        <Flex direction={"column"} alignItems={"flex-start"} ml={5} mt={1}>
                            <Text >Email</Text>
                            <Text>{info?.email}</Text>
                        </Flex>
                    </Flex>
                    <Flex flex={1}>
                        <Image
                            boxSize='70px'
                            src="https://cdn-icons-png.flaticon.com/128/1244/1244336.png"
                            alt=""
                        />
                        <Flex direction={"column"} alignItems={"flex-start"} ml={5} mt={1}>
                            <Text >Birthday</Text>
                            <Text>{info?.birthday}</Text>
                        </Flex>
                    </Flex>

                    <Flex flex={1}>
                        <Image
                            boxSize='70px'
                            src="https://cdn-icons-png.flaticon.com/128/2436/2436805.png"
                            alt=""
                        />
                        <Flex direction={"column"} alignItems={"flex-start"} ml={5} mt={1}>
                            <Text >Class</Text>
                            <Text>{info?.class?.name}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex mx={20} mb={5}>
                    <Flex flex={1}>
                        <Image
                            boxSize='70px'
                            src="https://cdn-icons-png.flaticon.com/128/2556/2556165.png"
                            alt=""
                        />
                        <Flex direction={"column"} alignItems={"flex-start"} ml={5} mt={1}>
                            <Text>Gender</Text>
                            <Text>{info?.gender}</Text>
                        </Flex>
                    </Flex>
                    <Flex flex={1}>
                        <Image
                            boxSize='70px'
                            src="https://cdn-icons-png.flaticon.com/128/1295/1295181.png"
                            alt=""
                        />
                        <Flex direction={"column"} alignItems={"flex-start"} ml={5} mt={1}>
                            <Text >Address</Text>
                            <Text>{info?.address}</Text>
                        </Flex>
                    </Flex>
                    <Flex flex={1}>
                        <Image
                            boxSize='70px'
                            src="https://cdn-icons-png.flaticon.com/128/126/126509.png"
                            alt=""
                        />
                        <Flex direction={"column"} alignItems={"flex-start"} ml={5} mt={1}>
                            <Text >Phone</Text>
                            <Text>{info?.phone}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex justifyContent="center" mx={20} my={10} >
                    <Spacer flex={1}></Spacer>
                    <Button flex={1} maxW={500} onClick={onOpen1}>Edit Information</Button>
                    <Spacer flex={1}></Spacer>

                    <Modal closeOnOverlayClick={false} isOpen={isOpen1} onClose={onClose1}>
                        <ModalOverlay />
                        <ModalContent minWidth={"900px"} minH={"250px"}>
                            <ModalCloseButton />
                            <ModalBody minWidth={"900px"} pb={6}>
                                <EDIT_ME data={info} />
                            </ModalBody>

                        </ModalContent>
                    </Modal>

                </Flex>
            </Flex>
        </Flex>


    </>);
}

export default memo(StudentInfo);
