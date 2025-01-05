import { Box, Button, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { convertFromRaw, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import HTMLParser from "html-react-parser";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../App";
import InviteNote from "../invitenote";
import { Item } from "./extras";
import Header from "./header";

window.global = window;

export default function InviteDraft() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editorDisplay, setEditorDisplay] = useState(false);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(() => EditorState.createEmpty());
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .post(`${server}getlink`, {
          inviteLink: id,
        })
        .then((response) => {
          setData(response.data.tab);
          setEmail(response.data.email);
          setLoading(false);
        })

        .catch((error) => {
          console.error("Error fetching tasks:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id]);

  const filteredData = Array.isArray(data)
    ? data.filter((item) => item.id === id)
    : [];

  const convertToHtml = (data) => {
    if (!data || data === "{}") {
      return "<p>The editor is empty.</p>";
    }
    const rawContentJSON = data;
    try {
      const rawContent = JSON.parse(rawContentJSON);
      const contentState = convertFromRaw(rawContent);
      const html = stateToHTML(contentState);
      return html;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return "<p>Error parsing content.</p>";
    }
  };

  //for edit to convert html back to content state

  const displayReturn = (html) => {
    const rawContentState = JSON.parse(html);
    const contentState = convertFromRaw(rawContentState);
    const newEditorState = EditorState.createWithContent(contentState);
    setNote(newEditorState);
  };

  //for title change
  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEdit = (title, content) => {
    setEditorDisplay(true);
    setTitle(title);
    displayReturn(content);
  };

  const handleSave = () => {
    axios
      .post(`${server}saveinvite`, {
        email: email,
        id: id,
        title: title,
        note: JSON.stringify(note),
      })
      .then((response) => {
        if (response) {
          alert("data saved successfully");
        } else {
          alert("error occured, please try again");
        }
      })
      .catch((error) => console.log("error"));
  };

  if (loading) {
    return (
      <>
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rounded" height={200} />
        </Stack>
      </>
    );
  }

  if (!id) {
    return (
      <>
        <Item style={{ justifyContent: "space-around" }} />
      </>
    );
  }

  if (filteredData.length === 0) {
    return (
      <>
        <Item style={{ justifyContent: "space-around" }}>
          Sorry link is not valid
        </Item>
      </>
    );
  }

  const tab = filteredData.map((item) => (
    <div key={item.id}>
      <Box sx={{ width: "100%" }}>
        <Item style={{ justifyContent: "space-around" }}>
          <span>{HTMLParser(convertToHtml(item.note))}</span>
          {/* Check if the invite link includes "yes" to allow editing */}
          {item.inviteLink.includes("yes") && (
            <Button onClick={() => handleEdit(item.title, item.note)}>
              Edit
            </Button>
          )}
        </Item>
      </Box>
    </div>
  ));

  return (
    <>
      <Header />
      {editorDisplay && (
        <InviteNote
          onTitleChange={onTitleChange}
          title={title}
          note={note}
          setNote={setNote}
          handleClick={handleSave}
        />
      )}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
          marginTop: "5rem",
          marginBottom: "20px",
          backgroundColor: "inherit",
        }}
      >
        <Box sx={{ width: "70%", m: "auto" }}>{tab}</Box>
      </Box>
    </>
  );
}
