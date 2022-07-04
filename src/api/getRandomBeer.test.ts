import mockAxios from "axios";

import getRandomBeer from "./getRandomBeer";

jest.mock("axios");

const axios = mockAxios as jest.Mocked<typeof mockAxios>;

describe("Given a getRandomBeer function", () => {
  describe("When apiClient.get throws an error", () => {
    test("Then should throw that error", async () => {
      const errorMessage = "Error getting random beer";
      axios.get.mockReturnValue(Promise.reject(Error(errorMessage)));

      await expect(getRandomBeer()).rejects.toThrow(errorMessage);
    });
  });

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

      const beer = await getRandomBeer();

      expect(beer).toEqual(returnValue.data[0]);
    });
  });
});
