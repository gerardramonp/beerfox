import React, { FC, useLayoutEffect, useRef, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useWindowSize } from "react-use";
import {
  StyledLiteBeerDescriptionContainer,
  StyledLiteBeerCollapsedDescription,
  StyledLiteBeerSeeMore,
  StyledLiteBeerExpandedDescription,
} from "./LiteBeerCardSC";
import isElementTextEllipsed from "../../utils/isElementTextEllipsed";

interface ILiteBeerCardDescriptionProps {
  description: string;
}

const LiteBeerCardDescription: FC<ILiteBeerCardDescriptionProps> = ({
  description,
}) => {
  const refDescription = useRef<HTMLParagraphElement>(null);
  const { width } = useWindowSize();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEllipsed, setIsEllipsed] = useState(true);

  const memorizedHandleExpandClick = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  useLayoutEffect(() => {
    if (refDescription?.current) {
      const isTextEllipsed = isElementTextEllipsed(refDescription.current);

      setIsEllipsed(isTextEllipsed);
    } else {
      setIsEllipsed(true);
    }
  }, [refDescription, width]);

  return (
    <StyledLiteBeerDescriptionContainer>
      {isExpanded ? (
        <StyledLiteBeerExpandedDescription>
          {description}
        </StyledLiteBeerExpandedDescription>
      ) : (
        <StyledLiteBeerCollapsedDescription ref={refDescription}>
          {description}
        </StyledLiteBeerCollapsedDescription>
      )}
      {isEllipsed && (
        <StyledLiteBeerSeeMore
          variant="text"
          disableRipple
          onClick={memorizedHandleExpandClick}
          endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {isExpanded ? "Read less" : "Read more"}
        </StyledLiteBeerSeeMore>
      )}
    </StyledLiteBeerDescriptionContainer>
  );
};

export default LiteBeerCardDescription;
