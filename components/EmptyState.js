import React from "react";
import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import AddSiteModal from "./AddSiteModal";

const EmptyState = () => (
    <Flex
        width="100%"
        backgroundColor="white"
        borderRadius="5px"
        p={16}
        justify="center"
        align="center"
        direction="column"
    >
        <Heading mb={2}>You haven't added any sites.</Heading>
        <Text mb={4}>Welcome, let's get started</Text>
        <AddSiteModal>Add your first site</AddSiteModal>
    </Flex>
);

export default EmptyState;
