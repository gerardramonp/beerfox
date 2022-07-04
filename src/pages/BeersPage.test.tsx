import { testWrapperFactory } from "../utils/test-utils";
import BeersPage from "./BeersPage";

describe("Given a BeersPage component", () => {
  test("Then should render without crashing", () => {
    const screen = testWrapperFactory(<BeersPage />);

    expect(screen).toBeTruthy();
  });
});
