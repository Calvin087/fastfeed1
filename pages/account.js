import { useAuth } from "@/lib/auth";
import DashboardShell from "@/components/DashboardShell";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { createCheckoutSession } from "@/lib/db";
import { Box, Button } from "@chakra-ui/react";

const Account = () => {
    const { user } = useAuth();
    const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);
    // passing SWR two values, the api to call and a user token.

    // if (!data) {
    //     return (
    //         <DashboardShell>
    //         <SiteTableHeader />
    //             <SiteTableSkeleton />
    //         </DashboardShell>
    //     );
    // }

    return (
        <DashboardShell>
            <Box>
                <Button
                    onClick={(e) => createCheckoutSession(user.uid)}
                    backgroundColor="gray.900"
                    color="white"
                    fontWeight="medium"
                    mt={4}
                    size="lg"
                    _hover={{ bg: "gray.600" }}
                    _active={{
                        bg: "gray.800",
                        transform: "scale(0.95)"
                    }}
                >
                    Upgrade to starter
                </Button>
            </Box>
        </DashboardShell>
    );
};

export default Account;
