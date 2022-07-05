import userEvent from "@testing-library/user-event";
import { testWrapperFactory } from "../../utils/test-utils";
import BeerListContainer from "./BeerListContainer";
import useGetBeersQuery from "../../queries/useGetBeersQuery";

const mockedUseGetBeersQuery = useGetBeersQuery as jest.Mock<any>;

jest.mock("../../queries/useGetBeersQuery");

describe("Given a BeerListContainer component", () => {
  describe("When getBeersQuery returns an error", () => {
    test("Then should display an error message", async () => {
      mockedUseGetBeersQuery.mockImplementation(() => ({
        isError: true,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      }));

      const { findByText } = testWrapperFactory(<BeerListContainer />);

      await findByText("There has been an error. Please try again.");
    });
  });

  describe("When getBeersQuery returns an empty array", () => {
    test("Then should display a warning message", async () => {
      mockedUseGetBeersQuery.mockImplementation(() => ({
        isError: false,
        isLoading: false,
        isFetching: false,
        data: [],
        refetch: jest.fn(),
      }));

      const { findByText } = testWrapperFactory(<BeerListContainer />);

      await findByText("There are no beers matching this criteria.");
    });
  });

  describe("When getBeersQuery returns 2 beers", () => {
    test("Then should display 2 LiteBeerCards with tose beers info", async () => {
      mockedUseGetBeersQuery.mockImplementation(() => ({
        isError: false,
        isLoading: false,
        isFetching: false,
        data: [
          {
            id: 1,
            name: "name",
            description: "desc",
          },
          {
            id: 2,
            name: "name2",
            description: "desc2",
          },
        ],
        refetch: jest.fn(),
      }));

      const { findAllByTestId } = testWrapperFactory(<BeerListContainer />);

      const cards = await findAllByTestId("lite-beer-card");

      expect(cards.length).toBe(2);
    });
  });

  describe("When getBeersQuery isLoading or isFetching is true", () => {
    test("Then should display the loading bar", async () => {
      mockedUseGetBeersQuery.mockImplementation(() => ({
        isError: false,
        isLoading: true,
        isFetching: true,
        refetch: jest.fn(),
      }));

      const { findByTestId } = testWrapperFactory(<BeerListContainer />);

      await findByTestId("search-loading");
    });
  });

  describe("When user clicks Search button", () => {
    test("Then should call getBeersQuery.refetch function & disable button", async () => {
      const mockRefetch = jest.fn();

      mockedUseGetBeersQuery.mockImplementation(() => ({
        isError: false,
        isLoading: false,
        isFetching: false,
        refetch: mockRefetch,
      }));

      const { findByTestId } = testWrapperFactory(<BeerListContainer />);

      const button = await findByTestId("search-button");

      userEvent.click(button);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });
});
