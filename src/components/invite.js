import { Box, Button, FormControl, Modal } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export function InviteModal({
  inviteOpen,
  allowEdit,
  handleInviteSubmit,
  handleAllowEdit,
  setInviteOpen,
}) {
  return (
    <>
      <Modal
        open={inviteOpen}
        onClose={setInviteOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            style={{
              padding: "2rem",
              margin: "2rem",
              boxShadow: "1px 1px 2px 1px ",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <FormControl
              variant="filled"
              sx={{
                margin: "0.5rem",
                marginTop: "1rem",
                minWidth: 120,
              }}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Allow edit
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={allowEdit}
                onChange={handleAllowEdit}
              >
                <MenuItem value=""></MenuItem>
                <em>None</em>

                <MenuItem value={"yes"}>Yes</MenuItem>
                <MenuItem value={"no"}>NO</MenuItem>
              </Select>

              <Button
                onClick={handleInviteSubmit}
                variant="outlined"
                size="large"
                style={{ margin: "0.5rem" }}
              >
                continue
              </Button>
              <Button
                onClick={setInviteOpen}
                variant="outlined"
                size="large"
                style={{ margin: "0.5rem" }}
              >
                cancel
              </Button>
            </FormControl>
          </Box>
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
