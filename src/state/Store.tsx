import React, { createContext, useReducer } from "react";
import {
  InspectionStatus,
  makeGroundRobot,
  Quality,
  RobotAutonomyLevel,
  RobotGroundType,
  RobotState,
} from "../types/robots";
import { Action, State } from "../types/state";
import Reducer from "./Reducer";

function createCompleteRobot(id: string, pos: [number, number]) {
  return {
    id,
    name: "Robot " + id,
    description: `Robot ${id} description`,
    autonomyLevel: RobotAutonomyLevel.MANUAL,
    status: RobotState.DRIVING,
    robotModel: `Robot ${id} model`,
    robotType: makeGroundRobot(RobotGroundType.TRACKS),
    batteryLevel: 70,
    chargingSpeed: 10,
    drivingSpeed: 10,
    drivingDirection: 2,
    turningSpeed: 10,
    inspectionDirection: 0.9,
    sensorCapacity: 10,
    sensors: [],
    quality: Quality.GOOD,

    position: pos,
    desiredPosition: pos,
    rotation: 0,
  };
}

const robotFleet = Array.from(Array(10).keys())
  .map((i) => {
    return { i, obj: createCompleteRobot(i.toString(), [i * 100, i * 100]) };
  })
  .reduce((o, { i, obj }) => Object.assign(o, { [i]: obj }), {});

const initialState: State = {
  robotFleet,
  inspectionPoints: {
    "1": {
      id: "1",
      name: "Inspection 1",
      description: "Inspection 1 description",
      status: InspectionStatus.IN_PROGRESS,
      progress: 20,

      position: [600, 800],
      rotation: 0,
    },
  },
};

const Store = ({ children }: any) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const Context = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });
export default Store;

export const ROBOT_MARKER_SIZE = 68;
export const ROBOT_MARKER_OFFSET = ROBOT_MARKER_SIZE / 2 + 6;
