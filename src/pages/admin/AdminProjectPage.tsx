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
import { PROJECT_TABLE } from "../../components/admin/projects/PROJECT_TABLE";
import ADD_PROJECT_FORM from "../../components/admin/projects/ADD_PROJECT_FORM";




interface StudentInfo {
    name: string,
    email: string,
    class: string,
    student_id: string
    gender: string
}

export function AdminProjectsPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (<>
        <Flex>

            < AdminSidebarComponent></AdminSidebarComponent>
            <Stack flex={2} ml={20} mt={20} direction={"column"}>
                <Button bg={"#2671B1"} color={"white"} h={"41px"} maxW={"235px"} onClick={onOpen}>Add Project</Button>
                <Input minW={"777px"} h={"49px"} borderRadius={"8px"} bg={"#E0E0E0"} color={"gray.200"}
                    placeholder={"Search for a student by name or email"}></Input>

                <PROJECT_TABLE></PROJECT_TABLE>
            </Stack>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minWidth={"900px"} minH={"600px"}>
                    <ModalCloseButton />
                    <ModalBody minWidth={"900px"} pb={6}>
                        <ADD_PROJECT_FORM></ADD_PROJECT_FORM>
                    </ModalBody>

                </ModalContent>
            </Modal>

        </Flex>
    </>);
}