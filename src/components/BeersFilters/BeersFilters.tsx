/* eslint-disable react/jsx-props-no-spreading */
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { FC, useState } from "react";
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

function handleSwitchFiltersType(
  event: React.ChangeEvent<HTMLInputElement>,
  setFilters: React.Dispatch<React.SetStateAction<TBeersFilters>>,
) {
  setFilters({
    value: null,
    type: event.target.value as TFiltersType,
  });
}

function handleTextChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  filters: TBeersFilters,
  setTextError: React.Dispatch<React.SetStateAction<boolean>>,
  setFilters: React.Dispatch<React.SetStateAction<TBeersFilters>>,
) {
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
}

function handleDateChange(
  newValue: string | Date | null,
  filters: TBeersFilters,
  setFilters: React.Dispatch<React.SetStateAction<TBeersFilters>>,
) {
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
}

interface IBeersFiltersProps {
  filters: TBeersFilters;
  setFilters: React.Dispatch<React.SetStateAction<TBeersFilters>>;
  onSearchClick: () => void;
}

const BeersFilters: FC<IBeersFiltersProps> = ({
  filters,
  setFilters,
  onSearchClick,
}) => {
  const { width } = useWindowSize();

  const [textError, setTextError] = useState(false);

  return (
    <StyledFiltersContainer>
      <StyledInputsContainer>
        {filters.type === "name" ? (
          <TextField
            label="Beer name"
            placeholder="Search by name..."
            size="small"
            sx={{ width: width > BREAKPOINT_SM ? "235px" : "100%" }}
            error={textError}
            helperText={textError && "Invalid characters"}
            onChange={(event) => {
              handleTextChange(event, filters, setTextError, setFilters);
            }}
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
            onChange={(newValue) => {
              handleDateChange(newValue, filters, setFilters);
            }}
            onAccept={onSearchClick}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                sx={{ width: width > BREAKPOINT_SM ? "235px" : "100%" }}
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
            onChange={(event) => handleSwitchFiltersType(event, setFilters)}
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
      {width > BREAKPOINT_SM && <StyledFlexGrow />}
      <StyledSearchButton variant="contained" onClick={onSearchClick}>
        Search
      </StyledSearchButton>
    </StyledFiltersContainer>
  );
};

export default BeersFilters;
