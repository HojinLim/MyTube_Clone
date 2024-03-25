import { Margin } from "@mui/icons-material"
import { styled } from "@mui/material/styles"

const StyledGrid = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.5),
  margin: "auto",
  justifyItems: "center",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    paddingTop: "30px",
    justifyContent: "center", // 수평 가운데 정렬
    alignItems: "center",
  },
  [theme.breakpoints.up("md")]: {
    width: "80%",
    margin: "auto",
    justifyContent: "center", // 수평 가운데 정렬
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "1fr  1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
  },
  [theme.breakpoints.up("lg")]: {
    width: "100%",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
    // backgroundColor: "#cfeeee",
    paddingTop: "20px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "100%",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr",
  },
}))

const flex_space_between = {
  display: "flex",
  justifyContent: "space-between",
}
const flex_column = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
}

export { StyledGrid, flex_space_between, flex_column }
