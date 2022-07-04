import { waitFor } from "@testing-library/react";
import mockAxios from "axios";
import { queryWrapperFactory } from "../utils/test-utils";
import useGetBeersQuery from "./useGetBeersQuery";

jest.mock("axios");

const axios = mockAxios as jest.Mocked<typeof mockAxios>;

describe("Given a useGetBeersQuery hook", () => {
  describe("When filters.value is null", () => {
    test("Then should return null", async () => {
      const filters = { value: null };
      const { result } = queryWrapperFactory(useGetBeersQuery, filters);

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.data).toBe(null);
    });
  });

  describe("When filters have value", () => {
    test("Then should return a list of beers", async () => {
      const returnValue = {
        data: [
          {
            id: 192,
            name: "Punk IPA 2007 - 2010",
            description: "Our flagship beer that kick st...",
            image_url: "https://images.punkapi.com/v2/192.png",
            abv: 6.0,
            ibu: 60.0,
            target_fg: 1010.0,
            target_og: 1056.0,
            ebc: 17.0,
          },
          {
            id: 193,
            name: "Punk IPA 2007 - 2010",
            description: "Our flagship beer that kick st3...",
            image_url: "https://images.punkapi.com/v2/193.png",
            abv: 6.0,
            ibu: 60.0,
            target_fg: 1010.0,
            target_og: 1056.0,
            ebc: 17.0,
          },
        ],
      };

      axios.get.mockReturnValue(Promise.resolve(returnValue));

      const filters = { value: "asd", type: "name" };
      const { result } = queryWrapperFactory(useGetBeersQuery, filters);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(returnValue.data);
    });
  });
});
