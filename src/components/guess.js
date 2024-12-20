import PushPinIcon from "@mui/icons-material/PushPin";
import RsvpIcon from "@mui/icons-material/Rsvp";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "draft-js/dist/Draft.css";
import HTMLParser from "html-react-parser";
import * as React from "react";
import { useEffect, useMemo, useReducer, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import { BlogitModal } from "./blogit";
import { DeleteButton, EditButton, InviteButton, PinButton } from "./buttons";
import { Item } from "./extras";
import Header from "./header";
import Note from "./note";
import { tasksReducer } from "./taskreducer";

export default function Guess() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(() => EditorState.createEmpty());
  const [items, setitem] = useState([]);
  const [login, setLogin] = useState(false);
  const [tab, dispatch] = useReducer(tasksReducer, []);
  const [value, setValue] = useState(null);
  const [startNote, setStartNote] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  //this is to check if the guess has saved story
  useEffect(() => {
    if (!login) {
      const savedItems = localStorage.getItem("tab");
      const savedItemsJson = savedItems ? JSON.parse(savedItems) : [];
      console.log("fecthing dta", savedItemsJson);
      dispatch({ type: "SET_TAB", payload: savedItemsJson });
      setitem("checking");
    }
    setLogin(true);
  }, [items]);

  //to save the tab and avoid duplicate
  const storageItem = useMemo(() => {
    return tab;
  }, [tab]);

  //to save the story to the local storage
  useEffect(() => {
    localStorage.setItem("tab", JSON.stringify(storageItem));
  }, [storageItem]);

  //to generate a random number for the id
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
      role="tabpanel"
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
  const handleClick = (e) => {
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

  //to logout and delate all stories
  const logout = () => {
    localStorage.removeItem("tab");
    navigate("/");
  };

  const loginUser = () => {
    navigate("/");
  };

  //modal for blogit

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
      <Header
        profile={"You're a guest"}
        loginText={"login"}
        logout={logout}
        login={loginUser}
      />

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
