import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { useCookies } from "react-cookie";

interface major_model {
    name: string;
    description: string;

}

const EDIT_MAJOR_FORM = (data: any) => {
    const toast = useToast();
    const [cookies] = useCookies();
    const token = cookies.jwt;
    const [formDataPost, setFormDataPost] = useState<major_model>(
        {
            name: data.data.name || "",
            description: data.data.description || "",
        }
    );

    const handleClick = async () => {
        console.log(formDataPost)
        await axios.patch("http://127.0.0.1:5000/api/v1/majors/" + data.data._id, formDataPost, {
            headers: {
                'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
            }
        }
        ).then(async (data) => {
            console.log(data)
            toast({
                title: "Update successful",
                status: "success",
                duration: 1000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => window.location.reload()
            });
        }).catch(err => {
            console.log(err)
            toast({
                title: err.response.data.message, status: "error", duration: 9000, isClosable: true, position: "top",
            });
        })
    }

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(name, value)
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };



    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack spacing={"20px"} fontFamily={"Oswald"} minW={500}>
                        <Heading my={50} textAlign="center" >Edit Major</Heading>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel size={"lg"}>Name</FormLabel>
                                <Input size={"lg"} type={"text"} defaultValue={data.data.name} onChange={handleInputChange} placeholder={"Name"} name="name"></Input>
                            </FormControl>


                        </HStack>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel size={"lg"}>Description</FormLabel>
                                <Input size={"lg"} type={"text"} defaultValue={data.data.description} onChange={handleInputChange} placeholder={"Description"} name="description"></Input>
                            </FormControl>
                        </HStack>
                        <HStack spacing={14} mb={5}>
                        </HStack>
                        <Button w={"full"} onClick={handleClick} size={"lg"}>Add</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>

    </>)

}
export default memo(EDIT_MAJOR_FORM);