import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Fab from "@mui/material/Fab";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import "draft-js/dist/Draft.css";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import { BlogItButton, SaveButton, ShareButton } from "./buttons";
import { a11yProps } from "./extras";

export default function Note({
  onTitleChange,
  title,
  note,
  setNote,
  handleClick,
  value,
  handleChange,
  sortTab,
  tabNote,
  startNote,
  setStartNote,
  handleBlogIT,
}) {
  return (
    <>
      {startNote && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": {
              m: 1,
              width: "80%",
              margin: "auto",
              alignItems: "center",
              marginTop: "7rem",
              boxShadow: "0px 0px 0px 2px",
              backgroundColor: "inherit",
              zIndex: -1,
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
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      console.log("Enter key pressed");
                    }
                  }}
                  type="text"
                />
                <label for="input-field" class="input-label"></label>
                <span className="input-highlight"></span>
              </div>
              <div className="editor-container">
                <Editor
                  placeholder="Note here"
                  editorState={note} //{editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={setNote} //{setEditorState}
                  wrapperStyle={styles.wrapperStyle}
                  editorStyle={styles.editorStyle}
                  toolbarStyle={styles.toolbarStyle}
                />
              </div>
            </CardContent>

            <CardActions>
              <SaveButton onclick={handleClick} />

              <BlogItButton handleBlogIT={handleBlogIT} />
              <ShareButton
                articleTitle={note}
                articleUrl={title ? title : "chect this out"}
              >
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
          marginTop: "5rem",
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
          {sortTab.map((l) => (
            <Tab
              key={l.id}
              label={l.title}
              value={l.value}
              {...a11yProps(l.id)}
            />
          ))}
        </Tabs>

        <Box sx={{ width: "70%", m: "9px" }}>{tabNote}</Box>
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

const styles = {
  editorWrapper: {
    position: "relative",
  },
  wrapperStyle: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
  },
  editorStyle: {
    maxHeight: "300px", // Set a fixed height for the editor
    overflowY: "auto", // Enable scrolling for long content
    padding: "10px",
    backgroundColor: "#f9f9f9",
  },
  toolbarStyle: {
    position: "sticky", // Makes the toolbar stick at the top of the editor container
    top: 0, // Keeps it pinned to the top
    zIndex: 100, // Ensures it stays above the editor content
    backgroundColor: "#fff", // Prevents overlap issues
    borderBottom: "1px solid #ccc",
  },
};
