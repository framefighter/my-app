import { RobotInfo, RobotState } from '../types/robots';
import { Action, ActionType, State } from '../types/state';
import { PropertiesTab } from '../types/ui';
import { angleBetweenPoints, euclidDistance, getTranslateValues } from '../utils/math';

function Reducer(state: State, action: Action): State {
    console.log(action);
    switch (action.type) {
        case ActionType.SELECT_ROBOT:
            const isSelected = state.selectedRobot === action.payload?.id;
            return {
                ...state,
                selectedRobot: isSelected ? undefined : action.payload?.id,
                propertiesTabValue: isSelected ? state.propertiesTabValue : PropertiesTab.ROBOT,
            };
        case ActionType.SELECT_INSPECTION:
            const isSelectedI = state.selectedInspection === action.payload?.id;
            return {
                ...state,
                selectedInspection: isSelectedI ? undefined : action.payload?.id,
                propertiesTabValue: isSelectedI ? state.propertiesTabValue : PropertiesTab.INSPECTION,
            };
        case ActionType.CHANGE_TAB:
            return {
                ...state,
                propertiesTabValue: action.payload?.tabValue
            }
        case ActionType.MOVE_ROBOT:
            return moveRobot(state, action);
        case ActionType.SET_ROBOT_FIELD:
            return updateRobotField(state, action.payload?.id, action.payload?.robotField, action.payload?.data);
        default:
            return state;
    };
}

function updateRobotField(state: State, id?: string, field?: keyof RobotInfo, value?: any) {
    if (!id || !field || !value) {
        return state;
    }
    const robot = state.robotFleet?.[id];
    if (!robot) {
        return state;
    }
    return {
        ...state,
        robotFleet: {
            ...state.robotFleet,
            [id]: {
                ...robot,
                [field]: value
            }
        }
    }
}

function moveRobot(state: State, action: Action): State {
    let robotId = action.payload?.id;
    if (!robotId) {
        return state;
    }
    let position = state.robotFleet[robotId]?.position;
    let otherDesiredPosition = state.robotFleet[robotId]?.desiredPosition;
    let desiredPosition = action.payload?.position;
    if (!position || !desiredPosition) {
        return state;
    }
    let distance = euclidDistance(position, otherDesiredPosition);
    let newState = state
    if (distance > 0) {
        const someElement = document.getElementById("robot-" + robotId);
        if (someElement) {
            let transform = getTranslateValues(someElement);
            position = transform;
            newState = updateRobotField(state, robotId, "position", transform);
        }
    }
    newState = updateRobotField(newState,
        robotId,
        "drivingDirection",
        angleBetweenPoints(position, desiredPosition));
    newState = updateRobotField(newState,
        robotId,
        "robotState",
        RobotState.DRIVING);
    return updateRobotField(newState, robotId, "desiredPosition", desiredPosition);
}

export default Reducer;