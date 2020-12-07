import { useAuth } from "@/lib/auth";
import {
    Flex,
    Link,
    Stack,
    Avatar,
    Button
} from "@chakra-ui/react";
import TheLogo from "./logo";
import SiteTableHeader from "@/components/SiteTableHeader";

const DashboardShell = ({ children }) => {
    const { user, signout } = useAuth();

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
                    {user && (
                        <Button
                            variant="ghost"
                            mr={2}
                            onClick={() => signout()}
                        >
                            Signout
                        </Button>
                    )}
                    <Avatar size="sm" src={user?.photoUrl} />
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
                    <SiteTableHeader />
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
};

export default DashboardShell;
