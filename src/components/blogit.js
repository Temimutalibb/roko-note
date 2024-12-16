import { Button, FormControl, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";

export function BlogitModal({ open, handleClose, title, content }) {
  const [feedback, setFeedBack] = useState("");
  const [username, setUsername] = useState("");
  const [category, setCategory] = useState("");
  const [link, setLink] = useState("");
  const [tag, setTag] = useState("");
  const [pin, setPin] = useState("");

  const [formShow, setFormShow] = useState(true);
  const [progress, setProgress] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleLink = (event) => {
    setLink(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      alert("category cannot be empty");
      return;
    }
    setFormShow(false);
    setProgress(true);
    setFeedBack("compiling...");
    axios
      .post("https://blogitserver.vercel.app/feedback", {
        title: title,
        content: JSON.stringify(content),
        username: username,
        link: link,
        category: category,
      })
      .then((response) => {
        const data = response.data;
        setProgress(false);
        setFeedBack(
          "copy and save your pin and tag, you will need it to make chages to your post and to withraw your earns"
        );
        setPin(`This is your pin: ${data.pin}`);
        setTag(`This is your tag: ${data.tag}`);
      })
      .catch((error) => {
        if (error.response) {
          setFeedBack("error saving ");
        } else {
          setFeedBack("error occur");
        }

        console.error("There was an error", error);
      });
  };

  useEffect(() => {
    if (!open) {
      setFormShow(true);
      setProgress(false);
      setFeedBack("");
      setUsername("");
      setLink("");
      setTag("");
      setPin("");
      setCategory("");
    }
  }, [open]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            {formShow && (
              <FormControl>
                <Box
                  style={{
                    padding: "2rem",
                    margin: "2rem",
                    boxShadow: "1px 1px 2px 1px ",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <TextField
                    onChange={handleUsername}
                    name="username"
                    value={username}
                    id="outlined-email-input"
                    label="username"
                    type="email"
                    variant="filled"
                    style={{ margin: "0.5rem", marginTop: "1rem" }}
                  />
                  <TextField
                    onChange={handleLink}
                    name="link"
                    value={link}
                    id="outlined-email-input"
                    label="link"
                    type="email"
                    variant="filled"
                    style={{ margin: "0.5rem", marginTop: "1rem" }}
                  />
                  <div>
                    <FormControl
                      variant="filled"
                      sx={{
                        margin: "0.5rem",
                        marginTop: "1rem",
                        minWidth: 120,
                      }}
                    >
                      <InputLabel id="demo-simple-select-filled-label">
                        category
                      </InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={category}
                        onChange={handleCategory}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Technology"}>Technology</MenuItem>
                        <MenuItem value={"Business"}>Business</MenuItem>
                        <MenuItem value={"Education"}>Education</MenuItem>
                        <MenuItem value={"Entertainment"}>
                          Entertainment
                        </MenuItem>
                        <MenuItem value={"Food_and_Drink"}>
                          Food and Drink
                        </MenuItem>
                        <MenuItem value={"Finance"}>Finance</MenuItem>
                        <MenuItem value={"Marketing"}>Marketing</MenuItem>
                        <MenuItem value={"Science"}>Science</MenuItem>
                        <MenuItem value={"DIY_and _Crafts"}>
                          DIY and Crafts
                        </MenuItem>
                        <MenuItem value={"News_and_Opinion"}>
                          News and Opinion
                        </MenuItem>
                        <MenuItem value={"Parentin"}>Parenting</MenuItem>
                        <MenuItem value={"Photography"}>Photography</MenuItem>
                        <MenuItem value={"Technology_Review"}>
                          Technology Review
                        </MenuItem>
                        <MenuItem value={"Programming"}>Programming</MenuItem>
                        <MenuItem value={"Web_3"}>Web 3.0</MenuItem>
                        <MenuItem value={"Crypto"}>Crypto</MenuItem>
                        <MenuItem value={"Tech"}>Tech</MenuItem>
                        <MenuItem value={"Spiritual"}>Spiritual</MenuItem>
                        <MenuItem value={"Others"}>Others</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    size="large"
                    style={{ margin: "0.5rem" }}
                  >
                    continue
                  </Button>
                </Box>
              </FormControl>
            )}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {progress && <LinearProgress />}
            </Typography>
            <Typography id="modal-modal-tag" sx={{ mt: 2, fontWeight: "bold" }}>
              {tag}
            </Typography>
            <Typography id="modal-modal-pin" sx={{ mt: 2, fontWeight: "bold" }}>
              {pin}
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, fontStyle: "italic" }}
            >
              {feedback}
            </Typography>
          </>
        </Box>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};
