import { Button, Text, Flex, FormControl, FormLabel, Heading, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Select, Spacer, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { useCookies } from "react-cookie";
import { AddIcon, LinkIcon } from "@chakra-ui/icons";
interface noti_model_post {
    descriptionOfStudent: string | null,
    report: File | null,
    status: string,
}

const StudentEditTask = (data: any) => {
    const toast = useToast();
    console.log(data)
    const [cookies] = useCookies();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
    const [canclear, setcanclear] = useState(false)
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [currentfile, setcurrentfile] = useState<string>("")

    const token = cookies.jwt;

    const [formDataPost, setFormDataPost] = useState<noti_model_post>({
        descriptionOfStudent: "", report: null, status: "done"
    });


    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(value)
        setFormDataPost((prevFormDataPost: any) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };

    const handlesubmit = async () => {
        console.log(formDataPost)
        await axios.patch(`http://localhost:5000/api/v1/tasks/${data.data._id}/taskByStudent`, formDataPost, {
            headers: {
                'Content-Type': 'multipart/form-data', 'authorization': 'Bearer ' + token
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        let { name, value } = event.target;
        name = "report";
        console.log("name", name);
        console.log("File changed", value);
        if (selectedFile) {
            setcurrentfile(selectedFile?.name)
            setFormDataPost((prevFormDataPost: any) => ({
                ...prevFormDataPost, [name]: selectedFile,
            }));
            setcanclear(true)
        }
    };


    const Clearfile = () => {
        setFormDataPost((prevFormDataPost: any) => ({
            ...prevFormDataPost, ["report"]: null,
        }));
        setcurrentfile("")
        setcanclear(false)
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
                                    <HStack spacing={14} mb={5} >
                                        <FormControl isRequired>
                                            <Flex mt={3}>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                    onChange={handleFileChange}
                                                />
                                                <Button onClick={handleClickSelectFile}>
                                                    File
                                                </Button>
                                                <Text fontSize={"large"} mt={2} align={"center"} justifyItems={"center"} ml={10}>{currentfile}</Text>

                                            </Flex>
                                            {
                                                canclear ? <Button onClick={Clearfile} ml={"auto"} mt={10}>
                                                    Clear Selected File
                                                </Button> : null
                                            }
                                        </FormControl>

                                    </HStack>

                                    <HStack spacing={14} mb={5}>

                                        <FormControl isRequired>
                                            <FormLabel>Description</FormLabel>
                                            <Input type={"text"} onChange={handleInputChange} placeholder={"Description"} name="descriptionOfStudent"></Input>
                                        </FormControl>
                                    </HStack>



                                    <Button w={"full"} onClick={handlesubmit}>Update</Button>


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