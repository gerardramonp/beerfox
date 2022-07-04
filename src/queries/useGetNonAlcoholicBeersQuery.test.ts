import { waitFor } from "@testing-library/react";
import mockAxios from "axios";
import useGetNonAlcoholicBeersQuery from "./useGetNonAlcoholicBeersQuery";
import { queryWrapperFactory } from "../utils/test-utils";

jest.mock("axios");

const axios = mockAxios as jest.Mocked<typeof mockAxios>;

describe("Given a useGetNonAlcoholicBeersQuery hook", () => {
  describe("When api call works fine", () => {
    test("Then should return a beer", async () => {
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
            name: "Punk IPA 2007 - 2011",
            description: "Our flagship beer that kick st2...",
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

      const { result } = queryWrapperFactory(useGetNonAlcoholicBeersQuery);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(returnValue.data);
    });
  });

  describe("When some of the api results does not contain image_url, name or description", () => {
    test("Then should exclude that one from the returned value", async () => {
      const returnValue = {
        data: [
          {
            id: 192,
            name: "Punk IPA 2007 - 2010",
            description: null,
            image_url: "https://images.punkapi.com/v2/192.png",
            abv: 6.0,
            ibu: 60.0,
            target_fg: 1010.0,
            target_og: 1056.0,
            ebc: 17.0,
          },
          {
            id: 193,
            name: "Punk IPA 2007 - 2011",
            description: "Our flagship beer that kick st2...",
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

      const { result } = queryWrapperFactory(useGetNonAlcoholicBeersQuery);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      const expected = [
        {
          id: 193,
          name: "Punk IPA 2007 - 2011",
          description: "Our flagship beer that kick st2...",
          image_url: "https://images.punkapi.com/v2/193.png",
          abv: 6.0,
          ibu: 60.0,
          target_fg: 1010.0,
          target_og: 1056.0,
          ebc: 17.0,
        },
      ];

      expect(result.current.data).toEqual(expected);
    });
  });
});
