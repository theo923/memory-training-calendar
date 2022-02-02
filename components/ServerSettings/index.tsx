import { TaskColorProps } from "lib/interface";
import { createContext, Dispatch, SetStateAction } from "react";

interface ValuesProps {
  colorPalette: TaskColorProps
  setColorPalette: Dispatch<SetStateAction<TaskColorProps>>
}

export const ServerSettingsContext = createContext<ValuesProps>({
  colorPalette: { color_static: [], color_gradient: [] },
  setColorPalette: () => { },
})
