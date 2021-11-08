import React, { useCallback, useContext } from "react";
import { Badge, Box, Tooltip } from "@mui/material";
import { green, grey, orange, red } from "@mui/material/colors";
import { RobotInfo, RobotState } from "../types/robots";
import { Context, ROBOT_MARKER_SIZE } from "../state/Store";
import { ActionType } from "../types/state";
import { KeyboardArrowUpRounded } from "@mui/icons-material";
import ProgressCircle from "./ProgressCircle";
import PulsatingCircle from "./PulsatingCircle";
import InspectionFx from "./InspectionFx";
import { moveToPositionKeyframe } from "../style/keyframes";
import CheckpointMarker from "./CheckpointMarker";
import PlannedPath from "./PlannedPath";
import { euclidDistance } from "../utils/math";
import { AnimationBuilder } from "../utils/builders";
import { getRobotStateColor } from '../style/color';

interface RobotMarkerProps {
  id: string;
  robotId: string;
}

function RobotMarker({ robotId, id }: RobotMarkerProps): JSX.Element {
  const { state, dispatch } = useContext(Context);

  const setRobotField = useCallback(
    (id: string, field: keyof RobotInfo, data: any) => {
      dispatch({
        type: ActionType.SET_ROBOT_FIELD,
        payload: {
          id,
          robotField: field,
          data,
        },
      });
    },
    [dispatch]
  );

  const selectRobot = useCallback(
    (id: string) => {
      dispatch({
        type: ActionType.SELECT_ROBOT,
        payload: {
          id: id,
        },
      });
    },
    [dispatch]
  );

  const robot = state.robotFleet[robotId];
  if (!robot) return <></>;
  const selected = state.selectedRobot === robot.id;
  const {
    position,
    desiredPosition,
    robotState,
    name,
    drivingDirection,
    inspectionDirection,
    batteryLevel,
  } = robot;
  const movementDuration = euclidDistance(position, desiredPosition) / 100;
  // dispatch({
  //   type: ActionType.MOVE_ROBOT,
  //   payload: {
  //     id: robot.id,
  //     position: [robot.position[0] + count, robot.position[1]],
  //   },
  // });
  const charging = robotState === RobotState.CHARGING;
  const animationCurve = "linear";
  return (
    <>
      <PlannedPath robotId={robotId} />
      <CheckpointMarker robotId={robotId} />
      <Box
        id={id}
        sx={{
          m: 1,
          position: "fixed",
          animation: new AnimationBuilder()
            .keyframe(moveToPositionKeyframe(position, desiredPosition))
            .duration(movementDuration)
            .timingFunction(animationCurve)
            .once()
            .both()
            .build(),
        }}
        onAnimationEnd={() => {
          setRobotField(robot.id, "desiredPosition", desiredPosition);
          setRobotField(robot.id, "robotState", RobotState.INSPECTING);
        }}
      >
        <Tooltip title={name} arrow>
          <Box
            sx={{
              width: ROBOT_MARKER_SIZE,
              height: ROBOT_MARKER_SIZE,
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
            onClick={(e) => {
              e.stopPropagation();
              selectRobot(robotId);
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
            />
            <PulsatingCircle visible={selected} color={orange[500]} />
            <InspectionFx
              direction={drivingDirection}
              visible={robotState === RobotState.DRIVING}
            />
            <InspectionFx
              direction={inspectionDirection}
              visible={robotState === RobotState.INSPECTING}
              color={grey[800]}
              Icon={KeyboardArrowUpRounded}
            />
            <PulsatingCircle
              visible={robotState === RobotState.ERROR}
              color={red[500]}
            />
            <ProgressCircle
              color={green[300]}
              highLightColor={green[200]}
              progress={batteryLevel}
              direction={charging ? "normal" : "reverse"}
            />
          </Box>
        </Tooltip>
      </Box>
    </>
  );
}

export default RobotMarker;
