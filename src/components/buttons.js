import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { useState } from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";

//Button to save note and title
export function SaveButton({ onclick }) {
  return (
    <>
      <Button onClick={onclick}>
        <Fab variant="extended" size="small" aria-label="like">
          <SaveIcon />
          save
        </Fab>
      </Button>
    </>
  );
}

//Button fot invite
export function InviteButton({ children }) {
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleBlogIT = () => {
    setOpen(true);
  };

  const action = (
    <fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </fragment>
  );

  return (
    <>
      <Button onClick={handleBlogIT}>
        <Fab variant="extended" title="blogIT" size="small" aria-label="like">
          {children}
        </Fab>
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Coming soon"
        action={action}
      />
    </>
  );
}

//button for blogit
export function BlogItButton({ handleBlogIT }) {
  return (
    <>
      <Button onClick={handleBlogIT}>
        <Fab title="blogIT" size="small" aria-label="like">
          <RssFeedIcon />
        </Fab>
      </Button>
    </>
  );
}

//delete button
export function DeleteButton({ handleDelete }) {
  return (
    <Button onClick={handleDelete}>
      <Fab title="delete" size="small" aria-label="like">
        <DeleteIcon />
      </Fab>
    </Button>
  );
}

//edit button
export function EditButton({ handleEdit }) {
  return (
    <>
      <Button onClick={handleEdit}>
        <Fab title="edit" size="small" aria-label="like">
          <EditIcon />
        </Fab>
      </Button>
    </>
  );
}

//pin button
export function PinButton({ handlePin }) {
  return (
    <Button onClick={handlePin}>
      <Fab title="pin" size="small" aria-label="like">
        <PushPinIcon />
      </Fab>
    </Button>
  );
}

//custom share button
const CustomDevToButton = ({ url, children }) => {
  const handleClick = () => {
    const devToUrl = url;
    const width = 600;
    const height = 400;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    window.open(
      devToUrl,
      "devtoShareWindow",
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes`
    );
  };

  return <span onClick={handleClick}>{children}</span>;
};

//button for sharing to various websites
export function ShareButton({ children, articleTitle, articleUrl }) {
  const [displayShare, setDisplayShare] = useState(false);

  return (
    <>
      <Button onClick={() => setDisplayShare(!displayShare)}>
        <Fab variant="extended" size="small" aria-label="like">
          {children}
        </Fab>
      </Button>
      <div style={{ position: "relative", display: "inline-block" }}>
        {displayShare && (
          <div>
            <TwitterShareButton
              url={articleUrl}
              title={articleTitle}
              via="Roko Note" // Optional: your Twitter handle
              hashtags={[]} // Optional: hashtags
            >
              <Fab
                title="twitter"
                style={{
                  position: "absolute",
                  bottom: "15rem",
                  right: 0,
                }}
                color="primary"
                aria-label="twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  width="64px"
                  height="64px"
                >
                  <path
                    fill="#37d0ee"
                    d="M56.742,17.149c-1.358,0.465-2.827,0.727-4.374,0.902c1.525-0.759,2.58-1.877,3.566-3.246	c0.564-0.783-0.31-1.807-1.179-1.386c-1.545,0.748-3.038,1.304-4.918,1.624c-1.839-1.653-4.263-2.665-6.932-2.665	c-3.877,0-7.255,2.123-9.028,5.264c-0.858,1.509-1.349,3.255-1.349,5.113c0,0.639,0.077,1.257,0.188,1.863	c-8.339-0.248-15.328-4.554-19.305-9.97c-0.442-0.601-1.364-0.473-1.638,0.221c-0.422,1.067-0.943,2.225-0.943,4.112	c0,0.113,0,0.217,0.009,0.321c0.038,1.226,0.311,2.396,0.783,3.453c0.887,2.047,2.491,3.717,4.5,4.698	c-0.189,0.009-0.377,0.019-0.575,0.019c-1.887,0-2.508-0.646-3.531-0.912c-0.644-0.168-1.274,0.37-1.176,1.028	c0.309,2.095,1.4,4.301,2.858,5.705c1.566,1.528,3.66,2.509,5.991,2.651c-1.244,0.613-2.65,0.962-4.141,0.962h-0.943	c-0.713,0-1.158,0.755-0.836,1.391c1.582,3.129,5.246,5.217,9.172,5.204c-3.783,2.385-8.25,3.783-13.053,3.783H8.943	C8.423,47.283,8,47.706,8,48.226c0,0.432,0.296,0.781,0.692,0.892l-0.002,0.016c0,0,7.104,2.865,15.347,2.865	c15.972,0,28.953-12.802,29.236-28.707c0.009-0.179,0.009-0.358,0.009-0.538s0-0.358-0.009-0.538	c-0.013-0.259-0.045-0.514-0.077-0.769c1.746-0.556,3.301-1.47,4.539-2.76C58.417,17.977,57.674,16.83,56.742,17.149z"
                  />
                  <ellipse cx="27" cy="61" opacity=".3" rx="19" ry="3" />
                  <path
                    d="M53.18,25.06C52.01,40.14,39.41,52,24.04,52c-1.73,0-3.41-0.13-4.98-0.33	c0.16-2.61,2.33-4.67,4.98-4.67c11.1,0,20.76-7.5,23.49-18.23C48.17,26.23,50.64,24.65,53.18,25.06z"
                    opacity=".15"
                  />
                  <path
                    fill="#fff"
                    d="M47.76,13.59c-0.54,2.18-2.51,3.79-4.85,3.79c-1.94,0-3.73,1.04-4.68,2.72	c-0.47,0.82-0.7,1.71-0.7,2.65c0,0.27,0.03,0.57,0.11,0.97c0.27,1.49-0.15,3.01-1.13,4.16c-0.95,1.1-2.34,1.74-3.79,1.74h-0.15	c-6.63-0.2-13.11-2.62-18.24-6.81c-2.13-1.75-2.45-4.9-0.7-7.04c0.11-0.14,0.23-0.27,0.35-0.39c4.05,5.06,10.78,9,18.74,9.24	c-0.11-0.61-0.19-1.23-0.19-1.87c0-1.85,0.49-3.6,1.35-5.11c1.77-3.14,5.15-5.26,9.03-5.26C44.66,12.38,46.32,12.82,47.76,13.59z"
                    opacity=".3"
                  />
                  <path
                    fill="#fff"
                    d="M37.53,24.25c-0.829,0-1.5-0.671-1.5-1.5c0-1.214,0.302-2.356,0.898-3.396	c1.21-2.14,3.504-3.474,5.981-3.474c0.829,0,1.5,0.671,1.5,1.5s-0.671,1.5-1.5,1.5c-1.398,0-2.691,0.75-3.375,1.958	c-0.341,0.596-0.505,1.218-0.505,1.912C39.03,23.579,38.359,24.25,37.53,24.25z"
                  />
                </svg>
              </Fab>
            </TwitterShareButton>

            <CustomDevToButton url={`https://inleo.io/publish`}>
              <Fab
                title="hive"
                style={{
                  position: "absolute",
                  bottom: "13rem",
                  right: "4rem",
                  backgroundColor: "black",
                }}
                aria-label="hive"
              >
                <img style={{ width: "3rem" }} src="./hive.png" alt="hive" />
              </Fab>
            </CustomDevToButton>

            <FacebookShareButton url={articleUrl} quote={articleTitle}>
              <Fab
                title="facebook"
                size="small"
                style={{
                  position: "absolute",
                  bottom: "11rem",
                  right: "8rem",
                }}
                aria-label="facebook"
              >
                <img
                  style={{ width: "3rem" }}
                  src="./facebook.jpg"
                  alt="facebook"
                />
              </Fab>
            </FacebookShareButton>
            <CustomDevToButton url={`https://dev.to/new`}>
              <Fab
                title="dev"
                style={{
                  position: "absolute",
                  bottom: "8rem",
                  right: "11rem",
                  backgroundColor: "white",
                }}
                color="primary"
                aria-label="dev"
              >
                <img style={{ width: "3rem" }} src="./dev.png" alt="dev" />
              </Fab>
            </CustomDevToButton>

            <CustomDevToButton url={`https://www.publish0x.com/newpost`}>
              <Fab
                title="publishox"
                style={{
                  position: "absolute",
                  bottom: "4rem",
                  right: "14rem",
                  backgroundColor: "white",
                }}
                color="primary"
                aria-label="publishox"
              >
                <img
                  style={{ width: "3rem" }}
                  src="./publishox.png"
                  alt="steeemit"
                />
              </Fab>
            </CustomDevToButton>
          </div>
        )}
      </div>
    </>
  );
}
