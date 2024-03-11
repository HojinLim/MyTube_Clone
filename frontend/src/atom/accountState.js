import { atom } from "recoil"

export const accountState = atom({
  key: "accountStateKey", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})

// { email: string, picture: string }
