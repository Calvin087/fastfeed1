import React from "react";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import DashboardShell from "./DashboardShell";

const EmptyState = () => (
    <DashboardShell>
        <Box width="100%" backgroundColor="white" borderRadius="5px" p={8}>
            <Heading>You haven't added any sites.</Heading>
            <Text>Welcome, let's get started</Text>
            <Button display="block">Add your first site</Button>
        </Box>
    </DashboardShell>
);

export default EmptyState;
