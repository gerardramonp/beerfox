import { FC } from "react";
import { motion } from "framer-motion";
import { IBeerResponse } from "../../types/beerResponse";
import {
  StyledBeerBody,
  StyledBeerDescription,
  StyledBeerImage,
  StyledBeerInfoContainer,
  StyledBeerName,
} from "./BeerCardSC";
import ImagePlaceholder from "../../assets/image-placeholder.png";
import { opacityVariants } from "../../ui/FramerMotionVariants";

interface IBeerCardProps {
  beer: IBeerResponse;
}

const BeerCard: FC<IBeerCardProps> = ({ beer }) => (
  <StyledBeerInfoContainer
    component={motion.div}
    animate="animate"
    initial="initial"
    variants={opacityVariants}
  >
    <StyledBeerName variant="h3">{beer.name}</StyledBeerName>
    <StyledBeerBody>
      <StyledBeerImage src={beer.image_url ?? ImagePlaceholder} alt="beer" />
      <StyledBeerDescription>{beer.description}</StyledBeerDescription>
    </StyledBeerBody>
  </StyledBeerInfoContainer>
);

export default BeerCard;
