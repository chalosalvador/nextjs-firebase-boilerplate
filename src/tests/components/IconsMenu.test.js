import { render as customRender, screen, fireEvent } from "../test-utils";
import { render } from "@testing-library/react";
import IconsMenu from "../../components/IconsMenu";

import { AuthContext } from "../../lib/auth";
import HomePage from "../../pages";

// const providerData = {
//   user: {
//     created_at: "2021-02-07T00:22:58.000000Z",
//     editorial: "Edificio",
//     email: "chalosalvador@gmail.com",
//     id: 13,
//     name: "Chalo Salvador Pesantes",
//     short_bio: "Hola cómo estás tú qué tal estás bien",
//     updated_at: "2021-02-07T00:22:58.000000Z",
//   },
//   login: jest.fn(),
//   logout: jest.fn(),
//   register: jest.fn(),
// };

describe("IconsMenu", () => {
  it("shows the login button when user is not logged in", () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <IconsMenu articles={[]} />
      </AuthContext.Provider>
    );

    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("shows the current user name", () => {
    customRender(<IconsMenu />);
    expect(screen.getByText("Chalo Salvador Pesantes")).toBeInTheDocument();
  });

  it("opens the menu account", () => {
    const { container } = customRender(<IconsMenu />);
    const accountMenuButton = container.querySelector("#account-menu-button");
    expect(accountMenuButton).toBeInTheDocument();

    const accountMenu = document.querySelector("#account-menu");
    expect(accountMenu).not.toBeVisible();

    fireEvent.click(accountMenuButton);
    expect(accountMenu).toBeVisible();

    const accountMenuItem = accountMenu.querySelector("li:first-child");
    fireEvent.click(accountMenuItem);
    expect(accountMenu).toHaveAttribute("aria-hidden", "true");
  });

  it("opens the mobile account menu", () => {
    const { container } = customRender(<IconsMenu />);
    const mobileAccountMenuButton = container.querySelector(
      "#mobile-account-menu-button"
    );
    expect(mobileAccountMenuButton).toBeInTheDocument();

    const mobileAccountMenu = document.querySelector("#mobile-account-menu");
    expect(mobileAccountMenu).not.toBeVisible();

    fireEvent.click(mobileAccountMenuButton);
    expect(mobileAccountMenu).toBeVisible();

    const accountMenuItem = mobileAccountMenu.querySelector("li:first-child");
    fireEvent.click(accountMenuItem);
    expect(mobileAccountMenu).toHaveAttribute("aria-hidden", "true");
  });

  // todo should I test this?? I am already testing this scenario when the user is null...
  // it("shows the login button after the user logs out", () => {
  //   const { container } = customRender(<IconsMenu />);
  //   const accountMenuButton = container.querySelector("#account-menu-button");
  //   const accountMenu = document.querySelector("#account-menu");
  //   const logoutButton = accountMenu.querySelector("li:last-child");
  //
  //   console.log("logoutButton", logoutButton);
  //   fireEvent.click(logoutButton);
  //
  //   expect(accountMenuButton).toHaveTextContent("Iniciar sesión");
  // });
});
