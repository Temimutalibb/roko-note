import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import * as React from "react";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShortUniqueId from "short-unique-id";
import Header from "./header";
import Note from "./note";

import { tasksReducer } from "./taskreducer";

export default function Guess() {
  const [startNote, setStartNote] = useState(true);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [value, setValue] = useState(null);
  const [items, setitem] = useState([]);
  const [tab, dispatch] = useReducer(tasksReducer, []);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  //this is to check one if the guess has saved story
  useEffect(() => {
    if (!login) {
      const savedItems = localStorage.getItem("tab");
      const savedItemsJson = savedItems ? JSON.parse(savedItems) : [];
      console.log("fecthing dta", savedItemsJson);
      tab.push(...savedItemsJson);
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
    console.log("setting the data", JSON.stringify(storageItem));
  }, [storageItem]);

  //to generate a random number for the id
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

  return (
    <>
      <Header profile={"you're a guess"} logout={logout} login={loginUser} />
      {startNote && (
        <Note
          onTitleChange={onTitleChange}
          title={title}
          onNoteChange={onNoteChange}
          note={note}
          handleClick={handleClick}
          handleChange={handleChange}
          value={value}
          sortTab={sortTab}
          tab={tab}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handlePin={handlePin}
        />
      )}

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
