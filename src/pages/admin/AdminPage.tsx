import {Flex} from "@chakra-ui/react";
import AdminSidebarComponent from "../../components/admin/adminSidebarComponent";

export function AdminPage() {
    return (
        <>
            <Flex letterSpacing={2}>
                < AdminSidebarComponent></AdminSidebarComponent>

            </Flex>
        </>
    );
}