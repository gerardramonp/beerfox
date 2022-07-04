import { FC } from "react";
import BeerContainer from "../components/BeerContainer/BeerContainer";
import BeerListContainer from "../components/BeerListContainer/BeerListContainer";

const BeersPage: FC = () => (
  <>
    <BeerContainer />
    <BeerListContainer />
  </>
);

export default BeersPage;
