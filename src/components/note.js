import PushPinIcon from "@mui/icons-material/PushPin";
import RsvpIcon from "@mui/icons-material/Rsvp";
import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import * as React from "react";
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

import { Stack } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function Note({
  onTitleChange,
  title,
  onNoteChange,
  note,
  handleClick,
  handleChange,
  value,
  sortTab,
  tab,
  handleDelete,
  handleEdit,
  handlePin,
}) {
  return (
    <>
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
                      <Item>
                        {l.note}
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
          ))}
        </Box>
      </Box>
    </>
  );
}
