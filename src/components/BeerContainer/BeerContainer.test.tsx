import userEvent from "@testing-library/user-event";
import BeerContainer from "./BeerContainer";
import useGetRandomBeerQuery from "../../queries/useGetRandomBeerQuery";
import useGetNonAlcoholicBeersQuery from "../../queries/useGetNonAlcoholicBeersQuery";
import {
  queryResponseFactory,
  testWrapperFactory,
} from "../../utils/test-utils";

const mockedUseGetRandomBeerQuery = useGetRandomBeerQuery as jest.Mock<any>;
const mockedUseGetNonAlcoholicBeersQuery =
  useGetNonAlcoholicBeersQuery as jest.Mock<any>;

jest.mock("../../queries/useGetRandomBeerQuery");
jest.mock("../../queries/useGetNonAlcoholicBeersQuery");

describe("Given a BeerContainer component", () => {
  const mockBeer = {
    name: "myBeer",
    description: "beer description",
    image_url: "someImage",
    id: 1,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When the randomBeerQuery is loading", () => {
    test("Then should show the loading skeleton", () => {
      mockedUseGetRandomBeerQuery.mockImplementation(() =>
        queryResponseFactory(),
      );

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() =>
        queryResponseFactory(),
      );

      const { getByTestId } = testWrapperFactory(<BeerContainer />);

      getByTestId("beer-name-loading-skeleton");
    });
  });

  describe("When the randomBeerQuery isError is true", () => {
    test("Then should display an error message", () => {
      mockedUseGetRandomBeerQuery.mockImplementation(() =>
        queryResponseFactory(false, true),
      );

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() =>
        queryResponseFactory(false, false),
      );

      const { getByText } = testWrapperFactory(<BeerContainer />);

      getByText("There has been an error. Please try again.");
    });
  });

  describe("When the query returns a valid beer", () => {
    test("Then should print the beer name and description", async () => {
      mockedUseGetRandomBeerQuery.mockImplementation(() =>
        queryResponseFactory(false, false, mockBeer),
      );

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() =>
        queryResponseFactory(false, false),
      );

      const { findByText } = testWrapperFactory(<BeerContainer />);

      await findByText(mockBeer.name);
      await findByText(mockBeer.description);
    });
  });

  describe("When user clicks the Another Beer button", () => {
    test("Then should call useGetRandomBeerQuer.refetch function", () => {
      const refetchMock = jest.fn();

      mockedUseGetRandomBeerQuery.mockImplementation(() =>
        queryResponseFactory(false, false, mockBeer, refetchMock),
      );

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() =>
        queryResponseFactory(false, false),
      );

      const { getByText } = testWrapperFactory(<BeerContainer />);

      const beerButton = getByText("Another Beer");

      userEvent.click(beerButton);

      expect(refetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("When user clicks the Random non alcoholic beer button", () => {
    describe("And there are beers to show", () => {
      test("Then should switch the beer", () => {
        mockedUseGetRandomBeerQuery.mockImplementation(() =>
          queryResponseFactory(false, false, mockBeer),
        );

        mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() => ({
          data: [
            {
              name: "myBeerNoAlcohol1",
              description: "beer description1",
              image_url: "someImage1",
              id: 2,
            },
          ],
        }));

        const { getByText } = testWrapperFactory(<BeerContainer />);

        getByText(mockBeer.name);

        const nonAlcoholicBeerButton = getByText("Random non alcoholic beer");

        userEvent.click(nonAlcoholicBeerButton);

        getByText("myBeerNoAlcohol1");
      });
    });
  });

  describe("When useGetNonAlcoholicBeersQuery.data is an empty array.", () => {
    test("Then should disable random non alcoholic beer button", () => {
      mockedUseGetRandomBeerQuery.mockImplementation(() =>
        queryResponseFactory(false, false, mockBeer),
      );

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() => ({
        data: [],
      }));

      const { getByText } = testWrapperFactory(<BeerContainer />);

      const nonAlcoholicBeerButton = getByText("Random non alcoholic beer");

      expect(nonAlcoholicBeerButton).toBeDisabled();
    });
  });
});
