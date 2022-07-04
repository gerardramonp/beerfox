import { FC, useCallback, useEffect, useState } from "react";
import useBeerTemplateVisibility from "../../hooks/useBeerTemplateVisibility";
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

/*
  This component is using a container design pattern. The reason I'm using that, is to do all the logic here, 
  and then pass the data to Presentational components so they're easier to test.
*/
const BeerContainer: FC = () => {
  const [beer, setBeer] = useState<IBeerResponse | null>(null);

  const randomBeerQuery = useGetRandomBeerQuery();

  const { isSkeletonVisible, isWarningVisible, isBeerVisible } =
    useBeerTemplateVisibility(randomBeerQuery, beer);

  const handleAnotherBeerClick = useCallback(() => {
    randomBeerQuery.refetch();
  }, []);

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
          disabled={randomBeerQuery.isFetching}
          onClick={() => {}}
          $lastchild
        >
          Random non alcoholic beer
        </StyledActionButton>
      </StyledBeerActionsContainer>
    </StyledBeerCardContainer>
  );
};

export default BeerContainer;
