import { waitFor } from "@testing-library/react";
import mockAxios from "axios";
import { queryWrapperFactory } from "../utils/test-utils";
import useGetRandomBeerQuery from "./useGetRandomBeerQuery";

jest.mock("axios");

const axios = mockAxios as jest.Mocked<typeof mockAxios>;

describe("Given a useGetRandomBeerQuery hook", () => {
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
        ],
      };

      axios.get.mockReturnValue(Promise.resolve(returnValue));

      const { result } = queryWrapperFactory(useGetRandomBeerQuery);

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(returnValue.data[0]);
    });
  });
});
