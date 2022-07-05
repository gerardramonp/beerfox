import { FC, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BeerABVContext } from "../../contexts/BeerABVContextProvider";
import useBeerTemplateVisibility from "../../hooks/useBeerTemplateVisibility";
import useGetNonAlcoholicBeersQuery from "../../queries/useGetNonAlcoholicBeersQuery";
import useGetRandomBeerQuery from "../../queries/useGetRandomBeerQuery";
import { IBeerResponse } from "../../types/beerResponse";
import BeerCard from "../BeerCard/BeerCard";
import BeerCardError from "../BeerCard/BeerCardError";
import BeerCardSkeleton from "../BeerCard/BeerCardSkeleton";
import BeerCardWarning from "../BeerCard/BeerCardWarning";
import {
  StyledBeerCardContainer,
  StyledBeerActionsContainer,
  StyledActionButton,
} from "./BeerContainerSC";

const toastError =
  "There are no beers with the selected ABV. Try a higher value.";

/*
  This component is using a container design pattern. The reason I'm using that, is to do all the logic here, 
  and then pass the data to Presentational components so they're easier to test.
*/
const BeerContainer: FC = () => {
  const { abv } = useContext(BeerABVContext);

  const [beer, setBeer] = useState<IBeerResponse | null>(null);

  const randomBeerQuery = useGetRandomBeerQuery();

  const nonAlcoholicBeersQuery = useGetNonAlcoholicBeersQuery(abv);

  const { isSkeletonVisible, isWarningVisible, isBeerVisible } =
    useBeerTemplateVisibility(randomBeerQuery, beer);

  const handleAnotherBeerClick = useCallback(() => {
    randomBeerQuery.refetch();
  }, []);

  const handleNonAlcoholicBeerClick = useCallback(() => {
    if (nonAlcoholicBeersQuery?.data?.length) {
      let newBeer: IBeerResponse;
      do {
        const randomNum = Math.floor(
          Math.random() * nonAlcoholicBeersQuery.data.length,
        );
        newBeer = nonAlcoholicBeersQuery.data[randomNum];
      } while (
        newBeer.id === beer?.id &&
        nonAlcoholicBeersQuery?.data?.length > 1
      );

      setBeer(newBeer);
    }
  }, [beer, nonAlcoholicBeersQuery.data]);

  useEffect(() => {
    if (
      !randomBeerQuery.data?.image_url ||
      !randomBeerQuery.data?.description ||
      randomBeerQuery.data.id === beer?.id
    ) {
      randomBeerQuery.refetch();
    } else {
      setBeer(randomBeerQuery.data);
    }
  }, [randomBeerQuery.data]);

  useEffect(() => {
    if (
      nonAlcoholicBeersQuery.data &&
      nonAlcoholicBeersQuery.data.length === 0
    ) {
      toast.error(toastError);
    }
  }, [nonAlcoholicBeersQuery.data]);

  return (
    <StyledBeerCardContainer elevation={3}>
      <>
        {randomBeerQuery.isError && <BeerCardError />}
        {isSkeletonVisible && <BeerCardSkeleton />}
        {isWarningVisible && <BeerCardWarning />}

        {isBeerVisible && beer && <BeerCard beer={beer} />}
      </>

      <StyledBeerActionsContainer>
        <StyledActionButton
          variant="contained"
          disabled={randomBeerQuery.isFetching}
          onClick={handleAnotherBeerClick}
        >
          Another Beer
        </StyledActionButton>
        <StyledActionButton
          variant="contained"
          disabled={
            randomBeerQuery.isFetching ||
            nonAlcoholicBeersQuery?.data?.length === 0
          }
          onClick={handleNonAlcoholicBeerClick}
          style={{ marginBottom: 0 }}
        >
          Random non alcoholic beer
        </StyledActionButton>
      </StyledBeerActionsContainer>
    </StyledBeerCardContainer>
  );
};

export default BeerContainer;
