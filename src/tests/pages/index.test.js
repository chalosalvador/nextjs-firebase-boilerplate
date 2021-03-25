import { render as customRender, screen } from "../test-utils";
import { render } from "@testing-library/react";

import HomePage from "../../pages";
import { AuthContext } from "../../lib/auth";

import { useRouter } from "next/router";
import Routes from "../../constants/routes";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

// todo: a better way to mock the provider??
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

describe("HomePage", () => {
  it("shows Loading while getting user data", () => {
    const { container } = render(
      <AuthContext.Provider value={{ user: null }}>
        <HomePage articles={[]} />
      </AuthContext.Provider>
    );
    expect(container.firstChild).toHaveClass("spinner");
  });

  it("redirects to login when no logged in", () => {
    // this is the complete mock, but we could mock only the methods needed
    const mockRouter = {
      basePath: "",
      pathname: "/",
      route: "/",
      asPath: "/",
      query: {},
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
    useRouter.mockReturnValue(mockRouter);
    const { container } = render(
      <AuthContext.Provider value={{ user: false }}>
        <HomePage articles={[]} />
      </AuthContext.Provider>
    );
    expect(mockRouter.push).toHaveBeenCalledWith(Routes.LOGIN);
    // expect(screen.getByText("Welcome to Next.js!")).toBeInTheDocument();
  });

  it("renders successfully", () => {
    customRender(<HomePage articles={[]} />);
    expect(screen.getByText("Welcome to Next.js!")).toBeInTheDocument();
  });
});
