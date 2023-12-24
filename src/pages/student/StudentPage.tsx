import { Container, Flex } from "@chakra-ui/react";
import StudentSlidebar from "../../components/student/StudentSlidebar";


export function StudentPage() {
    return (<>
        <Flex letterSpacing={2}>
            < StudentSlidebar></StudentSlidebar>
            <Container>

            </Container>
        </Flex>
    </>);
}