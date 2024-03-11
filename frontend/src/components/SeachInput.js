import { styled, alpha } from "@mui/material/styles"

const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.gray, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.gray, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

export default SearchContainer
