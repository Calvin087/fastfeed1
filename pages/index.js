import Head from "next/head";
import { useAuth } from "../lib/auth";

const Home = () => {
    const auth = useAuth();

    return (
        <div>

        <Head>
            <title>Fastish Feedback</title>
        </Head>

            <main>
                <h1>Fast Feedback</h1>

                <p>
                    Current user:{" "}
                    {auth?.user ? auth.user.email : "None"}
                </p>
                {auth?.user ? (
                    <button onClick={(e) => auth.signout()}>Sign Out</button>
                ) : (
                    <button onClick={(e) => auth.signinWithGitHub()}>
                        Sign In
                    </button>
                )}
            </main>

             
        </div>
    );
};

export default Home;
