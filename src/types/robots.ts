export interface RobotType {
    robotGroundType: RobotGroundType,
    robotAirType: RobotAirType,
    robotWaterType: RobotWaterType,
}



export enum RobotGroundType {
    WHEELS = 'Wheels',
    TRACKS = 'Tracks',
    LEGS = 'Legs',
    NONE = 'None',
}

export enum RobotAirType {
    DRONE = 'Drone',
    PLANE = 'Plane',
    NONE = 'None',
}

export enum RobotWaterType {
    SWIM = 'Swim',
    DIVE = 'Dive',
    NONE = 'None',
}

export enum RobotState {
    IDLE = "Idle",
    CHARGING = "Charging",
    DRIVING = "Driving",
    INSPECTING = "Inspecting",
    ERROR = "Error",
}

export enum InspectionStatus {
    IDLE = "Idle",
    TODO = "ToDo",
    IN_PROGRESS = "In Progress",
    DONE = "Done",
    ERROR = "Error",
}


export enum RobotAutonomyLevel {
    MANUAL = "Manual",
    TEACH_AND_REPEAT = "Teach and Repeat",
    CLICK_AND_INSPECT = "Click and Inspect",
    SENTIENT = "Sentient",
}

export interface RobotFleet {
    [key: string]: RobotInfo;
}

export interface RobotInfo {

    // STATIC DATA

    id: string;
    name: string;
    description?: string;
    robotType: RobotType,
    robotModel: string,

    // UPGRADABLE DATA

    quality: Quality,
    autonomyLevel: RobotAutonomyLevel,
    sensors: SensorInfo[],
    sensorCapacity: number,

    maxChargingSpeed: number,
    maxDrivingSpeed: number,
    maxTurningSpeed: number,
    maxBatteryLevel: number,

    // LIVE DATA

    position: [number, number],

    desiredPosition: [number, number],

    rotation: number,
    chargingSpeed: number,
    drivingSpeed: number,
    turningSpeed: number,
    batteryLevel: number,
    drivingDirection: number,
    inspectionDirection: number,
    robotState: RobotState,
}

export interface SensorInfo {
    id: string;
    name: string;
    description?: string;
    sensorType: SensorType;
    quality: Quality;
    measurementSpeed: number;
    transmissionSpeed: number;
}

export enum SensorType {
    CAMERA_HD = "HD Camera",
    CAMERA_SD = "SD Camera",
    CAMERA_4K = "4K Camera",
    CAMERA_ZOOM = "Zoom Camera",
    CAMERA_DEPTH = "Depth Camera",
    CAMERA_360 = "360° Camera",
    CAMERA_VIDEO = "Video Camera",
    SONAR = "Sonar",
    GPS = "GPS",
    COMPASS = "Compass",
    ACCELEROMETER = "Accelerometer",
    GYROSCOPE = "Gyroscope",
    BAROMETER = "Barometer",
    TEMPERATURE = "Temperature",
    HUMIDITY = "Humidity",
    LIGHT = "Light",
    SOUND = "Sound",
    VIBRATION = "Vibration",
    MAGNETOMETER = "Magnetometer",
    INFRARED = "Infrared",
    PROXIMITY = "Proximity",
    PRESSURE = "Pressure",
    RADAR = "Radar",
    THERMAL_IMAGING = "Thermal Imaging",
    LASER_SCANNER = "Laser Scanner",
    GAS_SENSOR = "Gas Sensor",
}

export enum Quality {
    PERFECT = "Perfect",
    VERY_GOOD = "Very Good",
    GOOD = "Good",
    FAIR = "Fair",
    POOR = "Poor",
    BROKEN = "Broken",
}

export interface InspectionPoint {
    id: string;
    name: string;
    description?: string;
    status: InspectionStatus,
    progress: number,

    position: [number, number],
    rotation: number,
}

export interface InspectionPoints {
    [key: string]: InspectionPoint;
}

export function makeGroundRobot(type: RobotGroundType): RobotType {
    return {
        robotGroundType: type,
        robotAirType: RobotAirType.NONE,
        robotWaterType: RobotWaterType.NONE,
    }
}

export function makeAirRobot(type: RobotAirType): RobotType {
    return {
        robotGroundType: RobotGroundType.NONE,
        robotAirType: type,
        robotWaterType: RobotWaterType.NONE,
    }
}

export function makeWaterRobot(type: RobotWaterType): RobotType {
    return {
        robotGroundType: RobotGroundType.NONE,
        robotAirType: RobotAirType.NONE,
        robotWaterType: type,
    }
}

export interface Shop {
    id: string;
    name: string;
    description?: string;
    type: ShopItemType;
    value?: any
    price: number;
}

export enum ShopItemType {
    DRIVING_SPEED = "Driving Speed",
    CHARGING_SPEED = "Charging Speed",
    BATTERY_CAPACITY = "Battery Capacity",
    SENSOR_CAPACITY = "Sensor Capacity",
    // SENSOR_MEASUREMENT_SPEED = "Sensor Measurement Speed",
    // SENSOR_TRANSMISSION_SPEED = "Sensor Transmission Speed",
    // SENSOR_QUALITY = "Sensor Quality",
    WHEEL_TYPE = "Wheel Type",
}