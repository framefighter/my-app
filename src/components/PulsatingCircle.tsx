import { Box } from "@mui/material";
import React from "react";
import { pulsatingKeyframe } from "../style/keyframes";
import { AnimationBuilder } from "../utils/builders";

interface PulsatingCircleProps {
  visible?: boolean;
  color?: string;
  size?: number;
}

function PulsatingCircle({
  visible = true,
  color = "black",
  size = 68,
}: PulsatingCircleProps) {
  if (!visible) {
    return null;
  }
  return (
    <Box
      sx={{
        bgcolor: color,
        position: "absolute",
        pointerEvents: "none",
        zIndex: -1,
        borderRadius: "100%",
        width: size,
        height: size,
        animation: new AnimationBuilder()
          .keyframe(pulsatingKeyframe)
          .duration(2)
          .infinite()
          .ease()
          .alternate()
          .build(),
      }}
    />
  );
}

export default PulsatingCircle;
