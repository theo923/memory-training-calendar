import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { client } from "../lib/apollo";
import { theme } from "../lib/theme";
import "styles/globals.css";
import "assets/fonts.css";
import { ModalContext } from "components/Modal/ModalContext";
import { ReactNode, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [modalContent, setModalContent] = useState<ReactNode | null>(null)

    const VALUES = {
        modalIsOpen,
        setModalIsOpen,
        modalContent,
        setModalContent
    }

    return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <ModalContext.Provider value={VALUES}>
                    <Component {...pageProps} />
                </ModalContext.Provider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default MyApp;
