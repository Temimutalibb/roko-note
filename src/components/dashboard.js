import EditIcon from "@mui/icons-material/Edit";
import RsvpIcon from "@mui/icons-material/Rsvp";
import ShareIcon from "@mui/icons-material/Share";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useReducer, useState } from "react";
import ShortUniqueId from "short-unique-id";
import {
  BlogItButton,
  DeleteButton,
  EditButton,
  InviteButton,
  PinButton,
  SaveButton,
  ShareButton,
} from "./buttons";
import { a11yProps, Item } from "./extras";
import { tasksReducer } from "./taskreducer";

export default function Note() {
  const [startNote, setStartNote] = useState(true);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [value, setValue] = useState(0);
  const [tab, dispatch] = useReducer(tasksReducer, []);

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

  const handleClick = (e) => {
    e.preventDefault();
    if (note === "" || title === "") {
      alert("field cannot be empty");
      return;
    }
    const id = randomUUID();
    dispatch({
      type: "added",
      id: id,
      title: title,
      note: note,
    });
    setTitle("");
    setNote("");
  };

  const handleEdit = (id) => {
    const tabFilter = tab.filter((l) => l.id === id);
    const titleMap = tabFilter.map((t) => t.title);
    const noteMap = tabFilter.map((t) => t.note);
    setTitle(titleMap);
    setNote(noteMap);
    dispatch({
      type: "delete",
      id: id,
    });
  };

  const handleDelete = (id) => {
    dispatch({
      type: "delete",
      id: id,
    });
  };

  const handlePin = (id) => {
    dispatch({
      type: "pin",
      id: id,
    });
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
              backgroundColor: "inherit",
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
              <InviteButton>
                <RsvpIcon />
                invite
              </InviteButton>
              <BlogItButton />
              <ShareButton>
                <ShareIcon />
                Share
              </ShareButton>
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
          backgroundColor: "inherit",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 3,
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
              <ShareButton>
                <ShareIcon />
              </ShareButton>
              <EditButton handleEdit={() => handleEdit(l.id)} />
              <InviteButton>
                <RsvpIcon />
              </InviteButton>
              <DeleteButton handleDelete={() => handleDelete(l.id)} />
              <PinButton handlePin={() => handlePin(l.id)} />
            </div>
          ))}
        </Box>
      </Box>

      <Box
        onClick={() => setStartNote(!startNote)}
        sx={{ position: "fixed", bottom: "2rem", right: "2rem" }}
      >
        <Fab aria-label="edit">
          <EditIcon />
        </Fab>
      </Box>
    </>
  );
}
