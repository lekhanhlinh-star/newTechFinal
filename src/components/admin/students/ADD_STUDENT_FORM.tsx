import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";

interface user_model {
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    gender: string | null,
    phone: string | null,
    password: string | null,
    birthday: Date | null,
    role: string,
    class: string | null
}

interface classinterface {
    _id: string,
    name: string,
    start_year: number,
    lecture: string | null,
}

const ADD_STUDENT_FORM = () => {
    const [classarr, setclassarr] = useState<classinterface[]>([])

    const [formDataPost, setFormDataPost] = useState<user_model>(
        {
            firstName: "",
            lastName: "",
            email: "",
            gender: "Female",
            phone: "",
            password: "",
            birthday: new Date(),
            role: "student",
            class: ""
        }
    );

    const handleClick = async () => {
        console.log(formDataPost)
        await AdminAPI.ManageStudent.createOne(formDataPost).then((data) => {
            console.log(data)
        }).catch(err => {
            console.log(err)
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
                setclassarr(data.data)
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

                    <Stack spacing={"20px"} fontFamily={"Oswald"}>
                        <Heading my={50} textAlign="center" >Add Student</Heading>

                        <HStack spacing={8}>

                            <FormControl isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"First Name"} name="firstName"></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Last Name"} name="lastName"></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input type={"email"} onChange={handleInputChange} placeholder={"email"} name="email"></Input>
                            </FormControl>
                        </HStack>

                        <HStack spacing={8}>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>
                                <Select defaultValue={"Female"} onChange={handleInputChange} name="gender">
                                    <option value='Female' >Female</option>
                                    <option value='Male'>Male</option>
                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Class</FormLabel>
                                <Select onChange={handleInputChange} name="class">
                                    {
                                        classarr.map(x =>
                                            <option value={`${x._id}`} >{x.name}</option>
                                        )
                                    }

                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Phone number</FormLabel>
                                <Input type={"phone"} onChange={handleInputChange} name="phone" placeholder={"Phone number"}></Input>
                            </FormControl>


                        </HStack>
                        <HStack spacing={8}>


                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type={"password"} onChange={handleInputChange} name="password" placeholder={"Password"}></Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Birth day</FormLabel>
                                <Input type={"date"} onChange={handleInputChange} name="birthday" placeholder={"Password"}></Input>
                            </FormControl>


                        </HStack>
                        <Button w={"full"} onClick={handleClick}>Add</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>

    </>)

}
export default memo(ADD_STUDENT_FORM);