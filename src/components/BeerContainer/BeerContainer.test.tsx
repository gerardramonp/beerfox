import userEvent from "@testing-library/user-event";
import BeerContainer from "./BeerContainer";
import useGetRandomBeerQuery from "../../queries/useGetRandomBeerQuery";
import useGetNonAlcoholicBeersQuery from "../../queries/useGetNonAlcoholicBeersQuery";
import { testWrapperFactory } from "../../utils/test-utils";

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
      mockedUseGetRandomBeerQuery.mockImplementation(() => ({
        isLoading: true,
        isFetching: true,
        refetch: jest.fn(),
      }));

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() => ({
        isLoading: true,
        isFetching: true,
        refetch: jest.fn(),
      }));

      const { getByTestId } = testWrapperFactory(<BeerContainer />);

      getByTestId("beer-name-loading-skeleton");
    });
  });

  describe("When the randomBeerQuery isError is true", () => {
    test("Then should display an error message", () => {
      mockedUseGetRandomBeerQuery.mockImplementation(() => ({
        isError: true,
        isFetching: false,
        refetch: jest.fn(),
      }));

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() => ({
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      }));

      const { getByText } = testWrapperFactory(<BeerContainer />);

      getByText("There has been an error. Please try again.");
    });
  });

  describe("When the query returns a valid beer", () => {
    test.only("Then should print the beer name and description", async () => {
      mockedUseGetRandomBeerQuery.mockImplementation(() => ({
        isError: false,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
        data: mockBeer,
      }));

      mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() => ({
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      }));

      const { findByText } = testWrapperFactory(<BeerContainer />);

      await findByText(mockBeer.name);
      await findByText(mockBeer.description);
    });
  });

  describe("When user clicks the Another Beer button", () => {
    test("Then should call useGetRandomBeerQuer.refetch function", () => {
      const refetchMock = jest.fn();

      mockedUseGetRandomBeerQuery.mockImplementation(() => ({
        isError: false,
        isLoading: false,
        isFetching: false,
        data: mockBeer,
        refetch: refetchMock,
      }));

      const { getByText } = testWrapperFactory(<BeerContainer />);

      const beerButton = getByText("Another Beer");

      userEvent.click(beerButton);

      expect(refetchMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("When user clicks the Random non alcoholic beer button", () => {
    describe("And there are no beers to show", () => {
      test("Then should show the no beers with that criteria alert", () => {
        mockedUseGetRandomBeerQuery.mockImplementation(() => ({
          isError: false,
          isLoading: false,
          isFetching: false,
          data: mockBeer,
          refetch: jest.fn(),
        }));

        mockedUseGetNonAlcoholicBeersQuery.mockImplementation(() => ({
          data: [],
        }));

        const { getByText } = testWrapperFactory(<BeerContainer />);

        getByText(mockBeer.name);

        const nonAlcoholicBeerButton = getByText("Random non alcoholic beer");

        userEvent.click(nonAlcoholicBeerButton);

        getByText("There are no beers matching this criteria.");
      });
    });

    describe("And there are beers to show", () => {
      test("Then should switch the beer", () => {
        mockedUseGetRandomBeerQuery.mockImplementation(() => ({
          isError: false,
          isLoading: false,
          isFetching: false,
          data: mockBeer,
          refetch: jest.fn(),
        }));

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
});
