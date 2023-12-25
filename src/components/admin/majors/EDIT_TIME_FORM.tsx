import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import AdminAPI from "../../../api/adminAPI";
import DateTimePicker from "react-datetime-picker";
import { useCookies } from "react-cookie";

interface major_model {
    timeRegistrationProjectStart: string;
    timeRegistrationProjectEnd: string;

}

const EDIT_TIME_FORM = (data: any) => {
    const toast = useToast();
    const [cookies] = useCookies();
    const token = cookies.jwt;
    const [formDataPost, setFormDataPost] = useState<major_model>(
        {
            timeRegistrationProjectStart: "",
            timeRegistrationProjectEnd: "",
        }
    );

    useEffect(() => {
        const datetostring = async () => {
            var originalDate = new Date(data.data.timeRegistrationProjectStart);
            var convertedDate = originalDate.toLocaleString("sv-SE", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
            var originalDate2 = new Date(data.data.timeRegistrationProjectEnd);
            var convertedDate2 = originalDate2.toLocaleString("sv-SE", {
                timeZone: "UTC",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
            });
            setFormDataPost({
                timeRegistrationProjectStart: convertedDate,
                timeRegistrationProjectEnd: convertedDate2
            })
        }
        datetostring()
    }, []
    )

    const handleClick = async () => {
        console.log(formDataPost)
        const dataupdate = stringtodate()
        console.log(dataupdate)
        await axios.patch("http://127.0.0.1:5000/api/v1/majors/" + data.data._id, dataupdate, {
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

    function stringtodate() {
        const datestart = new Date(formDataPost.timeRegistrationProjectStart);
        const dateend = new Date(formDataPost.timeRegistrationProjectEnd);
        return {
            timeRegistrationProjectStart: datestart,
            timeRegistrationProjectEnd: dateend,
        }

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
                        <Heading my={50} textAlign="center" >Edit Time Registation</Heading>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel size={"lg"}>Start Time Registation</FormLabel>
                                <Input
                                    placeholder="Select Date and Time"
                                    name="timeRegistrationProjectStart"
                                    size="md"
                                    type="datetime-local"
                                    value={formDataPost.timeRegistrationProjectStart}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </HStack>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel size={"lg"}>End Time Registation</FormLabel>
                                <Input
                                    placeholder="Select Date and Time"
                                    name="timeRegistrationProjectEnd"
                                    size="md"
                                    type="datetime-local"
                                    value={formDataPost.timeRegistrationProjectEnd}
                                    onChange={handleInputChange}

                                />
                            </FormControl>

                        </HStack>
                        <HStack spacing={14} mb={5}>
                        </HStack>
                        <Button w={"full"} onClick={handleClick} size={"lg"}>Update</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>

    </>)

}
export default memo(EDIT_TIME_FORM);