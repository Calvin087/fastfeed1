import { ThemeProvider, CSSReset } from "@chakra-ui/react";
import { AuthProvider } from "@/lib/auth";
import theme from "@/styles/theme";
import { Global, css } from "@emotion/react";

const GlobalStyle = ({ children }) => {
    return (
        <div>
            <CSSReset />
            <Global
                styles={css`
                    html {
                        min-width:460px;
                        scroll-behavior: smooth;
                    }
                    
                    #__next { 
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                `}
            />
            {children}
        </div>
    );
};

const App = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
