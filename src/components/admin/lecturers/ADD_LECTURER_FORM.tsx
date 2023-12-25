import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { useCookies } from "react-cookie";

interface user_model {
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    phone: string,
    gender: string
}

interface classinterface {
    _id: string,
    name: string,
    start_year: number,
    lecture: string | null,
}

const ADD_LECTURER_FORM = () => {
    const [cookies] = useCookies();
    const token = cookies.jwt;

    const toast = useToast();
    const [classarr, setclassarr] = useState<classinterface[]>([])
    const [formDataPost, setFormDataPost] = useState<user_model>(
        {
            firstName: "",
            lastName: "",
            email: "",
            role: "lecturer",
            phone: "",
            gender: "Female"
        }
    );
    const headers = {
        'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
    }
    const handleClick = async () => {
        console.log(formDataPost)

        await AdminAPI.ManageStudent.createOne(formDataPost, {
            'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
        }).then((data) => {
            console.log(data)
            toast({
                title: "Create successful", status: "success", duration: 1000, isClosable: true, position: "top",
                onCloseComplete: () => {
                    window.location.reload();
                }
            });
        }).catch(err => {
            console.log(err)
            toast({
                title: err.response.data.message, status: "error", duration: 1000, isClosable: true, position: "top",
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

    useEffect(() => {
        const fetch_data = async () => {
            await apiService.getAll("classes").then(data => {
                console.log(data.data)
                setclassarr(data.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetch_data()
    }, [])

    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack fontFamily={"Oswald"}>
                        <Heading my={50} textAlign="center" >Add Lecturer</Heading>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"First Name"} name="firstName"></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Last Name"} name="lastName"></Input>
                            </FormControl>

                        </HStack>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>
                                <Select defaultValue={"Female"} onChange={handleInputChange} name="gender">
                                    <option value='Female' >Female</option>
                                    <option value='Male'>Male</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type={"number"} onChange={handleInputChange} placeholder={"Phone"} name="phone"></Input>
                            </FormControl>
                        </HStack>
                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input type={"email"} onChange={handleInputChange} placeholder={"Email"} name="email"></Input>
                            </FormControl>

                        </HStack>

                        <HStack spacing={14} mb={5}>
                        </HStack>
                        <Button w={"full"} onClick={handleClick}>Add</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>

    </>)

}
export default memo(ADD_LECTURER_FORM);