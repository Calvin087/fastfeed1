import Head from "next/head";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { useAuth } from "@/lib/auth";
import TheLogo from "@/components/logo";
import LogoGithub from "@/components/LogoGithub";
import LogoGoogle from "@/components/LogoGoogle";

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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `
                    }}
                />
                <title>Fastish Feedback</title>
            </Head>

            <TheLogo color="gray.700" w={10} h={10} mb={4} />

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
                <Stack spacing={4}>
                    <Button
                        onClick={(e) => auth.signinWithGitHub()}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        leftIcon={<LogoGithub />}
                        mt={4}
                        size="lg"
                        _hover={{ bg: "gray.600" }}
                        _active={{
                            bg: "gray.800",
                            transform: "scale(0.95)"
                        }}
                    >
                        Sign In with Github
                    </Button>
                    <Button
                        leftIcon={<LogoGoogle viewBox="0 0 560 560" />}
                        onClick={(e) => auth.signinWithGitHub()}
                        backgroundColor="white"
                        color="gray.900"
                        fontWeight="medium"
                        mt={4}
                        size="lg"
                        variant="outline"
                        _hover={{ bg: "gray.200" }}
                        _active={{
                            bg: "gray.100",
                            transform: "scale(0.95)"
                        }}
                    >
                        Sign In with Google
                    </Button>
                </Stack>
            )}
        </Flex>
    );
};

export default Home;
