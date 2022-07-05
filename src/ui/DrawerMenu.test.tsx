import { testWrapperFactory } from "../utils/test-utils";
import DrawerMenu from "./DrawerMenu";

describe("Given a DrawerMenu component", () => {
  test("Then should render", async () => {
    const { findByText } = testWrapperFactory(<DrawerMenu />);

    await findByText("Settings");
  });
});
