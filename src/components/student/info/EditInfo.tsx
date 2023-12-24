import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { useCookies } from "react-cookie";


const EDIT_ME = (data: any) => {
    const toast = useToast();
    console.log(data)
    const [cookies] = useCookies();

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
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack fontFamily={"Oswald"}>
                        <Heading my={50} textAlign="center" >EDIT INFO</Heading>
                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>
                                <Select defaultValue={data.data.gender || "Female"} onChange={handleInputChange} name="gender">
                                    <option value='Female' >Female</option>
                                    <option value='Male'>Male</option>
                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type={"number"} defaultValue={data.data?.phone} onChange={handleInputChange} placeholder={"Phone"} name="phone"></Input>
                            </FormControl>
                        </HStack>
                        <HStack spacing={14} mb={5}>

                            <FormControl isRequired>
                                <FormLabel>Address</FormLabel>
                                <Input type={"text"} defaultValue={data.data?.address} onChange={handleInputChange} placeholder={"Address"} name="address"></Input>
                            </FormControl>
                        </HStack>

                        <HStack spacing={14} mb={5}>
                        </HStack>

                        <Button w={"full"} onClick={handleClick}>Update</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>
    </>)

}
export default memo(EDIT_ME);