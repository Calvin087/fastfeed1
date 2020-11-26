import { useAuth } from "@/lib/auth";
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

const DashboardShell = ({ children }) => {
    const auth = useAuth();

    return (

    <Flex flexDirection="column">
        <Flex
            justifyContent="space-between"
            backgroundColor="white"
            py={4}
            px={8}
        >
            <Stack spacing={2} isInline alignItems="center">
                <TheLogo color="red.500" w={8} h={8} />
                <Link>Feedback</Link>
                <Link>Sites</Link>
            </Stack>
            <Flex
                justifyContent="flex-start"
                flexDirection="row"
                alignItems="center"
            >
                <Link mr={4}>Account</Link>
                <Avatar size="sm" src={auth.user.photoUrl} />
            </Flex>
        </Flex>
        <Flex backgroundColor="gray.100" p={8} height="100%" h="100vh">
            <Flex
                maxWidth="800px"
                w="100%"
                ml="auto"
                mr="auto"
                direction="column"
            >
                <Breadcrumb>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Sites</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Heading mb={4}>Sites</Heading>
                {children}
            </Flex>
        </Flex>
    </Flex>
    
    )
};

export default DashboardShell;
