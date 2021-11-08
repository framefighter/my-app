import { Box } from "@mui/material";
import React, { useCallback, useContext, useRef, useState } from "react";
import { Context, ROBOT_MARKER_OFFSET } from "../state/Store";
import { ActionType } from "../types/state";
import InspectionMarker from "./InspectionMarker";
import { DRAWER_WIDTH } from "./PropertiesPanel";
import RobotMarker from "./RobotMarker";

export const useCounter = (maxTime: number) => {
  const [count, setCount] = useState(0);

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const animate = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;

        // Pass on a function to the setter of the state
        // to make sure we always have the latest state
        if (deltaTime * 0.1 > maxTime) {
          setCount((prevCount) => prevCount + deltaTime * 0.1);
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [maxTime]
  );

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]); // Make sure the effect runs only once

  return count;
};

function World() {
  const { state, dispatch } = useContext(Context);
  const selectedRobotRef = useRef(null);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
      onClick={(e) => {
        console.log(selectedRobotRef)
        dispatch({
          type: ActionType.MOVE_ROBOT,
          payload: {
            id: state.selectedRobot,
            position: [
              e.clientX - DRAWER_WIDTH - ROBOT_MARKER_OFFSET,
              e.clientY - ROBOT_MARKER_OFFSET,
            ],
          },
        });
      }}
    >
      {Object.entries(state.robotFleet).map(([id, robot], index) => (
        <RobotMarker
          key={index}
          id={"robot-" + id}
          robotId={id}
        />
      ))}
      {Object.entries(state.inspectionPoints).map(
        ([id, inspectionPoint], index) => (
          <InspectionMarker key={index} id={id} />
        )
      )}
    </Box>
  );
}

export default World;
