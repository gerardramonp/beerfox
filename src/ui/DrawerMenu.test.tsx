import userEvent from "@testing-library/user-event";
import { testWrapperFactory } from "../utils/test-utils";
import DrawerMenu from "./DrawerMenu";

describe("Given a DrawerMenu component", () => {
  test("Then should render", async () => {
    const { findByText } = testWrapperFactory(<DrawerMenu />);

    await findByText("Settings");
  });

  describe("When user clicks on dark mode switch", () => {
    test("Then should switch the app theme to dark theme", async () => {
      const { findByTestId, findByText } = testWrapperFactory(<DrawerMenu />);

      const dtSwitch = await findByTestId("dark-theme-switch");

      await userEvent.click(dtSwitch);

      const settingsHeader = await findByText("Settings");

      expect(settingsHeader).toHaveStyle("background-color:asd");
    });
  });
});
