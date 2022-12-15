import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { client } from "../lib/apollo";
import { CustomeTheme, theme } from "../lib/theme";
import "styles/globals.css";
import "assets/fonts.css";
import { ModalContext } from "components/Modal/ModalContext";
import { ReactNode, useState } from "react";
import { ServerSettingsContext } from "components/ServerSettings";
import { UserContext } from "components/User";
import { UserProps } from "lib/interface";
import { initializeUser } from "lib/initialize";

function MyApp({ Component, pageProps }: AppProps) {
  const ThemeProviderFixed = ThemeProvider as unknown as React.FC<{ children: any; theme: CustomeTheme; }>;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<ReactNode | null>(null)
  const [colorPalette, setColorPalette] = useState<any>({})
  const [user, setUser] = useState<UserProps>(initializeUser)
  const [userSettings, setUserSettings] = useState<any>({})

  const VALUES = {
    modalIsOpen,
    setModalIsOpen,
    modalContent,
    setModalContent
  }

  const VALUES2 = {
    colorPalette,
    setColorPalette
  }

  const VALUES3 = {
    user,
    setUser,
    userSettings,
    setUserSettings
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProviderFixed theme={theme}>
        <ModalContext.Provider value={VALUES}>
          <ServerSettingsContext.Provider value={VALUES2}>
            <UserContext.Provider value={VALUES3}>
              <Component {...pageProps} />
            </UserContext.Provider>
          </ServerSettingsContext.Provider>
        </ModalContext.Provider>
      </ThemeProviderFixed>
    </ApolloProvider>
  )
}

export default MyApp;
