import { atom } from "recoil"

const clickTermState = atom({
  key: "clickTermStateKey", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

export { clickTermState }
