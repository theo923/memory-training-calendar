import { initializeUser } from "lib/initialize";
import { UserProps, UserSettingsProps } from "lib/interface";
import { createContext, Dispatch, SetStateAction } from "react";

interface ValuesProps {
  user: UserProps
  setUser: Dispatch<SetStateAction<UserProps>>
  userSettings: UserSettingsProps
  setUserSettings: Dispatch<SetStateAction<UserSettingsProps>>
}

export const UserContext = createContext<ValuesProps>({
  user: initializeUser,
  setUser: () => { },
  userSettings: { bgColor: '' },
  setUserSettings: () => { },
})
