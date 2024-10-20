import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import axios from "axios";
import * as React from "react";
import { useEffect, useMemo, useReducer, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { server } from "../App";
import Note from "./note";

import { tasksReducer } from "./taskreducer";

export default function DashBoard() {
  const [startNote, setStartNote] = useState(true);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [value, setValue] = useState(null);
  const [items, setitem] = useState([]);
  const [tab, dispatch] = useReducer(tasksReducer, []);

  const email = localStorage.getItem("email");
  //to get the localstorage one time incase usere switched from guess
  useEffect(() => {
    const savedItems = localStorage.getItem("tab");
    if (savedItems) {
      const savedItemsJson = JSON.parse(savedItems);
      tab.push(...savedItemsJson);
    }
  }, []);

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
      .then((response) => tab.push(...response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  //to save to the local storage as a backup
  useEffect(() => {
    localStorage.setItem("tab", JSON.stringify(storageItem));
    console.log("setting the data", JSON.stringify(storageItem));
  }, [storageItem]);

  //save to the database each time time changes
  useEffect(() => {
    axios
      .post(`${server}savenote`, {
        tab: storageItem,
        email: email,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error sending data:", error));
  }, [storageItem, email]);

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

  return (
    <>
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
