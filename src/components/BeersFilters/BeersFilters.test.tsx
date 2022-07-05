import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TBeersFilters } from "../../hooks/useBeersFilters";
import { testWrapperFactory } from "../../utils/test-utils";
import BeersFilters from "./BeersFilters";

describe("Given a BeersFilters component", () => {
  const onSearchClick = jest.fn();

  describe("When filter type is name", () => {
    test("Then should render the textField component", () => {
      const filters: TBeersFilters = {
        type: "name",
        value: null,
      };
      const { getByLabelText } = testWrapperFactory(
        <BeersFilters
          filters={filters}
          isQueryLoading={false}
          setFilters={jest.fn()}
          onSearchClick={onSearchClick}
        />,
      );

      getByLabelText("Beer name");
    });
  });

  describe("When filter type is date", () => {
    test("Then should render the datePicker component", () => {
      const filters: TBeersFilters = {
        type: "date",
        value: null,
      };
      const { getByLabelText } = testWrapperFactory(
        <BeersFilters
          filters={filters}
          isQueryLoading={false}
          setFilters={jest.fn()}
          onSearchClick={onSearchClick}
        />,
      );

      getByLabelText("Brewed before");
    });
  });

  describe("When isQueryLoading prop is true", () => {
    test("Then should disable search button", async () => {
      const filters: TBeersFilters = {
        type: "date",
        value: null,
      };
      const { findByTestId } = testWrapperFactory(
        <BeersFilters
          filters={filters}
          isQueryLoading
          setFilters={jest.fn()}
          onSearchClick={onSearchClick}
        />,
      );

      const button = await findByTestId("search-button");

      expect(button).toBeDisabled();
    });
  });

  describe("When user clicks on search button", () => {
    test("Then should call onSearchClick function", () => {
      const filters: TBeersFilters = {
        type: "name",
        value: null,
      };

      const { getByText } = testWrapperFactory(
        <BeersFilters
          filters={filters}
          isQueryLoading={false}
          setFilters={jest.fn()}
          onSearchClick={onSearchClick}
        />,
      );

      userEvent.click(getByText("Search"));

      expect(onSearchClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("When user press enter on search textfield", () => {
    test("Then should call onSearchClick function", async () => {
      const filters: TBeersFilters = {
        type: "name",
        value: null,
      };

      const { findByLabelText } = testWrapperFactory(
        <BeersFilters
          filters={filters}
          isQueryLoading={false}
          setFilters={jest.fn()}
          onSearchClick={onSearchClick}
        />,
      );

      const input = await findByLabelText("Beer name");

      fireEvent.keyDown(input, { key: "Enter" });

      expect(onSearchClick).toHaveBeenCalledTimes(1);
    });
  });
});
