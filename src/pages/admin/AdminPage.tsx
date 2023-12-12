import {Container, Flex} from "@chakra-ui/react";
import AdminSidebarComponent from "../../components/admin/adminSidebarComponent";
import {STUDENT_TABLE} from "../../components/admin/students/STUDENT_TABLE";


export function AdminPage() {
    return (<>
            <Flex letterSpacing={2}>
                < AdminSidebarComponent></AdminSidebarComponent>
                <Container>

                </Container>
            </Flex>
        </>);
}