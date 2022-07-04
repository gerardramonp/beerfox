import { Alert } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { opacityVariants } from "../../ui/FramerMotionVariants";
import { StyledBeerInfoContainer } from "./BeerCardSC";

const BeerCardWarning: FC = () => (
  <StyledBeerInfoContainer
    id="warning-container"
    component={motion.div}
    // @ts-ignore --> This is because TS does not recognise the framer motion props in a MUI component
    initial="initial"
    animate="animate"
    variants={opacityVariants}
  >
    <Alert severity="info">There are no beers matching this criteria.</Alert>
  </StyledBeerInfoContainer>
);
export default BeerCardWarning;
