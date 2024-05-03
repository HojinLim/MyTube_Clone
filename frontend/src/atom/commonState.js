import { atom } from "recoil"

const communityState = atom({
  key: "communityState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
})

export { communityState }
