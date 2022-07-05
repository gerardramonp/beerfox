import userEvent from "@testing-library/user-event";
import {
  queryResponseFactory,
  testWrapperFactory,
} from "../../utils/test-utils";
import BeerListContainer from "./BeerListContainer";
import useGetBeersQuery from "../../queries/useGetBeersQuery";

const mockedUseGetBeersQuery = useGetBeersQuery as jest.Mock<any>;

jest.mock("../../queries/useGetBeersQuery");

describe("Given a BeerListContainer component", () => {
  describe("When getBeersQuery returns an error", () => {
    test("Then should display an error message", async () => {
      mockedUseGetBeersQuery.mockImplementation(() =>
        queryResponseFactory(false, true),
      );

      const { findByText } = testWrapperFactory(<BeerListContainer />);

      await findByText("There has been an error. Please try again.");
    });
  });

  describe("When getBeersQuery returns an empty array", () => {
    test("Then should display a warning message", async () => {
      mockedUseGetBeersQuery.mockImplementation(() =>
        queryResponseFactory(false, false, []),
      );

      const { findByText } = testWrapperFactory(<BeerListContainer />);

      await findByText("There are no beers matching this criteria.");
    });
  });

  describe("When getBeersQuery returns 2 beers", () => {
    test("Then should display 2 LiteBeerCards with tose beers info", async () => {
      const beers = [
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
      ];
      mockedUseGetBeersQuery.mockImplementation(() =>
        queryResponseFactory(false, false, beers),
      );

      const { findAllByTestId } = testWrapperFactory(<BeerListContainer />);

      const cards = await findAllByTestId("lite-beer-card");

      expect(cards.length).toBe(2);
    });
  });

  describe("When getBeersQuery isLoading or isFetching is true", () => {
    test("Then should display the loading bar", async () => {
      mockedUseGetBeersQuery.mockImplementation(() =>
        queryResponseFactory(true, false),
      );

      const { findByTestId } = testWrapperFactory(<BeerListContainer />);

      await findByTestId("search-loading");
    });
  });

  describe("When user clicks Search button", () => {
    test("Then should call getBeersQuery.refetch function & disable button", async () => {
      const mockRefetch = jest.fn();

      mockedUseGetBeersQuery.mockImplementation(() =>
        queryResponseFactory(false, false, null, mockRefetch),
      );

      const { findByTestId } = testWrapperFactory(<BeerListContainer />);

      const button = await findByTestId("search-button");

      userEvent.click(button);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("When selected filter type is name", () => {
    describe("And the user types in a & symbol inside the textField", () => {
      test("Then should display an error message", async () => {
        mockedUseGetBeersQuery.mockImplementation(() =>
          queryResponseFactory(false, false),
        );

        const { findByLabelText, findByText } = testWrapperFactory(
          <BeerListContainer />,
        );

        const textField = await findByLabelText("Beer name");

        userEvent.type(textField, "asd&");

        const errorMsg = await findByText("Invalid characters");

        expect(errorMsg).toBeInTheDocument();
      });
    });

    describe("And user clicks By brewed before radiobutton", () => {
      test("Then should display the datepicker", async () => {
        mockedUseGetBeersQuery.mockImplementation(() =>
          queryResponseFactory(false, false),
        );

        const { findByLabelText } = testWrapperFactory(<BeerListContainer />);

        const radioButton = await findByLabelText("By brewed before");

        userEvent.click(radioButton);

        const datePicker = await findByLabelText("Brewed before");

        expect(datePicker).toBeInTheDocument();
      });
    });
  });
});
