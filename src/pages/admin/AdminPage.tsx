import {Container, Flex} from "@chakra-ui/react";
import AdminSidebarComponent from "../../components/admin/adminSidebarComponent";
import {Student_Table} from "../../components/admin/students/Student_Table";
import {Add_Student_FORM} from "../../components/admin/students/Add_Student_FORM";

export function AdminPage() {
    return (
        <>
            <Flex letterSpacing={2}>
                < AdminSidebarComponent></AdminSidebarComponent>
                <Container>
                    <Add_Student_FORM></Add_Student_FORM>
                </Container>
            </Flex>
        </>
    );
}