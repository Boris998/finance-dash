import { useMemo } from "react";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/navbar";
import Dashboard from "./pages/dashboard";
import Predictions from '@/pages/predictions';

const App = () => {
  const theme = useMemo(() => createTheme(themeSettings), [themeSettings]);
  console.log(theme);
  return (
    <div className=".app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> 
          <Box width='100%' padding='1rem 2rem 4rem 2rem'>
            <Navbar/>
            <Routes>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/predictions" element={<Predictions/>}/>
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
