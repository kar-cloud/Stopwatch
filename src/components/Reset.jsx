import React from "react";
import RotateLeftOutlinedIcon from "@material-ui/icons/RotateLeftOutlined";
import Fab from "@material-ui/core/Fab";

function Reset(props) {
  return (
    <div class="tt">
      <Fab
        size="large"
        color="secondary"
        onClick={props.onReset}
        style={{ outline: "none" }}
      >
        <RotateLeftOutlinedIcon />
      </Fab>
    </div>
  );
}

export default Reset;
