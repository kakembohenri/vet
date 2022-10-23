import { useState } from "react";
import Navbar from "../Landing/Navbar/Navbar";
import Search from "../Search/Search";
import { Typography, Paper, Grid, TextField, Box } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import {
  mainContainer,
  header,
  Vets,
  Vet,
  searchBox,
  inputSearch,
  resultsContainer,
  result,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchservices } from "../../actions/profile";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onChange = (e) => {
    setSearch(e.target.value);

    if (search !== "") {
      dispatch(searchservices(search));
    }
  };

  return (
    <div>
      <Navbar user={auth} />
      <div style={{ position: "relative", margin: "6rem 0rem" }}>
        <Box style={searchBox}>
          <TextField
            sx={inputSearch}
            type='search'
            placeholder='Search for vet services'
            value={search}
            onChange={onChange}
          />
          <SearchRounded sx={{ color: "deepink" }} />
        </Box>
        <Search search={search} container={resultsContainer} item={result} />
      </div>
      <div style={mainContainer}>
        <Typography style={header} variant='h4' component='h1'>
          Categories
        </Typography>
        <Grid style={Vets} container spacing={1}>
          <Grid
            item
            lg={2}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/home/categories/plants")}>
            <Paper style={Vet} elevation={3}>
              <Typography
                variant='body2'
                component='p'
                fontWeight='bolder'
                fontSize='1.2rem'>
                100
              </Typography>
              <Typography variant='body1' component='p' fontWeight='bolder'>
                Plants
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            lg={2}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/home/categories/poultry")}>
            <Paper style={Vet} elevation={3}>
              <Typography
                variant='body2'
                component='p'
                fontWeight='bolder'
                fontSize='1.2rem'>
                100
              </Typography>
              <Typography variant='body1' component='p' fontWeight='bolder'>
                Poultry
              </Typography>
            </Paper>
          </Grid>
          <Grid
            item
            lg={2}
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/home/categories/cattle")}>
            <Paper style={Vet} elevation={3}>
              <Typography
                variant='body2'
                component='p'
                fontWeight='bolder'
                fontSize='1.2rem'>
                100
              </Typography>
              <Typography variant='body1' component='p' fontWeight='bolder'>
                Cattle
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Home;
