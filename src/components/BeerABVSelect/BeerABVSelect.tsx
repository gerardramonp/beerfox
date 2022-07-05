import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { FC, useCallback, useContext } from "react";
import { BeerABVContext } from "../../contexts/BeerABVContextProvider";

const BeerABVSelect: FC = () => {
  const { abv, setAbv } = useContext(BeerABVContext);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setAbv(Number(event.target.value ?? 1));
    },
    [abv],
  );

  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Non ancoholic ABV</InputLabel>
      <Select
        labelId="abv-select-label"
        id="abv-select"
        value={abv.toString()}
        label="Non ancoholic ABV"
        onChange={handleChange}
        size="small"
        sx={{ marginRight: "1rem", width: "176px" }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={0.9}>0.9</MenuItem>
        <MenuItem value={0.8}>0.8</MenuItem>
        <MenuItem value={0.7}>0.7</MenuItem>
        <MenuItem value={0.6}>0.6</MenuItem>
        <MenuItem value={0.5}>0.5</MenuItem>
        <MenuItem value={0.4}>0.4</MenuItem>
        <MenuItem value={0.3}>0.3</MenuItem>
        <MenuItem value={0.2}>0.2</MenuItem>
        <MenuItem value={0.1}>0.1</MenuItem>
      </Select>
    </FormControl>
  );
};

export default BeerABVSelect;
