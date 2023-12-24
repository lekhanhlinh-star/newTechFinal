import React, { memo, useRef, useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useDisclosure,
    IconButton,
    useToast,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons';
import AdminAPI from '../../../api/adminAPI';


const DELETE_STUDENT = ({ id }: { id: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<HTMLButtonElement>(null);
    const toast = useToast();

    const handledelete = async (id: string) => {
        console.log(id)
        await AdminAPI.ManageStudent.deleteOne(id).then(data => {
            console.log(data)
            toast({
                title: "Delete successful",
                status: "success",
                duration: 1000,
                isClosable: true,
                position: "top",
                onCloseComplete: () => {
                    onClose();
                    window.location.reload();
                }
            });

        }
        ).catch(err => {
            console.log(err)
            toast({
                title: err, status: "error", duration: 1000, isClosable: true, position: "top",
            });
        })
    }

    return (
        <>
            {/* <IconButton aria-label={""} icon={<DeleteIcon />} size={"md"} mr={5} onClick={onOpen}></IconButton> */}
            <IconButton aria-label={""} onClick={onOpen} icon={<DeleteIcon />}>
            </IconButton>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete this post
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                handledelete(id)
                            }}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog >
        </>
    )
}

export default memo(DELETE_STUDENT);
