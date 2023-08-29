import { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [count, setCount] = useState(0);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 768,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <BrowserRouter>
           <Navbar></Navbar>
          <Routes>
            <Route exact path="/chat" element={<Chatbot></Chatbot>}></Route>
          </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
