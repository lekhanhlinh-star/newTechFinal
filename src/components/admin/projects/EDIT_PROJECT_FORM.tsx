import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { useCookies } from "react-cookie";

interface project_model {
    name: string,
    description: string,
    schoolYear: string,
    major: string,
}

interface major_model {
    _id: string,
    name: string
}

const EDIT_PROJECT_FORM = (data: any) => {
    const [cookies] = useCookies();
    const token = cookies.jwt;
    const toast = useToast();
    const [formDataPost, setFormDataPost] = useState<project_model>(
        {
            name: data.data.name || "",
            description: data.data.description || "",
            schoolYear: data.data.schoolYear || "",
            major: data.data.major._id || "",
        }
    );

    const [listmajor, setlistmajor] = useState<major_model[]>();

    const handleClick = async () => {
        console.log(formDataPost)
        await axios.patch("http://localhost:5000/api/v1/projects/" + data.data._id, formDataPost, {
            headers: {
                'Content-Type': 'application/json', 'authorization': 'Bearer ' + token
            }
        }).then(async (data) => {
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

    useEffect(() => {
        const fetch_data = async () => {
            await AdminAPI.ManageMajor.getAll({}).then(data => {
                setlistmajor(data.data.data)
                if (!formDataPost.major && data.data.data) {
                    setFormDataPost((prevFormDataPost) => ({
                        ...prevFormDataPost, ["major"]: data.data.data[0]._id,
                    }));
                }
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
                        <Heading my={50} textAlign="center" >Edit Project</Heading>

                        <HStack spacing={14} mb={5}>

                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Name"} name="name" defaultValue={data.data.name}></Input>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Description</FormLabel>
                                <Input type={"text"} onChange={handleInputChange} placeholder={"Description"} name="description" defaultValue={data.data.description}></Input>
                            </FormControl>


                        </HStack>

                        <HStack spacing={14} mb={5}>

                            <FormControl isRequired>
                                <FormLabel>School Year</FormLabel>
                                <Select placeholder="Select a year" onChange={handleInputChange} name="schoolYear" defaultValue={data.data.schoolYear}>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Major</FormLabel>
                                {
                                    listmajor && listmajor.length !== 0 ? (
                                        <Select onChange={handleInputChange} name="major" defaultValue={data.data.major.name}>
                                            {
                                                listmajor.map(x =>
                                                    <option value={`${x._id}`} >{x.name}</option>
                                                )
                                            }

                                        </Select>) :
                                        <Input type={"text"} onChange={handleInputChange} placeholder={"Major"} name="major" defaultValue={data.data.major.name}></Input>

                                }

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
export default memo(EDIT_PROJECT_FORM);