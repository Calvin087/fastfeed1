import React from "react";
import {
    Heading,
    Box,
    Text,
    Button
} from "@chakra-ui/react";
import DashboardShell from "./DashboardShell";

const FreePlanEmptyState = () => (
    <DashboardShell>
        <Box width="100%" backgroundColor="white" borderRadius="5px" p={8}>
        <Heading>Get Feedback Instantly</Heading>
        <Text>Start today and Grow with us</Text>
        <Button display="block">Upgrade to starter</Button>
        </Box>
    </DashboardShell>
);

export default FreePlanEmptyState;
