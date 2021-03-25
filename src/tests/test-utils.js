import React, { createContext } from "react";
import { render } from "@testing-library/react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core/styles";
import { AuthContext } from "../lib/auth";

import theme from "../styles/theme";

const providerData = {
  user: {
    created_at: "2021-02-07T00:22:58.000000Z",
    editorial: "Edificio",
    email: "chalosalvador@gmail.com",
    id: 13,
    name: "Chalo Salvador Pesantes",
    short_bio: "Hola cómo estás tú qué tal estás bien",
    updated_at: "2021-02-07T00:22:58.000000Z",
  },
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
};

const AllTheProviders = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthContext.Provider value={providerData}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AuthContext.Provider>
    </SnackbarProvider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
