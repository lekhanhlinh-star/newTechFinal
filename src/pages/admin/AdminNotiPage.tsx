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
import ADD_NOTI_FORM from "../../components/admin/noti/ADD_NOTI_FORM";
import { NOTI_TABLE } from "../../components/admin/noti/NOTI_TABLE";


interface StudentInfo {
    name: string,
    email: string,
    class: string,
    student_id: string
    gender: string
}

export function AdminNotificationrPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (<>
        <Flex>

            < AdminSidebarComponent></AdminSidebarComponent>
            <Stack flex={2} ml={20} mt={20} direction={"column"}>
                <Button bg={"#2671B1"} color={"white"} h={"41px"} maxW={"235px"} onClick={onOpen}>Add
                    Notificationr</Button>
                <Input minW={"777px"} h={"49px"} borderRadius={"8px"} bg={"#E0E0E0"} color={"gray.200"}
                    placeholder={"Search for a student by name or email"}></Input>

                <NOTI_TABLE></NOTI_TABLE>
            </Stack>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth={"900px"} minH={"600px"}>
                    <ModalCloseButton />
                    <ModalBody minWidth={"900px"} pb={6}>
                        <ADD_NOTI_FORM></ADD_NOTI_FORM>
                    </ModalBody>

                </ModalContent>
            </Modal>

        </Flex>
    </>);
}