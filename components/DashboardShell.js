import React from "react";
import {
    Flex,
    Icon,
    Link,
    Stack,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
    Box,
    Text,
    Button
} from "@chakra-ui/core";

const DashboardShell = () => (
        <Flex flexDirection="column">
            <Flex
                justifyContent="space-between"
                backgroundColor="white"
                p={4}
            >
                <Stack spacing={2} isInline alignItems="center">
                    <Icon name="logo" />
                    <Link>Feedback</Link>
                    <Link>Sites</Link>
                </Stack>
                <Flex
                    justifyContent="flex-start"
                    flexDirection="row"
                    alignItems="center"
                >
                    <Link mr={4}>Account</Link>
                    <Avatar size="sm" />
                </Flex>
            </Flex>
            <Flex backgroundColor="gray.100" p={8} height="100%">
                <Flex
                    maxWidth="800px"
                    justifyContent="center"
                    alignItems="center"
                    ml="auto"
                    mr="auto"
                >
                    <Breadcrumb>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink>Sites</BreadcrumbLink>
                        </BreadcrumbItem>
                        <Heading>Sites</Heading>
                        <Box
                            width="100%"
                            backgroundColor="white"
                            borderRadius="5px"
                            p={8}
                        >
                            <Heading>Get Feedback Instantly</Heading>
                            <Text>Start today and Grow with us</Text>
                            <Button display="block">Upgrade to starter</Button>
                        </Box>
                    </Breadcrumb>
                </Flex>
            </Flex>
        </Flex>
);

export default DashboardShell;
