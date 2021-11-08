import { Album, BatteryChargingFull, BatterySaver, FastForward, Sensors, ShoppingCart } from '@mui/icons-material';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ShopItemType } from '../types/robots';

export function getShopItemIcon(itemType: ShopItemType): OverridableComponent<SvgIconTypeMap<{}, "svg">> {
    switch (itemType) {
        case ShopItemType.DRIVING_SPEED:
            return FastForward;
        case ShopItemType.BATTERY_CAPACITY:
            return BatterySaver;
        case ShopItemType.CHARGING_SPEED:
            return BatteryChargingFull
        case ShopItemType.SENSOR_CAPACITY:
            return Sensors;
        case ShopItemType.WHEEL_TYPE:
            return Album;
        default:
            return ShoppingCart;
    }
}