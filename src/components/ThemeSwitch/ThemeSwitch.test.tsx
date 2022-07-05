import { testWrapperFactory } from "../../utils/test-utils";
import ThemeSwitch from "./ThemeSwitch";

describe("Given a ThemeSwitch component", () => {
  test("Then should render", async () => {
    const { findByTestId } = testWrapperFactory(<ThemeSwitch />);

    await findByTestId("dark-theme-switch");
  });
});
