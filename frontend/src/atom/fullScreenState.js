import { atom } from "recoil"

export const fullScreenState = atom({
  key: "fullScreenState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
