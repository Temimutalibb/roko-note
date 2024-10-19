import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { alpha, createTheme, styled } from "@mui/material/styles";

export function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export const Item = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  fontSize: "50px",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

//for header search
export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

//for header searchwrapper
export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

//for header
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

//for header
export const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: "inherit", // Custom color "#eceff1"
          color: "inherit", //"black",
        },
      },
    },
  },
});

//for home
export const ItemHome = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  boxShadow: "1px 1px 3px 1px", //"0px 0px 1px 1px",
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  width: "11rem",
  margin: "auto",
  cursor: "default",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "bieseg", // Example hover effect
    opacity: 0.7,
    cursor: "pointer",
    boxShadow: "0px 0px 0px 3px",
  },
}));
