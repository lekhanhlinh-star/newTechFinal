import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { useCookies } from "react-cookie";
import { AddIcon } from "@chakra-ui/icons";


const StudentEditTask = (data: any) => {
    const toast = useToast();
    console.log(data)
    const [cookies] = useCookies();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()

    const token = cookies.jwt;
    const [formDataPost, setFormDataPost] = useState<any>(
        {
            phone: data.data.phone || "",
            email: data.data.email || "",
            gender: data.data.gender || ""
        }
    );

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(value)
        setFormDataPost((prevFormDataPost: any) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };

    const handleClick = async () => {
        await axios.patch("http://localhost:5000/api/v1/" + "users/updateMe", formDataPost, {
            headers: {
                'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
            }
        }).then(data => {
            toast({
                title: "Update successful", status: "success", duration: 1000, isClosable: true, position: "top",
                onCloseComplete: () => {
                    window.location.reload();
                }
            });
        }).catch(err => {
            toast({
                title: err.response.data.message, status: "error", duration: 1000, isClosable: true, position: "top",
            });
        })
    }

    return (<>
        <Button
            flex={1}
            rightIcon={<AddIcon />}
            mr={10}
            maxW={40}
            onClick={onOpen1}
        >
            Add Report
        </Button>
        <Modal closeOnOverlayClick={false} isOpen={isOpen1} onClose={onClose1}>
            <ModalOverlay />
            <ModalContent minWidth={"900px"} minH={"250px"}>
                <ModalCloseButton />
                <ModalBody minWidth={"900px"} pb={6}>
                    <Flex justify={"center"}>
                        <Stack direction={['column', 'row']}>
                            <form>
                                <Stack fontFamily={"Oswald"}>
                                    <Heading my={50} textAlign="center" >SUBMIT REPORT</Heading>
                                    <HStack spacing={14} mb={5}>
                                        <FormControl isRequired>
                                            <FormLabel>Phone Number</FormLabel>
                                            <Input type={"number"} defaultValue={data.data?.phone} onChange={handleInputChange} placeholder={"Phone"} name="phone"></Input>
                                        </FormControl>
                                    </HStack>
                                    <HStack spacing={14} mb={5}>

                                        <FormControl isRequired>
                                            <FormLabel>Description</FormLabel>
                                            <Input type={"text"} onChange={handleInputChange} placeholder={"Description"} name="descriptionOfStudent"></Input>
                                        </FormControl>
                                    </HStack>


                                    <HStack spacing={14} mb={5}>
                                        <FormControl isRequired>

                                        </FormControl>
                                    </HStack>
                                    <Button w={"full"} onClick={handleClick}>Update</Button>


                                </Stack>

                            </form>

                        </Stack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>

    </>)

}
export default memo(StudentEditTask);