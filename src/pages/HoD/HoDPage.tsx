import { Box, Button, Container, Flex, Input, Stack } from "@chakra-ui/react";
import Sidebar from "../../components/lecturer/Sidebar";
import { ProjectTable } from "../../components/lecturer/project/ProjectTable";
import { STUDENT_TABLE } from "../../components/admin/students/STUDENT_TABLE";
import { Project_FORM } from "../../components/lecturer/project/Project_FORM";
import {PrjectMangementHoD} from "../../components/lecturer/project/ProjectMangementHoD";

export function HoDPage() {
    return (<>
        <Flex>
            <Sidebar></Sidebar>
            <Stack flex={2} ml={20} mt={20} direction={"column"}>

                <Input minW={"777px"} h={"49px"} borderRadius={"8px"} bg={"#E0E0E0"} color={"gray.200"}
                    placeholder={"Search for a project by name"}></Input>


                <PrjectMangementHoD></PrjectMangementHoD>

            </Stack>
            <Box flex={1}>


            </Box>


        </Flex>
    </>);
}