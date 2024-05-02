import { useCallback } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getMapSearchMeta } from "../../../store/selectors";
import { setSearchString, setSearchSort } from "../../../store/actions";
const Search = styled("div")(() => ({
  position: "relative",
  marginLeft: 0,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: "inherit",
  width: 250,
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function MapListToolbar({ onCreate }) {
  const dispatch = useDispatch();
  const meta = useSelector(getMapSearchMeta);
  const { search, sort } = meta;

  return (
    <Box sx={{ flexGrow: 1, justifyContent: "space-between" }}>
      <Box>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Button variant="contained" size="medium" onClick={onCreate}>
              Create New Map
            </Button>
          </Box>

          <Select
            value={`${sort}`}
            onChange={(event) => dispatch(setSearchSort(event.target.value))}
            sx={{ mr: 1, minWidth: 120 }}
            displayEmpty
            size="small"
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"-1"}>Newest First</MenuItem>
            <MenuItem value={"1"}>Oldest First</MenuItem>
          </Select>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledTextField
              placeholder="Search…"
              size="small"
              value={search}
              onChange={(event) =>
                dispatch(setSearchString(event.target.value))
              }
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </Box>
    </Box>
  );
}
