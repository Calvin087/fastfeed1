import Head from "next/head";
import { Button, Heading, Text, Code, Icon, Flex } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";

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

            <Icon viewBox="0 0 512 512" color="red.500" w={10} h={10}>
                <path
                    fill="currentColor"
                    d="M459.9 171.8c-26.3-32.9-63-52-97.9-52-45.9 0-65.3 22-97.2 22-33 0-58-21.9-97.6-21.9-39 0-80.6 23.8-106.9 64.6C23.3 242 29.6 350 89.6 441.8c21.5 32.9 50.2 69.9 87.7 70.2 33.3.3 42.7-21.4 88-21.6 45.2-.3 53.8 21.9 87 21.5 37.6-.3 67.8-41.2 89.3-74.1a368.9 368.9 0 0033-62.1c-86.7-33-100.7-156.5-14.7-204z"
                />
            </Icon>

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
