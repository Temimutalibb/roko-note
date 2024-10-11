import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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
