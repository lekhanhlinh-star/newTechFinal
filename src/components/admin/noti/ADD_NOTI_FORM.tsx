import { Button, Text, Center, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";

interface noti_model_post {
    title: string,
    content: string | null,
    file: File | null,
}


const ADD_NOTI_FORM = () => {
    const toast = useToast();
    const [currentfile, setcurrentfile] = useState<string>("")
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [canclear, setcanclear] = useState(false)
    const handleClickSelectFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const [formDataPost, setFormDataPost] = useState<noti_model_post>({
        title: "", content: "", file: null,
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(name, value)
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];
        let { name, value } = event.target;
        name = "file";
        console.log("name", name);
        console.log("File changed", value);
        if (selectedFile) {
            setcurrentfile(selectedFile?.name)
            setFormDataPost((prevFormDataPost) => ({
                ...prevFormDataPost, [name]: selectedFile,
            }));
            setcanclear(true)
        }
    };

    const Clearfile = () => {
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, ["file"]: null,
        }));
        setcurrentfile("")
        setcanclear(false)
    }

    const handleSubmit = async () => {
        try {
            console.log(formDataPost)
            await axios.post("http://localhost:5000/api/v1/notifications", formDataPost, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(response => {
                console.log(response.data);
                toast({
                    title: "Create new post successful", status: "success", duration: 1000, isClosable: true, position: "top",
                    onCloseComplete: () => {
                        window.location.reload();
                    }
                });

            }).catch(error => {
                toast({
                    title: error.response.data.message, status: "error", duration: 9000, isClosable: true, position: "top",
                });

            });
        } catch (e) {
            console.log(e);
        }

    };
    console.log(formDataPost)

    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack spacing={"20px"} fontFamily={"Oswald"} minW={500}>
                        <Heading my={50} textAlign="center" >Add Notifications</Heading>

                        <HStack spacing={14} mb={5}>

                            <FormControl isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Title"} name="title"></Input>
                            </FormControl>

                        </HStack>

                        <HStack>
                            <FormControl isRequired>
                                <FormLabel>Content</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Content"} name="content"></Input>
                            </FormControl>
                        </HStack>

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
                        </HStack>
                        <Button w={"full"} fontSize={"large"} onClick={handleSubmit}>Add</Button>


                    </Stack>

                </form>

            </Stack >
        </Flex >

    </>)

}
export default memo(ADD_NOTI_FORM);