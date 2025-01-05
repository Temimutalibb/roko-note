import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Editor } from "react-draft-wysiwyg";
import { SaveButton } from "./components/buttons";

export default function InviteNote({
  onTitleChange,
  title,
  note,
  setNote,
  handleClick,
}) {
  return (
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
        </CardActions>
      </Card>
    </Box>
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
