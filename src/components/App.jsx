import React from "react";
import Timer from "./Timer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    root: {
      fontSize: "2.9rem",
    },
  },
  { name: "MuiSvgIcon" }
);

function App() {
  const classes = useStyles();
  return (
    <div>
      <Timer />
    </div>
  );
}

export default App;
