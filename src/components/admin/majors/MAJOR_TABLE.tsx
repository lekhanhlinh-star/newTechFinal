import { Avatar, Box, Flex, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Spacer, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import AdminAPI from "../../../api/adminAPI";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, EditIcon, PhoneIcon, TimeIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
import EDIT_MAJOR_FORM from "./EDIT_MAJOR_FORM";
import EDIT_TIME_FORM from "./EDIT_TIME_FORM";
// https://www.figma.com/file/KlFNRecPC4tpKx6RKMIKX5/School-Management-Admin-Dashboard-UI-(Community)?type=design&node-id=293-32589&mode=design&t=PQEmOO8MvaplyP75-0

interface majortinterface {
    _id: string;
    name: string;
    description: string;
    timeRegistrationProjectStart: string;
    timeRegistrationProjectEnd: string;
    createdAt: string;
    updatedAt: string;
}

export function MAJOR_TABLE() {
    const [major, setmajor] = useState<majortinterface[]>([])
    const [page, setpage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [currentmajor, Setcurrentmajor] = useState<majortinterface>()
    const toast = useToast();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()




    useEffect(() => {
        const fetch_data = async () => {
            setLoading(true)
            await AdminAPI.ManageMajor.getAll({ page: page, limit: 5 }).then((data) => {
                console.log(data.data.data)
                setmajor(data.data.data)
                // }
            })
                .catch(err => {
                    console.log(err)
                })
            setLoading(false)
        }
        fetch_data()
    }, [page]
    )


    useEffect(() => {
        if (major) {
            Setcurrentmajor(major[0])
        }
    }, [major])

    const handle_next_page = () => {
        if (major.length != 0) {
            setpage(prevState => prevState + 1)
        }

    }
    const handle_previous_page = () => {
        setpage((prevState) => Math.max(1, prevState - 1)); // Make sure page doesn't go below 1
    };

    const handleprofile = async (id: string) => {
        const found = major.find((element) => element._id == id)
        console.log(found)
        if (found) {
            Setcurrentmajor(found)
        }
    }

    const handledelete = async (id: string) => {
        await AdminAPI.ManageMajor.deleteOne(id).then(data => {
            console.log(data)
            toast({
                title: "Delete successful", status: "success", duration: 9000, isClosable: true, position: "top",
            });
            const found = major.find((element) => element._id == id)
            if (found) {
                setmajor(major.filter(item => item !== found));
            }
        }
        ).catch(err => {
            console.log(err)
            toast({
                title: err, status: "error", duration: 1000, isClosable: true, position: "top",
            });
        })
    }

    return (

        <Flex mt={50} overscroll={"scroll"}
            overflowY={"scroll"}
            overflowX={"hidden"}
        >
            <Flex direction={"column"} flex={3} borderRight={"1px solid lightgrey"}>
                <TableContainer >
                    <Table variant='simple'>
                        <Thead fontFamily={'Kumbh Sans'} fontStyle={"b"}>
                            <Tr>
                                <Th style={{ fontSize: '25px' }}>Name</Th>
                                <Th style={{ fontSize: '25px' }}>Description</Th>
                                <Th style={{ fontSize: '25px' }}>Create Time</Th>

                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                major ? major.map((x) =>
                                    <Tr
                                        cursor="pointer"
                                        onClick={() => handleprofile(x._id)}
                                        _hover={{
                                            color: 'white', bg: "#2671B1"
                                        }}>

                                        <Td>
                                            {x.name}
                                        </Td>
                                        <Td>
                                            {x.description}
                                        </Td>
                                        <Td>
                                            {x.createdAt}
                                        </Td>
                                        <Td>
                                            <Tooltip label="Delete Major">
                                                <IconButton aria-label={""} icon={<DeleteIcon />} size={"md"} mr={5} onClick={() => { handledelete(x._id) }}></IconButton>
                                            </Tooltip>
                                            <Tooltip label="Edit Major Informations">
                                                <IconButton aria-label={""} icon={<EditIcon />} mr={5} onClick={onOpen1}></IconButton>
                                            </Tooltip>
                                            <Modal closeOnOverlayClick={false} isOpen={isOpen1} onClose={onClose1}>
                                                <ModalOverlay />
                                                <ModalContent minWidth={"900px"} minH={"250px"}>
                                                    <ModalCloseButton />
                                                    <ModalBody minWidth={"900px"} pb={6}>
                                                        <EDIT_MAJOR_FORM data={x} />
                                                    </ModalBody>

                                                </ModalContent>
                                            </Modal>

                                            <Tooltip label="Edit Major Date Register">
                                                <IconButton aria-label={""} onClick={onOpen2} icon={<TimeIcon />} mr={5} ></IconButton>
                                            </Tooltip>
                                            <Modal closeOnOverlayClick={false} isOpen={isOpen2} onClose={onClose2}>
                                                <ModalOverlay />
                                                <ModalContent minWidth={"900px"} minH={"250px"}>
                                                    <ModalCloseButton />
                                                    <ModalBody minWidth={"900px"} pb={6}>
                                                        <EDIT_TIME_FORM data={x} />
                                                    </ModalBody>

                                                </ModalContent>
                                            </Modal>
                                        </Td>
                                    </Tr>
                                ) : null
                            }




                        </Tbody>
                    </Table>
                </TableContainer>
                <Spacer>

                </Spacer>

                {major.length == 0 ? <Box>
                    <Text fontSize={50} color={"red"}>There are no records</Text>
                </Box> : null}
                <Spacer>

                </Spacer>

                <Flex mx={5} >

                    <IconButton isLoading={loading} onClick={handle_previous_page} spinner={<BeatLoader size={8} color='black' />} variant={"ghost"} aria-label={"ArrowLeft"}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </IconButton>


                    <Spacer>

                    </Spacer>

                    <IconButton isLoading={loading} variant={"ghost"} onClick={handle_next_page}
                        aria-label={"ArrowRight"} spinner={<BeatLoader size={8} color='black' />}>
                        <ArrowRightIcon></ArrowRightIcon>
                    </IconButton>
                </Flex>
            </Flex>



        </Flex >);
}



