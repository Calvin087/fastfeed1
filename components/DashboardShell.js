import {
    Flex,
    Link,
    Stack,
    Avatar,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Heading,
} from "@chakra-ui/react";
import TheLogo from "./logo";

const DashboardShell = ({children}) => (
    <Flex flexDirection="column">
        <Flex justifyContent="space-between" backgroundColor="white" p={4}>
            <Stack spacing={2} isInline alignItems="center">
                <TheLogo color="red.500" w={6} h={6} />
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
                    {children}
                </Breadcrumb>
            </Flex>
        </Flex>
    </Flex>
);

export default DashboardShell;
