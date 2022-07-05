/* eslint-disable react/jsx-props-no-spreading */
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useWindowSize } from "react-use";
import { isValid } from "date-fns";
import { TBeersFilters, TFiltersType } from "../../hooks/useBeersFilters";
import {
  StyledInputsContainer,
  StyledFiltersTypeContainer,
  StyledFiltersContainer,
  StyledFlexGrow,
  StyledSearchButton,
} from "./BeersFiltersSC";
import { BREAKPOINT_SM } from "../../ui/themeOptions";

interface IBeersFiltersProps {
  filters: TBeersFilters;
  isQueryLoading: boolean;
  setFilters: React.Dispatch<React.SetStateAction<TBeersFilters>>;
  onSearchClick: () => void;
}

const BeersFilters: FC<IBeersFiltersProps> = ({
  filters,
  isQueryLoading,
  setFilters,
  onSearchClick,
}) => {
  const { width } = useWindowSize();

  const [textError, setTextError] = useState(false);

  const handleSwitchFiltersType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({
        value: null,
        type: event.target.value as TFiltersType,
      });
    },
    [],
  );

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (/^[\w\d\s-]+$/.test(event.target.value)) {
        setTextError(false);
        setFilters({
          ...filters,
          value: event.target.value,
        });
      } else {
        setTextError(true);
        setFilters({
          ...filters,
          value: null,
        });
      }
    },
    [filters],
  );

  const handleDateChange = useCallback(
    (newValue: string | Date | null) => {
      if (isValid(newValue)) {
        setFilters({
          ...filters,
          value: newValue,
        });
      } else {
        setFilters({
          ...filters,
          value: null,
        });
      }
    },
    [filters],
  );

  return (
    <StyledFiltersContainer>
      <StyledInputsContainer>
        {filters.type === "name" ? (
          <TextField
            label="Beer name"
            placeholder="Search by name..."
            size="small"
            sx={{ width: width >= BREAKPOINT_SM ? "235px" : "100%" }}
            error={textError}
            helperText={textError && "Invalid characters"}
            onChange={handleTextChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSearchClick();
              }
            }}
          />
        ) : (
          <DatePicker
            label="Brewed before"
            views={["year", "month"]}
            value={filters.value}
            inputFormat="MM / yyyy"
            onChange={handleDateChange}
            onAccept={onSearchClick}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                sx={{ width: width >= BREAKPOINT_SM ? "235px" : "100%" }}
              />
            )}
          />
        )}

        <StyledFiltersTypeContainer>
          <RadioGroup
            row
            aria-labelledby="filters-label"
            name="filters"
            value={filters.type}
            onChange={handleSwitchFiltersType}
          >
            <FormControlLabel
              value="name"
              control={<Radio size="small" />}
              label="By name"
            />
            <FormControlLabel
              value="date"
              control={<Radio size="small" checked={filters.type === "date"} />}
              label="By brewed before"
            />
          </RadioGroup>
        </StyledFiltersTypeContainer>
      </StyledInputsContainer>
      {width >= BREAKPOINT_SM && <StyledFlexGrow />}
      <StyledSearchButton
        variant="contained"
        onClick={onSearchClick}
        data-testid="search-button"
        disabled={isQueryLoading}
      >
        Search
      </StyledSearchButton>
    </StyledFiltersContainer>
  );
};

export default BeersFilters;
