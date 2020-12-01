import { useAuth } from "@/lib/auth";
import { createSite } from "@/lib/db";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Input,
    FormLabel,
    Button,
    useToast,
    useDisclosure,
} from "@chakra-ui/react";



const AddSiteModal = () => {
    const initialRef = useRef();
    const toast = useToast();
    const auth = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit } = useForm();
    
    const onCreateSite = ({ websiteName, websiteUrl }) => {
        createSite({
            authorID: auth.user.uid,
            createdAt: new Date().toISOString(),
            websiteName: websiteName,
            websiteUrl: websiteUrl,
        });
        toast({
            title: "All Done!",
            description: "We've updated your sites for you.",
            status: "success",
            duration: 5000,
            isClosable: true
        });
        onClose();
    };
 
    return (
        <>
            <Button
                fontWeight="medium"
                maxW="250px"
                display="block"
                onClick={onOpen}
            >
                Add your first site
            </Button>

            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
                    <ModalHeader fontWeight="medium">Add Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="My Site"
                                name="websiteName"
                                ref={register({
                                    required: true
                                })}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="https://website.com"
                                name="websiteUrl"
                                ref={register({
                                    required: true
                                })}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Cancel
                        </Button>
                        <Button
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit"
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddSiteModal;
