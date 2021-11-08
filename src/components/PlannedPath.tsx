import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useContext } from "react";
import { Context, ROBOT_MARKER_OFFSET } from "../state/Store";
import { moveStrokeOffsetKeyframe } from "../style/keyframes";
import { angleBetweenPoints, euclidDistance } from "../utils/math";
import { AnimationBuilder, TransformBuilder } from "../utils/builders";

interface PlannedPathProps {
  robotId: string;
}

function PlannedPath({ robotId }: PlannedPathProps) {
  const { state } = useContext(Context);
  const robot = state.robotFleet[robotId];
  if (!robot) {
    return <></>;
  }
  const { position, desiredPosition } = robot;
  const distance = euclidDistance(position, desiredPosition);
  if (distance < 0.01) {
    console.log("robot is at desired position", robotId);
    return null;
  }
  console.log("robot is not at desired position", robotId);
  const animationCurve = "linear";
  const movementDuration = distance / 100;

  return (
    <Box
      sx={{
        position: "fixed",
        width: distance,
        transform: new TransformBuilder()
          .translate(ROBOT_MARKER_OFFSET)
          .translateP(desiredPosition)
          .rotate(angleBetweenPoints(desiredPosition, position))
          .build(),
        transformOrigin: `0% 0%`,
        border: `2px dashed ${grey[300]}`,
        animation: new AnimationBuilder()
          .keyframe(moveStrokeOffsetKeyframe(distance))
          .duration(movementDuration)
          .timingFunction(animationCurve)
          .alternate()
          .forwards()
          .build(),
      }}
    ></Box>
  );
}

export default PlannedPath;
