import { testWrapperFactory } from "../utils/test-utils";
import MainLayout from "./MainLayout";

describe("Given a MainLayout component", () => {
  describe("When rendering", () => {
    test("Then should display app title", async () => {
      const { findByText } = testWrapperFactory(
        <MainLayout>
          <span>content</span>
        </MainLayout>,
      );

      expect(await findByText("Beerfox")).toBeInTheDocument();
    });

    test("Then should display the children components", async () => {
      const { findByText } = testWrapperFactory(
        <MainLayout>
          <span>content</span>
        </MainLayout>,
      );

      expect(await findByText("content")).toBeInTheDocument();
    });
  });
});
