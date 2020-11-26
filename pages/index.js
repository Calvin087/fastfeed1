import Head from "next/head";
import { Button, Heading, Text, Code, Icon, Flex } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import TheLogo from "@/components/logo";

const Home = () => {
    const auth = useAuth();

    return (
        <Flex
            as="main"
            direction="column"
            align="center"
            justify="center"
            h="100vh"
        >
            <Head>
                <title>Fastish Feedback</title>
            </Head>

            <TheLogo color="red.500" w={10} h={10} />

            {auth?.user ? (
                <Button
                    mt={4}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => auth.signout()}
                >
                    Sign Out
                </Button>
            ) : (
                <Button
                    mt={4}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => auth.signinWithGitHub()}
                >
                    Sign In
                </Button>
            )}
        </Flex>
    );
};

export default Home;
