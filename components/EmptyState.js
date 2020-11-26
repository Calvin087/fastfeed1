import React from "react";
import { Heading, Flex, Text, Button } from "@chakra-ui/react";
import DashboardShell from "./DashboardShell";

const EmptyState = () => (
    <DashboardShell>
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
            <Button fontWeight="medium" maxW="250px" display="block">Add your first site</Button>
        </Flex>
    </DashboardShell>
);

export default EmptyState;
