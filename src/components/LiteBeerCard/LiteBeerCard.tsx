import { FC } from "react";

import { IBeerResponse } from "../../types/beerResponse";
import LiteBeerCardDescription from "./LiteBeerCardDescription";
import {
  StyledLiteBeerCardContainer,
  StyledImageContainer,
  StyledLiteBeerInfoContainer,
  StyledLiteBeerImage,
  StyledLiteBeerName,
} from "./LiteBeerCardSC";
import beerImagePlaceholder from "../../assets/image-placeholder.png";

interface ILiteBeerCardProps {
  beer: IBeerResponse;
}

const LiteBeerCard: FC<ILiteBeerCardProps> = ({ beer }) => (
  <StyledLiteBeerCardContainer elevation={3} data-testid="lite-beer-card">
    <StyledImageContainer>
      <StyledLiteBeerImage
        src={beer.image_url ?? beerImagePlaceholder}
        alt="beer"
      />
    </StyledImageContainer>
    <StyledLiteBeerInfoContainer>
      <StyledLiteBeerName variant="h4">{beer.name}</StyledLiteBeerName>
      <LiteBeerCardDescription
        description={
          beer.description ?? "This beer does not have a description"
        }
      />
    </StyledLiteBeerInfoContainer>
  </StyledLiteBeerCardContainer>
);

export default LiteBeerCard;
