import { InspectionPoint, InspectionPoints, RobotFleet, RobotInfo, RobotState } from './robots';

export interface Payload {
    robotInfo?: RobotInfo;
    inspectionInfo?: InspectionPoint;
    id?: string;
    tabValue?: string;
    position?: [number, number];
    robotField?: keyof RobotInfo;
    data?: any;
};

export interface Action {
    type: ActionType;
    payload: Payload;
}

export enum ActionType {
    SELECT_ROBOT,
    SELECT_INSPECTION,
    ADD_ROBOT,
    ADD_INSPECTION,
    CHANGE_TAB,
    MOVE_ROBOT,
    SET_ROBOT_FIELD,
}

export interface State {
    selectedRobot?: string;
    selectedInspection?: string;
    robotFleet: RobotFleet;
    inspectionPoints: InspectionPoints;
    propertiesTabValue?: string;
}

export function getRobotInfo(state: State, id: string): RobotInfo | undefined {
    return state.robotFleet[id];
}