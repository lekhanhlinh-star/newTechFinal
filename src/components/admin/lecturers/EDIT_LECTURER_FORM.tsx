import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";

interface user_model {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    phone: string,
    gender: string
}

const EDIT_LECTURER_FORM = (data: any) => {
    const toast = useToast();
    console.log(data)
    const [formDataPost, setFormDataPost] = useState<user_model>(
        {
            firstName: data.data.fistName || "",
            lastName: data.data.lastName || "",
            email: data.data.email || "",
            role: "lecturer",
            phone: data.data.phone || "",
            gender: data.data.gender || "Female"
        }
    );



    const handleClick = async () => {
        console.log(formDataPost)
        await AdminAPI.ManageLectures.updateOne(data.data._id, formDataPost).then((data) => {
            console.log(data)
            toast({
                title: "Update successful", status: "success", duration: 9000, isClosable: true, position: "top",
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
        console.log(value)
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));
    };


    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack fontFamily={"Oswald"}>
                        <Heading my={50} textAlign="center" >EDIT LECTURER</Heading>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input type={"text"} defaultValue={data.data.firstName} onChange={handleInputChange} placeholder={"First Name"} name="firstName"></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input type={"text"} defaultValue={data.data.lastName} onChange={handleInputChange} placeholder={"Last Name"} name="lastName"></Input>
                            </FormControl>

                        </HStack>

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
                                <Input type={"number"} defaultValue={data.data.phone} onChange={handleInputChange} placeholder={"Phone"} name="phone"></Input>
                            </FormControl>
                        </HStack>
                        <HStack spacing={14} mb={5}>


                            <FormControl isRequired>

                                <FormLabel>Email Address</FormLabel>
                                <Input type={"email"} defaultValue={data.data.email} onChange={handleInputChange} placeholder={"Last Name"} name="lastName"></Input>
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
export default memo(EDIT_LECTURER_FORM);