import {Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Select, Stack} from "@chakra-ui/react";

export function Add_Student_FORM() {
    return (<>
        <Flex justify={"center"}>
            <Stack direction={['column', 'row']}>


                <form>
                    <Stack spacing={"20px"} fontFamily={"Oswald"}>
                        <Heading  textAlign={"left"} my={50}>Add Student</Heading>

                        <HStack spacing={8} >


                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input type={"text"} placeholder={"Student name"}></Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Class</FormLabel>

                                <Select placeholder={"Class"}>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>
                                    <option value='option3'>Option 3</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Gender</FormLabel>

                                <Select placeholder={"Gender"}>
                                    <option value='option1'>Option 1</option>
                                    <option value='option2'>Option 2</option>

                                </Select>
                            </FormControl>


                        </HStack>
                        <HStack spacing={8}>


                            <FormControl isRequired>
                                <FormLabel>Email Address</FormLabel>
                                <Input type={"email"} placeholder={"email"}></Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Phone number</FormLabel>
                                <Input type={"phone"} placeholder={"Phone number"}></Input>
                            </FormControl>


                        </HStack>
                        <HStack spacing={8}>


                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type={"email"} placeholder={"Password"}></Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Birth day</FormLabel>
                                <Input type={"date"} placeholder={"Password"}></Input>
                            </FormControl>


                        </HStack>
                        <Button w={"full"}>Add</Button>


                    </Stack>

                </form>

            </Stack>
        </Flex>

    </>)

}