import { atom } from "recoil"

export const changeState = atom({
  key: "changeState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})
