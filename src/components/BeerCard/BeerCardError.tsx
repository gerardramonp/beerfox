import { Alert, Box } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { opacityVariants } from "../../ui/FramerMotionVariants";
import { StyledBeerInfoContainer } from "./BeerCardSC";

const BeerCardError: FC = () => (
  <StyledBeerInfoContainer
    id="error-container"
    component={motion.div}
    initial="initial"
    animate="animate"
    variants={opacityVariants}
  >
    <Box>
      <Alert severity="error">There has been an error. Please try again.</Alert>
    </Box>
  </StyledBeerInfoContainer>
);
export default BeerCardError;
