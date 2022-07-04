import userEvent from "@testing-library/user-event";
import { testWrapperFactory } from "../../utils/test-utils";
import beerMock from "../../utils/__mocks__/beerMock";
import LiteBeerCard from "./LiteBeerCard";

import isElementTextEllipsed from "../../utils/isElementTextEllipsed";

const mockedIsElementTextEllipsed = isElementTextEllipsed as jest.Mock<any>;

jest.mock("../../utils/isElementTextEllipsed");

describe("Given a LiteBeerCard component", () => {
  describe("When rendering", () => {
    test("Then should print beer name & description", async () => {
      const { findByText } = testWrapperFactory(
        <LiteBeerCard beer={beerMock} />,
      );

      await findByText(beerMock.name);
      await findByText(beerMock.description);
    });
  });

  describe("When it DOES NOT have an ellipsed description", () => {
    test("Then should not render the read more button", () => {
      mockedIsElementTextEllipsed.mockReturnValue(false);

      const { queryByText } = testWrapperFactory(
        <LiteBeerCard beer={beerMock} />,
      );

      expect(queryByText("Read more")).not.toBeInTheDocument();
    });
  });

  describe("When it has an ellipsed description", () => {
    test("Then should render the Read more button", async () => {
      mockedIsElementTextEllipsed.mockReturnValue(true);

      const { findByText } = testWrapperFactory(
        <LiteBeerCard beer={beerMock} />,
      );

      await findByText("Read more");
    });

    describe("And user clicks on Read More button", () => {
      test("Then should display the Read less button", async () => {
        mockedIsElementTextEllipsed.mockReturnValue(true);

        const { findByText } = testWrapperFactory(
          <LiteBeerCard beer={beerMock} />,
        );

        userEvent.click(await findByText("Read more"));

        await findByText("Read less");
      });
    });
  });
});
