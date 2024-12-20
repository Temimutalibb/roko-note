import axios from "axios";
import * as React from "react";
import { useMemo, useReducer, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { server } from "../App";
import { BlogitModal } from "./blogit";
import Note from "./note";

import PushPinIcon from "@mui/icons-material/PushPin";
import RsvpIcon from "@mui/icons-material/Rsvp";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import HTMLParser from "html-react-parser";
import { useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { DeleteButton, EditButton, InviteButton, PinButton } from "./buttons";
import { Item } from "./extras";
import { tasksReducer } from "./taskreducer";

export default function DashBoard() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(() => EditorState.createEmpty());
  const [tab, dispatch] = useReducer(tasksReducer, []);
  const [value, setValue] = useState(null);
  const [startNote, setStartNote] = useState(true);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const email = localStorage.getItem("email");

  //to save tab and avoid duplicate
  const storageItem = useMemo(() => {
    return tab;
  }, [tab]);

  //to call the database once and get the data
  useEffect(() => {
    axios
      .post(`${server}getdata`, {
        email: email,
      })
      .then((response) => dispatch({ type: "SET_TAB", payload: response.data }))

      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  //save to the database each time tab changes
  useEffect(() => {
    if (email && tab.length > 0) {
      axios
        .post(`${server}savenote`, {
          tab: storageItem,
          email: email,
        })
        .then((response) => console.log(response.data))
        .catch((error) => console.error("Error sending data:", error));
    }
  }, [storageItem]);

  const { randomUUID } = new ShortUniqueId({
    dictionary: "number",
  });
  //to check if content is empty
  const isContentEmpty = () => {
    const contentState = note.getCurrentContent();
    const blocks = convertToRaw(contentState).blocks;
    return blocks.every((block) => !block.text.trim().length);
  };

  //for the tab change in value
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //for title change
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  //this will get  editor text json stringify it
  const getTextFromEditorState = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const rawContentJSON = JSON.stringify(rawContentState);
    return rawContentJSON;
  };

  //this will parse the json convert the singify to html
  const convertToHtml = (data) => {
    if (!data || data === "{}") {
      return "<p>The editor is empty.</p>";
    }
    const rawContentJSON = data;
    const rawContent = JSON.parse(rawContentJSON);
    const contentState = convertFromRaw(rawContent);
    const html = stateToHTML(contentState);
    return html;
  };

  //for edit to convert html back to content state

  const displayReturn = (html) => {
    const rawContentState = JSON.parse(html);
    const contentState = convertFromRaw(rawContentState);
    const newEditorState = EditorState.createWithContent(contentState);
    setNote(newEditorState);
  };

  //get the tab json and convert it to html and display the note
  const tabNote = tab?.map((l) => (
    <div
      key={l.id}
      hidden={value !== l.id}
      id={`vertical-tabpanel-${l.id}`}
      aria-labelledby={`vertical-tab-${l.id}`}
    >
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {value === l.id && (
            <>
              <Item>
                <span>{HTMLParser(convertToHtml(l.note))}</span>
                <span style={{ width: "1rem" }}>
                  {l.pin ? <PushPinIcon /> : ""}
                </span>
              </Item>
            </>
          )}
        </Stack>
      </Box>
      <EditButton handleEdit={() => handleEdit(l.id)} />
      <InviteButton>
        <RsvpIcon />
      </InviteButton>
      <DeleteButton handleDelete={() => handleDelete(l.id)} />
      <PinButton handlePin={() => handlePin(l.id)} />
    </div>
  ));

  //when save button is cliked
  const handleClick = async (e) => {
    e.preventDefault();
    if (isContentEmpty() || title === "") {
      alert("field cannot be empty");
      return;
    }
    const id = randomUUID();
    const textValue = getTextFromEditorState(note); //get the text and json stringify it
    dispatch({
      type: "added",
      id: id,
      title: title,
      note: textValue,
    });
    setTitle("");
    setNote(() => EditorState.createEmpty());
  };

  const handleEdit = (id) => {
    const tabFilter = tab.filter((l) => l.id === id);
    const titleMap = tabFilter[0].title; //tabFilter.map((t) => t.title);
    const noteMap = tabFilter[0].note; //tabFilter.map((t) => t.note);
    setTitle(titleMap);
    displayReturn(noteMap);
    setStartNote(true);
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
  const sortTab = tab.sort((a, b) => {
    const aHasPin = a.pin === "pin";
    const bHasPin = b.pin === "pin";

    if (aHasPin && !bHasPin) {
      return -1;
    } else if (!aHasPin && bHasPin) {
      return 1;
    } else {
      return 0;
    }
  });

  //for blogit
  const handleBlogIT = (e) => {
    e.preventDefault();
    if (isContentEmpty() || title === "") {
      alert("field cannot be empty");
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <Note
        onTitleChange={onTitleChange}
        title={title}
        note={note}
        setNote={setNote}
        handleClick={handleClick}
        value={value}
        handleChange={handleChange}
        sortTab={sortTab}
        tabNote={tabNote}
        startNote={startNote}
        setStartNote={setStartNote}
        handleBlogIT={handleBlogIT}
      />

      <BlogitModal
        open={open}
        handleClose={handleClose}
        title={title}
        content={getTextFromEditorState(note)}
      />
    </>
  );
}
