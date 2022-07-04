import { testWrapperFactory } from "../../utils/test-utils";
import beerMock from "../../utils/__mocks__/beerMock";
import BeerCard from "./BeerCard";

describe("Given a BeerCard component", () => {
  describe("When recieving a beer by props", () => {
    test("Then should print beer name, and description", () => {
      const { getByText } = testWrapperFactory(<BeerCard beer={beerMock} />);

      getByText(beerMock.name);
      getByText(beerMock.description);
    });
  });
});
