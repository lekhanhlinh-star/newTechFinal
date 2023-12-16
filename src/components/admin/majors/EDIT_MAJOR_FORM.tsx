import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { memo, useEffect, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";



const EDIT_MAJOR_FORM = (data: any) => {
    const toast = useToast();
    console.log(data)
    const [mail, setmail] = useState("")

    const handleUserKeyPress = (event: any) => {
        const { key } = event
        if (key === "Enter") {
            AdminAPI.ManageStudent.updateOne(data.data._id, {
                email: mail
            }).then(async data => {
                console.log(data)
                await toast({
                    title: "Edit successful", status: "success", duration: 9000, isClosable: true, position: "top",
                });
                window.location.reload();

            }).catch(err => {
                console.log(err)
                toast({
                    title: err.response.data.message, status: "error", duration: 9000, isClosable: true, position: "top",
                });
            })
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress)

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress)
        }
    })

    const handleInputChange = (event: any) => {
        const { value } = event.target;
        console.log(value)

        setmail(value)
        console.log(mail)
    };


    return (<>
        <Flex direction={"column"}>
            <Heading my={50} textAlign="center" >Edit gmail</Heading>
            <Input onChange={handleInputChange} borderRadius={30} minH={20} fontSize={25} textAlign={"center"} defaultValue={data.email}></Input>
        </Flex>

    </>)

}
export default memo(EDIT_MAJOR_FORM);