import { testWrapperFactory } from "../../utils/test-utils";
import BeerABVSelect from "./BeerABVSelect";

describe("Given a BeerABVSelect component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Then should render", async () => {
    const { findByLabelText } = testWrapperFactory(<BeerABVSelect />);

    await findByLabelText("Non ancoholic ABV");
  });
});
