import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { client } from "../lib/apollo";
import { theme } from "../lib/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default MyApp;
