import { Avatar, Box, Button, Flex, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, EditIcon, ExternalLinkIcon, PhoneIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
import EDIT_LECTURER_FORM from "../lecturers/EDIT_LECTURER_FORM";
import EDIT_PROJECT_FORM from "./EDIT_NOTI_FORM";
import React from "react";
import DELETE_NOTI from "./DELETE_NOTI";
import EDIT_NOTI_FORM from "./EDIT_NOTI_FORM";
// import EDIT_STUDENT_FORM from './EDIT_PROJECT_FORM'
// https://www.figma.com/file/KlFNRecPC4tpKx6RKMIKX5/School-Management-Admin-Dashboard-UI-(Community)?type=design&node-id=293-32589&mode=design&t=PQEmOO8MvaplyP75-0

interface notifications {
    _id: string;
    title: string;
    content: string;
    file: File[];
    createdAt: string;
    updatedAt: string;
}
interface File {
    filename: string;
    _id: string;
}


export function NOTI_TABLE() {
    const [page, setpage] = useState(1)

    const [loading, setLoading] = useState(false);
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure()


    const [notiList, setnotiList] = useState<notifications[]>([])


    useEffect(() => {
        const fetch_noti = async () => {
            await AdminAPI.ManageNoti.getAll({ page: page, limit: 5 }).then(data => {
                setnotiList(data.data.data)
            }).catch(err => {
                console.log(err)
            })
        }
        fetch_noti()
    }, [page])


    const handle_next_page = () => {
        if (notiList.length != 0) {
            setpage(prevState => prevState + 1)
        }

    }
    const handle_previous_page = () => {
        setpage((prevState) => Math.max(1, prevState - 1)); // Make sure page doesn't go below 1
    };


    return (

        <Flex mt={50} overscroll={"scroll"}
            overflowY={"scroll"}
            overflowX={"hidden"}
        >
            <Flex direction={"column"} flex={3} borderRight={"1px solid lightgrey"}>
                <TableContainer fontSize={"xl"}  >
                    <Table variant='simple'>
                        <Thead fontFamily={'Kumbh Sans'} fontStyle={"b"}>
                            <Tr>
                                <Th style={{ minWidth: '50px', fontSize: "25px" }}>Title</Th>
                                <Th style={{ minWidth: '400px', maxWidth: '400px', fontSize: "25px" }}>Content</Th>
                                <Th style={{ minWidth: '100px', fontSize: "25px" }}>File</Th>
                                <Th style={{ minWidth: '100px', fontSize: "25px" }}></Th>
                            </Tr>
                        </Thead>
                        <Tbody >
                            {
                                notiList ? notiList.map((x) =>
                                    <Tr
                                        cursor="pointer"
                                        _hover={{
                                            color: 'white', bg: "#2671B1"
                                        }}>

                                        <Td> {x.title}</Td>
                                        <Td style={{ whiteSpace: 'pre-wrap' }}> {x.content}</Td>
                                        {
                                            x.file[0] ? <Td>
                                                {x.file[0].filename}</Td>
                                                : <Td></Td>
                                        }
                                        <Td>

                                            <Tooltip label="Delete Notification" closeDelay={100}>
                                                <DELETE_NOTI id={x._id}></DELETE_NOTI>
                                            </Tooltip>

                                            <Tooltip label="Edit Notification Informations" closeDelay={100}>
                                                <IconButton aria-label={""} icon={<EditIcon />} mr={5} onClick={onOpen2}></IconButton>
                                            </Tooltip>
                                            <Modal closeOnOverlayClick={false} isOpen={isOpen2} onClose={onClose2}>
                                                <ModalContent minWidth={"900px"} minH={"250px"}>
                                                    <ModalCloseButton />
                                                    <ModalBody minWidth={"900px"} pb={6}>
                                                        <EDIT_NOTI_FORM data={x} />
                                                    </ModalBody>

                                                </ModalContent>
                                            </Modal>
                                            {
                                                x.file[0] && x.file[0].filename ? <Tooltip label="Goto file" closeDelay={100}>
                                                    <a
                                                        href={`${process.env.REACT_APP_GOOGLE_OAUTH_ENDPOINT}/uploads/${x.file[0].filename}`}
                                                        target="_blank"
                                                    >
                                                        <IconButton
                                                            icon={<ExternalLinkIcon />}
                                                            mr={5}
                                                            onClick={() => { }} aria-label={""} />
                                                    </a>
                                                </Tooltip>
                                                    : null
                                            }
                                        </Td>
                                    </Tr>
                                ) : null
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                <Spacer>

                </Spacer>

                {notiList.length == 0 ? <Box>
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



