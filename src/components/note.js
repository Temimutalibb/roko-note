import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useState } from "react";
import ShortUniqueId from "short-unique-id";
import { BlogItButton, InviteButton, SaveButton, ShareButton } from "./buttons";

export default function Note({ startNote, tab, handleClick }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [value, setValue] = useState(0);
  const [data, setData] = useState([title, note]);

  const { randomUUID } = new ShortUniqueId({
    dictionary: "number",
  });

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {startNote && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "40ch",
              margin: "auto",
              alignItems: "center",
              marginTop: "7rem",
              boxShadow: "0px 0px 0px 2px",
            },
          }}
          noValidate
        >
          <Card sx={{ minWidth: 375 }}>
            <CardContent>
              <div className="input-container">
                <input
                  onChange={onTitleChange}
                  value={title}
                  placeholder="title"
                  className="input-field"
                  type="text"
                />
                <label for="input-field" class="input-label"></label>
                <span className="input-highlight"></span>
              </div>
              <textarea
                onChange={onNoteChange}
                value={note}
                className="textarea-field"
                placeholder="Note"
                rows="20"
                cols="40"
              ></textarea>
            </CardContent>

            <CardActions>
              <SaveButton onclick={handleClick} />
              <InviteButton />
              <BlogItButton />
              <ShareButton />
            </CardActions>
          </Card>
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            width: "20%",
            minWidth: "100px",
            maxWidth: "200px",
          }}
        >
          {tab.map((l) => (
            <Tab label={l.title} value={l.value} {...a11yProps(l.id)} />
          ))}
        </Tabs>

        <Box sx={{ width: "70%", m: "9px" }}>
          {tab.map((l) => (
            <div
              key={l.id}
              role="tabpanel"
              hidden={value !== l.id}
              id={`vertical-tabpanel-${l.id}`}
              aria-labelledby={`vertical-tab-${l.id}`}
            >
              <Box sx={{ width: "100%" }}>
                <Stack spacing={2}>
                  {value === l.id && (
                    <>
                      <Item>{l.note}</Item>
                    </>
                  )}
                </Stack>
              </Box>
            </div>
          ))}
        </Box>
      </Box>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));
