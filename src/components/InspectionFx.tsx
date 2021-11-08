import { KeyboardArrowUpRounded } from "@mui/icons-material";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import { pointingKeyframe } from "../style/keyframes";
import { AnimationBuilder } from "../utils/builders";

interface InspectionFxProps {
  visible?: boolean;
  color?: string;
  direction: number;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

function InspectionFx({
  direction,
  visible = true,
  color = "black",
  Icon = ArrowDropUpRoundedIcon,
}: InspectionFxProps) {
  if (!visible) {
    return null;
  }
  return (
    <Icon
      sx={{
        position: "absolute",
        color: color,
        animation: new AnimationBuilder()
          .keyframe(pointingKeyframe(direction))
          .duration(0.4)
          .infinite()
          .ease()
          .alternate()
          .build(),
        transition: "transform 0.5s",
      }}
    />
  );
}

export default InspectionFx;
