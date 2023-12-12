import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Spacer,
    Stack,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import AdminSidebarComponent from "../../components/admin/adminSidebarComponent";
import Add_Student_FORM from "../../components/admin/students/ADD_STUDENT_FORM";
import { STUDENT_TABLE } from "../../components/admin/students/STUDENT_TABLE";
import { ArrowLeftIcon, ArrowRightIcon, PhoneIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import AdminAPI from "../../api/adminAPI";

import { BeatLoader } from "react-spinners";

interface StudentInfo {
    name: string,
    email: string,
    class: string,
    student_id: string
    gender: string
}

export function AdminStudentsPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (<>
        <Flex>

            < AdminSidebarComponent></AdminSidebarComponent>
            <Stack flex={2} ml={20} mt={20} direction={"column"}>
                <Button bg={"#2671B1"} color={"white"} h={"41px"} maxW={"235px"} onClick={onOpen}>Add
                    students</Button>
                <Input minW={"777px"} h={"49px"} borderRadius={"8px"} bg={"#E0E0E0"} color={"gray.200"}
                    placeholder={"Search for a student by name or email"}></Input>

                <STUDENT_TABLE></STUDENT_TABLE>

            </Stack>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth={"900px"} minH={"600px"}>
                    {/*<ModalHeader>Create your account</ModalHeader>*/}
                    <ModalCloseButton />
                    <ModalBody minWidth={"900px"} pb={6}>

                        <Add_Student_FORM></Add_Student_FORM>


                    </ModalBody>

                </ModalContent>
            </Modal>

        </Flex>
    </>);
}