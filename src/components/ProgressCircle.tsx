import { CircularProgress } from "@mui/material";
import React from "react";
import { highLightSize, progressKeyframe } from "../style/keyframes";
import { AnimationBuilder, Direction } from "../utils/builders";

export interface ProgressCircleProps {
  progress: number;
  color: string;
  highLightColor: string;
  direction?: Direction;
  size?: number;
  thickness?: number;
}

function ProgressCircle({
  color,
  highLightColor,
  progress,
  direction = "normal",
  size = 58,
  thickness = 8,
}: ProgressCircleProps) {
  return (
    <>
      <CircularProgress
        size={size}
        variant={"determinate"}
        value={progress}
        thickness={thickness}
        sx={{
          color: color,
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <CircularProgress
        size={size}
        variant={"determinate"}
        value={20}
        thickness={thickness / 3}
        sx={{
          color: highLightColor,
          position: "absolute",
          zIndex: 1,
          pointerEvents: "none",
          animation: new AnimationBuilder()
            .keyframe(progressKeyframe)
            .duration(3)
            .infinite()
            .easeInOut()
            .direction(direction)
            .build(),
        }}
      />
    </>
  );
}

export default ProgressCircle;
