import React from "react";
import PropertiesPanel from "./components/PropertiesPanel";
import { Box } from "@mui/material";
import World from "./components/World";

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <PropertiesPanel />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <World />
      </Box>
    </Box>
  );
}

export default App;
