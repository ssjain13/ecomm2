import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/griffy";
import "@fontsource/buenard";
import "@fontsource/copse";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter , HashRouter} from "react-router-dom";
import { AdminPage } from "./pages/AdminPage";
import { Route, Routes } from "react-router";
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: `'Griffy'`,
    body: `'Buenard'`,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </HashRouter>
);
