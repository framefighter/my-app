import { Adjust } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
} from "@mui/material";
import React, { useContext } from "react";
import { Context } from "../state/Store";
import {
  InspectionPoint,
  RobotFleet,
  RobotInfo,
  Shop,
  ShopItemType,
} from "../types/robots";
import { Action, ActionType } from "../types/state";
import { PropertiesTab } from "../types/ui";
import FleetList from "./FleetList";
import ShopList from "./ShopList";

export const DRAWER_WIDTH = 300;

function createTestShopItem(): Shop {
  let arr = [];
  for (let el in ShopItemType) {
    arr.push((ShopItemType as any)[el]);
  }
  let randInt = Math.floor(Math.random() * arr.length);
  let randItem = arr[randInt];
  const value = Math.floor(Math.random() * 10);
  return {
    id: Math.random().toString(),
    name: "Test " + randItem,
    description: "Test " + randItem + " " + value,
    price: Math.floor(Math.random() * 1000),
    type: randItem as ShopItemType,
    value,
  };
}

function getRobotInfoList(robotInfo: RobotInfo) {
  return (
    <List>
      {Object.entries(robotInfo || {}).map(([key, value]) => (
        <ListItem button key={key}>
          {/* <ListItemIcon></ListItemIcon> */}
          <ListItemText primary={JSON.stringify(value)} secondary={key} />
        </ListItem>
      ))}
    </List>
  );
}

function getInspectionInfoList(inspectionPoint: InspectionPoint) {
  return (
    <List>
      {Object.entries(inspectionPoint || {}).map(([key, value]) => (
        <ListItem button key={key}>
          {/* <ListItemIcon></ListItemIcon> */}
          <ListItemText primary={value} secondary={key} />
        </ListItem>
      ))}
    </List>
  );
}

function PropertiesPanel() {
  const { state, dispatch } = useContext(Context);
  const tab = state.propertiesTabValue || PropertiesTab.FLEET;
  const selectedRobot = state.robotFleet[state.selectedRobot || "-1"];
  const selectedInspection =
    state.inspectionPoints[state.selectedInspection || "-1"];
  const tabs = [];
  for (const tabId in PropertiesTab) {
    const tabStr = (PropertiesTab as any)[tabId];
    tabs.push(<Tab key={tabStr} label={tabStr} value={tabStr} />);
  }
  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    dispatch({
      type: ActionType.CHANGE_TAB,
      payload: { tabValue: newValue },
    });
  };

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
    >
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabs}
          </TabList>
        </Box>
        <TabPanel value={PropertiesTab.FLEET}>
          <FleetList />
        </TabPanel>
        <TabPanel value={PropertiesTab.ROBOT}>
          {getRobotInfoList(selectedRobot)}
        </TabPanel>
        <TabPanel value={PropertiesTab.INSPECTION}>
          {getInspectionInfoList(selectedInspection)}
        </TabPanel>
        <TabPanel value={PropertiesTab.SHOP}>
          <ShopList
            shops={new Array(10).fill(0).map(() => createTestShopItem())}
          />
        </TabPanel>
      </TabContext>
    </Drawer>
  );
}

export default PropertiesPanel;
