import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import AdminAPI from "../../../api/adminAPI";
import DateTimePicker from "react-datetime-picker";

interface major_model {
    timeRegistrationProjectStart: Date;
    timeRegistrationProjectEnd: Date;

}

const EDIT_TIME_FORM = (data: any) => {
    const toast = useToast();
    const [formDataPost, setFormDataPost] = useState<major_model>(
        {
            timeRegistrationProjectStart: new Date(data.data.timeRegistrationProjectStart) || new Date(),
            timeRegistrationProjectEnd: new Date(data.data.timeRegistrationProjectEnd) || new Date(),
        }
    );

    const handleClick = async () => {
        console.log(formDataPost)
        await AdminAPI.ManageMajor.updateOne(data.data._id, formDataPost).then(async (data) => {
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

                                {/* <Input size={"lg"} type={"text"} defaultValue={data.data.name} onChange={handleInputChange} placeholder={"Name"} name="name"></Input> */}


                            </FormControl>


                        </HStack>

                        <HStack spacing={14} mb={5}>
                            <FormControl isRequired>
                                <FormLabel size={"lg"}>Description</FormLabel>
                                {/* <Input size={"lg"} type={"text"} defaultValue={data.data.description} onChange={handleInputChange} placeholder={"Description"} name="description"></Input> */}

                                <DateTimePicker value={formDataPost.timeRegistrationProjectEnd}></DateTimePicker>
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
export default memo(EDIT_TIME_FORM);