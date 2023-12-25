import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import AdminSidebarComponent from "../../components/admin/adminSidebarComponent";

import ADD_LECTURERS_FORM from "../../components/admin/lecturers/ADD_LECTURER_FORM";
import { LECTURER_TABLE } from '../../components/admin/lecturers/LECTURER_TABLE';


interface StudentInfo {
    name: string,
    email: string,
    class: string,
    student_id: string
    gender: string
}

export function AdminLecturersPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (<>
        <Flex>

            < AdminSidebarComponent></AdminSidebarComponent>
            <Stack flex={2} ml={20} mt={20} direction={"column"}>
                <Button bg={"#2671B1"} color={"white"} h={"41px"} maxW={"235px"} onClick={onOpen}>Add
                    Lecturer</Button>
                <LECTURER_TABLE></LECTURER_TABLE>
            </Stack>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth={"900px"} minH={"600px"}>
                    <ModalCloseButton />
                    <ModalBody minWidth={"900px"} pb={6}>
                        <ADD_LECTURERS_FORM></ADD_LECTURERS_FORM>
                    </ModalBody>

                </ModalContent>
            </Modal>

        </Flex>
    </>);
}