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

}

interface classinterface {
    _id: string,
    name: string,
    start_year: number,
    lecture: string | null,
}

const ADD_LECTURER_FORM = () => {
    const toast = useToast();
    const [classarr, setclassarr] = useState<classinterface[]>([])
    const [formDataPost, setFormDataPost] = useState<user_model>(
        {
            firstName: "",
            lastName: "",
            email: "",
            role: "lecturer"
        }
    );

    const handleClick = async () => {
        console.log(formDataPost)
        await AdminAPI.ManageStudent.createOne(formDataPost).then((data) => {
            console.log(data)
            toast({
                title: "Create successful", status: "success", duration: 9000, isClosable: true, position: "top",
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

    const years = Array.from({ length: 50 }, (_, index) => 2023 - index);

    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack spacing={"20px"} fontFamily={"Oswald"}>
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
                                <FormLabel>Email Address</FormLabel>
                                <Input type={"email"} onChange={handleInputChange} placeholder={"email"} name="email"></Input>
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