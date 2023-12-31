import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { useCookies } from "react-cookie";

interface user_model {
    mssv: string;
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    major: string,
    birthday: Date,
    role: string,
    class: string,
    schoolYear: string
    phone: string
}

interface classinterface {
    _id: string,
    name: string,
    start_year: number,
    lecture: string | null,
}

const ADD_STUDENT_FORM = () => {
    const toast = useToast();
    const [classarr, setclassarr] = useState<classinterface[]>([])
    const [majorarr, setmajorarr] = useState<any[]>([])
    const [cookies] = useCookies();
    const token = cookies.jwt;

    const [formDataPost, setFormDataPost] = useState<user_model>(
        {
            mssv: "",
            firstName: "",
            lastName: "",
            email: "",
            gender: "Female",
            phone: "",
            // password: "",
            major: "",
            birthday: new Date(),
            role: "student",
            class: "",
            schoolYear: ""
        }
    );

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


    useEffect(() => {
        const fetch_data = async () => {
            await apiService.getAll("majors").then(data => {
                console.log(data.data)
                setmajorarr(data.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetch_data()
    }, [])


    const years = Array.from({ length: 10 }, (_, index) => 2023 - index);

    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack spacing={"20px"} fontFamily={"Oswald"}>
                        <Heading my={50} textAlign="center" >Add Student</Heading>

                        <HStack spacing={14} mb={5}>

                            <FormControl isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"First Name"} name="firstName"></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Last Name"} name="lastName"></Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Class</FormLabel>
                                {
                                    classarr.length !== 0 ? (<Select onChange={handleInputChange} placeholder={"class"} name="class">
                                        {
                                            classarr.map(x =>
                                                <option value={`${x._id}`} >{x.name}</option>
                                            )
                                        }

                                    </Select>) :
                                        <Input type={"text"} onChange={handleInputChange} placeholder={"class"} name="class"></Input>

                                }

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
                                <FormLabel>Email Address</FormLabel>
                                <Input type={"email"} onChange={handleInputChange} placeholder={"email"} name="email"></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>School Year</FormLabel>
                                <Select placeholder="Select a year" onChange={handleInputChange} name="schoolYear">
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>


                        </HStack>
                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel>Phone</FormLabel>
                                <Input type={"number"} onChange={handleInputChange} placeholder={"phone"} name="phone"></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Birth day</FormLabel>
                                <Input type={"date"} onChange={handleInputChange} name="birthday" placeholder={"Birthday"}></Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Major</FormLabel>
                                {
                                    majorarr.length !== 0 ? (<Select onChange={handleInputChange} name="major" placeholder={"major"}>
                                        {
                                            majorarr.map(x =>
                                                <option value={`${x._id}`} >{x.name}</option>
                                            )
                                        }

                                    </Select>) :
                                        <Input type={"text"} onChange={handleInputChange} placeholder={"major"} name="major"></Input>

                                }
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