import * as React from "react";
import { Box, CircularProgress, Fab, keyframes, Tooltip } from "@mui/material";
import { green, grey, orange, red } from "@mui/material/colors";
import { Info } from "@mui/icons-material";
import { InspectionStatus } from "../types/robots";
import { Context } from "../state/Store";
import { ActionType } from "../types/state";
import {
  fadeInOutKeyframe,
  highLightSize,
  progressKeyframe,
} from "../style/keyframes";
import ProgressCircle from "./ProgressCircle";
import PulsatingCircle from "./PulsatingCircle";

interface InspectionMarkerProps {
  id: string;
}

function getInspectionColor(
  status: InspectionStatus,
  lighter: boolean = false
): string {
  const value = lighter ? 300 : 500;
  switch (status) {
    case InspectionStatus.DONE:
      return green[value];
    case InspectionStatus.IN_PROGRESS:
      return orange[value];
    case InspectionStatus.TODO:
      return grey[value];
    case InspectionStatus.ERROR:
      return red[value];
    case InspectionStatus.IDLE:
    default:
      return "white";
  }
}

function InspectionMarker({ id }: InspectionMarkerProps): JSX.Element {
  const { state, dispatch } = React.useContext(Context);
  const inspection = state.inspectionPoints[id];
  if (!inspection) {
    return <></>;
  }
  const selected = inspection.id === state.selectedInspection;
  const { status, progress, position, name } = inspection;
  return (
    <Box sx={{ m: 1, position: "fixed", top: position[1], left: position[0] }}>
      <Tooltip title={name} arrow>
        <Box
          sx={{
            width: "68px",
            height: "68px",
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
          onClick={() =>
            dispatch({
              type: ActionType.SELECT_INSPECTION,
              payload: { id },
            })
          }
        >
          <Info
            sx={{
              position: "absolute",
              color: selected ? orange[500] : grey[400],
              pointerEvents: "none",
            }}
          />
          <PulsatingCircle visible={selected} color={orange[500]} />
          <ProgressCircle
            color={getInspectionColor(status)}
            highLightColor={getInspectionColor(status, true)}
            progress={progress}
          />
        </Box>
      </Tooltip>
    </Box>
  );
}

export default InspectionMarker;
