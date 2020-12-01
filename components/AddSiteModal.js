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
    useDisclosure
} from "@chakra-ui/react";


const AddSiteModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { register, handleSubmit } = useForm();
    const onCreateSite = (data) => createSite(data);
    const initialRef = useRef();
 
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
                                name="Site"
                                ref={register({
                                    required: true
                                })}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input
                                placeholder="https://website.com"
                                name="url"
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
