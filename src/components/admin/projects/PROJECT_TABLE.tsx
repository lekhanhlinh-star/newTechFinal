import { Avatar, Box, Button, Flex, Heading, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../../api/AxiosClient";
import AdminAPI from "../../../api/adminAPI";
import { ArrowLeftIcon, ArrowRightIcon, DeleteIcon, EditIcon, PhoneIcon } from "@chakra-ui/icons";
import { BeatLoader } from "react-spinners";
import EDIT_LECTURER_FORM from "../lecturers/EDIT_LECTURER_FORM";
import EDIT_PROJECT_FORM from "./EDIT_PROJECT_FORM";
import React from "react";
// import EDIT_STUDENT_FORM from './EDIT_PROJECT_FORM'
// https://www.figma.com/file/KlFNRecPC4tpKx6RKMIKX5/School-Management-Admin-Dashboard-UI-(Community)?type=design&node-id=293-32589&mode=design&t=PQEmOO8MvaplyP75-0

interface projectInterface {
    status: string;
    review: string;
    score: number;
    _id: string;
    name: string;
    description: string;
    schoolYear: string;
    major: {
        _id: string;
        name: string;
        description: string;
    };
    report: any[];
    lecturer: string | null;

    createdAt: string;
    updatedAt: string;
}


export function PROJECT_TABLE() {
    const [projectList, setprojectList] = useState<projectInterface[]>([])
    const [page, setpage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [currentproject, Setcurrentproject] = useState<projectInterface>()
    const toast = useToast();

    const [liststudent, setliststudent] = useState<any[]>([])
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure()


    useEffect(() => {
        const fetch_data = async () => {
            setLoading(true)
            await AdminAPI.ManageProject.getAll({ page: page, limit: 5 }).then((data) => {
                console.log(data.data.data)
                setprojectList(data.data.data)
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
        if (projectList) {
            Setcurrentproject(projectList[0])
        }
    }, [projectList])

    const handle_next_page = () => {
        if (projectList.length != 0) {
            setpage(prevState => prevState + 1)
        }

    }
    const handle_previous_page = () => {
        setpage((prevState) => Math.max(1, prevState - 1)); // Make sure page doesn't go below 1
    };

    const handleproject = async (id: string | undefined) => {
        const found = projectList.find((element) => element._id == id)
        console.log(found)
        if (found) {
            Setcurrentproject(found)
        }
        await AdminAPI.ManageStudent.getAll({ project: id }).then(data => {
            console.log(data.data.data)
            console.log(currentproject)
            setliststudent(data.data.data)
        }).catch(err => {
            console.log(err)
        })

    }

    const handledelete = async (id: any) => {
        await AdminAPI.ManageProject.deleteOne(id).then(data => {
            console.log(data)
            toast({
                title: "Delete successful", status: "success", duration: 9000, isClosable: true, position: "top", onCloseComplete: () => window.location.reload()
            });

        }
        ).catch(err => {
            console.log(err)
            toast({
                title: err, status: "error", duration: 9000, isClosable: true, position: "top",
            });
        })
    }

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const OverlayTwo = () => (
        <ModalOverlay
            bg='none'
            backdropFilter='auto'
            backdropInvert='80%'
            backdropBlur='2px'
        />
    )
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    // console.
    return (

        <Flex mt={50} overscroll={"scroll"}
            overflowY={"scroll"}
            overflowX={"hidden"}
        >
            <Flex direction={"column"} flex={3} borderRight={"1px solid lightgrey"}>
                <TableContainer >
                    <Table variant='simple'>
                        <Thead fontFamily={'Kumbh Sans'} fontSize={"25px"} fontStyle={"b"}>
                            <Tr>
                                <Th>Name</Th>
                                <Th>School Year</Th>
                                <Th>Major</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                projectList ? projectList.map((x) =>
                                    <Tr
                                        cursor="pointer"
                                        onClick={() => {
                                            setOverlay(<OverlayTwo />)
                                            handleproject(x._id)
                                            onOpen()
                                        }}
                                        _hover={{
                                            color: 'white', bg: "#2671B1"
                                        }}>
                                        <Td>
                                            <Flex align={"center"}>
                                                <Avatar
                                                    src={""}>
                                                </Avatar>
                                                <Text ml={5}>{`${x.name}`}</Text>
                                            </Flex>
                                        </Td>
                                        <Td> {x.schoolYear}</Td>
                                        <Td> {x.major.name}</Td>
                                        <Td>{x.status}</Td>

                                    </Tr>

                                ) : null
                            }
                        </Tbody>
                        <Modal isCentered isOpen={isOpen} onClose={onClose} size={"xl"}>

                            {overlay}
                            <ModalContent css={{
                                width: "fit-content",
                                minWidth: "600px",
                                margin: "auto",
                                fontSize: "20px"
                            }}>
                                <ModalHeader>Details</ModalHeader>
                                <ModalCloseButton />

                                <ModalBody>
                                    <TableContainer>
                                        <Table variant='striped' colorScheme='#0076ff' >
                                            <Tbody flex={1}>
                                                <Tr>
                                                    <Td>Name</Td>
                                                    <Td>{currentproject?.name}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Description</Td>
                                                    <Td>{currentproject?.description}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Review</Td>
                                                    <Td>{currentproject?.review}</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Score</Td>
                                                    {
                                                        currentproject && currentproject?.score >= 0 ? <Td>{currentproject?.score}</Td> : <Td>0</Td>
                                                    }
                                                </Tr>
                                                <Tr>
                                                    <Td>School Year</Td>
                                                    <Td>{currentproject?.schoolYear}</Td>
                                                </Tr>

                                                <Tr>
                                                    <Td>Major</Td>
                                                    <Td>
                                                        {currentproject?.major.name}
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Lecturer</Td>
                                                    <Td>{currentproject?.lecturer}</Td>
                                                </Tr>

                                                <Tr>
                                                    <Td>Students</Td>
                                                    <Td>
                                                        {
                                                            liststudent ? liststudent.map((x: any) => (
                                                                <div key={x._id}>
                                                                    studentId : {x.mssv}
                                                                    <br /><br />
                                                                    name : {x.firstName} {x.lastName}
                                                                    <br /><br />
                                                                    class : {x.class.name}
                                                                    <br />
                                                                    <br />
                                                                </div>
                                                            )) : null
                                                        }
                                                    </Td>
                                                </Tr>

                                            </Tbody>

                                        </Table>
                                    </TableContainer>
                                </ModalBody>

                                <ModalFooter>
                                    <IconButton aria-label={""} icon={<DeleteIcon />} size={"md"} mr={5} onClick={() => {
                                        handledelete(currentproject?._id)
                                        onClose()
                                    }}></IconButton>
                                    <IconButton aria-label={""} icon={<EditIcon />} onClick={onOpen1} mr={5} ></IconButton>
                                    <Modal closeOnOverlayClick={false} isOpen={isOpen1} onClose={onClose1}>
                                        <ModalOverlay />
                                        <ModalContent minWidth={"900px"} minH={"250px"}>
                                            <ModalCloseButton />
                                            <ModalBody minWidth={"900px"} pb={6}>
                                                <EDIT_PROJECT_FORM data={currentproject} />
                                            </ModalBody>

                                        </ModalContent>
                                    </Modal>
                                    <Button onClick={onClose}>Close</Button>
                                </ModalFooter>
                            </ModalContent>

                        </Modal>
                    </Table>
                </TableContainer>
                <Spacer>

                </Spacer>

                {projectList.length == 0 ? <Box>
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



