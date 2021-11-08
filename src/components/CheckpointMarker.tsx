import { Flag } from "@mui/icons-material";
import { Badge, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import {
  Context,
  ROBOT_MARKER_OFFSET,
  ROBOT_MARKER_SIZE,
} from "../state/Store";
import { getRobotStateColor } from '../style/color';
import { TransformBuilder } from "../utils/builders";

interface CheckpointMarkerProps {
  robotId: string;
  visible?: boolean;
}

function CheckpointMarker({ visible = true, robotId }: CheckpointMarkerProps) {
  const { state } = useContext(Context);
  const robot = state.robotFleet[robotId];
  if (!robot) return <></>;
  const { desiredPosition, robotState } = robot;

  if (!visible) {
    return null;
  }
  return (
    <Box
      sx={{
        position: "fixed",
        transform: new TransformBuilder()
          .translate(ROBOT_MARKER_OFFSET - ROBOT_MARKER_SIZE / 4)
          .translateP(desiredPosition)
          .build(),
      }}
    >
      <Box
        sx={{
          width: ROBOT_MARKER_SIZE / 2,
          height: ROBOT_MARKER_SIZE / 2,
          borderRadius: "100%",
          bgcolor: grey[900],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
            bgcolor: "black",
          },
        }}
      >
        <Badge
          badgeContent={robotId}
          sx={{
            "& .MuiBadge-badge": {
              color: "white",
              backgroundColor: getRobotStateColor(robotState),
            },
          }}
        >
          <Flag sx={{ color: grey[100] }} />
        </Badge>
      </Box>
    </Box>
  );
}

export default CheckpointMarker;
