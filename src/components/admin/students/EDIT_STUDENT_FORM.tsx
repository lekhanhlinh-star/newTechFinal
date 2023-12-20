import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";

interface user_model {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    birthday: Date,
    role: string,
    class: string,
    schoolYear: string
}

const EDIT_STUDENT_FORM = (data: any) => {
    console.log(data.data.class)
    const toast = useToast();
    const [classarr, setclassarr] = useState<any[]>([])
    const [majorarr, setmajorarr] = useState<any[]>([])
    let formattedDate = "2023-12-12"
    if (data.data.birthday) {

        const date = new Date(data.data.birthday);
        const formattedDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }




    console.log(data.data.birthday)

    useEffect(() => {
        const fetch_data = async () => {
            await apiService.getAll("classes").then(data => {
                // console.log(data.data)
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
                // console.log(data.data)
                setmajorarr(data.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetch_data()
    }, [])


    const [formDataPost, setFormDataPost] = useState<user_model>(
        {
            firstName: data.data.firstName || "",
            lastName: data.data.lastName || "",
            email: data.data.email || "",
            gender: data.data.gender || "Female",
            birthday: new Date() || "",
            role: "student" || "",
            class: data.data.class?._id || majorarr[0]._id,
            schoolYear: data.data.schoolYear || "",
        }
    );



    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        console.log(name, value)
        setFormDataPost((prevFormDataPost) => ({
            ...prevFormDataPost, [name]: value,
        }));

    };

    const handleClick = async () => {
        // console.log(formDataPost)
        console.log(formDataPost)
        await AdminAPI.ManageStudent.updateOne(data.data._id, formDataPost).then((data) => {
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


    const years = Array.from({ length: 50 }, (_, index) => 2023 - index);


    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>
                <form>

                    <Stack spacing={"20px"} fontFamily={"Oswald"}>
                        <Heading my={50} textAlign="center" >Edit Student Informations</Heading>

                        <HStack spacing={14} mb={5}>

                            <FormControl isRequired>
                                <FormLabel>First Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"First Name"} name="firstName" defaultValue={data.data.firstName}></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Last Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Last Name"} name="lastName" defaultValue={data.data.lastName}></Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Class</FormLabel>
                                {
                                    classarr.length !== 0 ? (
                                        <Select onChange={handleInputChange} name="class" defaultValue={data.data.class?.name}>
                                            {
                                                classarr.map(x =>
                                                    <option value={`${x._id}`} >{x.name}</option>
                                                )
                                            }

                                        </Select>) : null
                                    // <Input type={"text"} onChange={handleInputChange} placeholder={"class"} name="class"></Input>
                                }
                            </FormControl>

                        </HStack>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>
                                <Select defaultValue={data.gender} onChange={handleInputChange} name="gender">
                                    <option value='Female' >Female</option>
                                    <option value='Male'>Male</option>
                                </Select>
                            </FormControl>



                            <FormControl isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input type={"email"} onChange={handleInputChange} defaultValue={data.data.email} placeholder={"email"} name="email"></Input>
                            </FormControl>



                        </HStack>
                        <HStack spacing={14} mb={5}>

                            <FormControl isRequired>
                                <FormLabel>School Year</FormLabel>
                                <Select placeholder="Select a year" defaultValue={data.data.schoolYear} onChange={handleInputChange} name="schoolYear">
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Birth day</FormLabel>
                                <Input type={"date"} onChange={handleInputChange} name="birthday" defaultValue={formattedDate} placeholder={"Birthday"}></Input>
                            </FormControl>


                        </HStack>
                        <Button w={"full"} onClick={handleClick}>Update</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>
    </>)

}
export default memo(EDIT_STUDENT_FORM);