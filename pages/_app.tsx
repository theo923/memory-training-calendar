import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { client } from "../lib/apollo";
import { theme } from "../lib/theme";
import "styles/globals.css";
import "assets/fonts.css";

function MyApp({ Component, pageProps }: AppProps) {
    const router: NextRouter = useRouter()
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Component router={router} {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default MyApp;
