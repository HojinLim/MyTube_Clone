import { atom } from "recoil"

const watchCommentsSortState = atom({
  key: "watchCommentsSortState", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

// { email: string, picture: string }

export { watchCommentsSortState }
