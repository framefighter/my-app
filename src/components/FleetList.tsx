import { Adjust } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { grey, orange } from "@mui/material/colors";
import React, { useContext } from "react";
import { Context } from "../state/Store";
import { getRobotStateColor } from '../style/color';
import { ActionType } from "../types/state";

function FleetList() {
  const { state, dispatch } = useContext(Context);
  const robotFleet = state.robotFleet;
  const selectedRobot = state.selectedRobot;
  return (
    <List>
      {Object.entries(robotFleet || {}).map(([key, info]) => (
        <ListItem
          button
          key={key}
          onClick={() => {
            dispatch({
              type: ActionType.SELECT_ROBOT,
              payload: { id: info.id },
            });
          }}
          sx={{
            "&:hover": {
              backgroundColor: orange[100],
            },
            borderRadius: "5px",
            backgroundColor:
              selectedRobot === info.id ? orange[50] : "transparent",
          }}
        >
          <ListItemIcon>
            <Adjust
              sx={{
                color: getRobotStateColor(info.robotState),
              }}
            />
          </ListItemIcon>
          <ListItemText primary={info.name} secondary={info.robotState} />
        </ListItem>
      ))}
    </List>
  );
}

export default FleetList;
