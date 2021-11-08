import { blue, green, grey, orange, red } from '@mui/material/colors';
import { RobotState, ShopItemType } from '../types/robots';

export function getRobotStateColor(state: RobotState): string {
    switch (state) {
        case RobotState.IDLE:
            return grey[500];
        case RobotState.DRIVING:
            return blue[500];
        case RobotState.CHARGING:
            return green[500];
        case RobotState.ERROR:
            return red[500];
        case RobotState.INSPECTING:
            return orange[500];
        default:
            return 'black';
    }
}

export function getShopItemColor(shopItem: ShopItemType): string {
    switch (shopItem) {
        case ShopItemType.BATTERY_CAPACITY:
            return green[800];
        case ShopItemType.CHARGING_SPEED:
            return green[500];
        case ShopItemType.SENSOR_CAPACITY:
            return orange[500];
        case ShopItemType.DRIVING_SPEED:
            return blue[500];
        default:
            return 'black';
    }
}