import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { Cancel, LocationOn } from "@mui/icons-material";
import {
  formItem,
  formContainer,
 
} from "./styles";
import axios from "axios";
import { createfarmerprofile } from "../../../../../actions/auth";

const Form = () => {
  const [livestock, setLivestock] = useState([]);
  const [tempLocation, setTempLocation] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [id, setId] = useState("");
  const [location, setLocation] = useState({
    name: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  });
  const [formData, setFormData] = useState({
    names: {
      first_name: "",
      surname: "",
      other_name: "",
    },
    farm_name: "",
    bio: "",
  });

  const { names, bio, farm_name } = formData;

  const handleSuggestion = (suggestion) => {
    setLocation({
      ...location,
      name: suggestion.description,
    });
    setTempLocation(suggestion.description);
    setId(suggestion.place_id);
  };

  // const onCancel = (animal) => {
  //   setLivestock(livestock.filter((item) => item !== animal));
  //   let newArray = animals.filter((item) => item !== animal);
  //   setFormData({
  //     ...formData,
  //     animals: newArray,
  //   });
  // };

  const onChangeLocation = (e) => {
    setTempLocation(e.target.value);
    // Get predictions
    let options = {
      method: "GET",
      url: "https://google-maps28.p.rapidapi.com/maps/api/place/autocomplete/json",
      params: { input: tempLocation, language: "en" },
      headers: {
        "X-RapidAPI-Key": "1ab1a33298msh7dae2c3ac457c29p154917jsn910e5935532f",
        "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data.predictions[0].place_id);
        console.log(response.data);
        // setId(response.data.predictions[0].place_id.toString());
        setSuggestions(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const onChangeNames = (e) => {
    setFormData({
      ...formData,
      names: { ...formData.names, [e.target.name]: e.target.value },
    });
  };

  useEffect(() => {
    // Get coordinates of location
    if (id !== "") {
    let option = {
      method: "GET",
      url: "https://google-maps28.p.rapidapi.com/maps/api/place/details/json",
      params: {
        fields:
          "address_component,adr_address,business_status,formatted_address,geometry,icon,icon_mask_base_uri,icon_background_color,name,permanently_closed,photo,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total",
        place_id: id,
        language: "en",
        region: "en",
      },
      headers: {
        "X-RapidAPI-Key": "1ab1a33298msh7dae2c3ac457c29p154917jsn910e5935532f",
        "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
      },
    };

    axios
      .request(option)
      .then(function (response) {
        console.log(response.data);
        setLocation((prevState) => ({
          ...prevState,
          coordinates: {
            latitude: response?.data?.result?.geometry?.location?.lat,
            longitude: response?.data?.result?.geometry?.location?.lng,
          },
        }))
       
      })
      .catch(function (error) {
        console.error(error);
      });
    }
  }, [id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const newForm = { ...formData, location };
     dispatch(createfarmerprofile(newForm, navigate));
  };
  
  return (
    <form style={formContainer} onSubmit={onSubmit}>
      <Box
        sx={{
          display: "flex",
        }}>
        <div style={formItem}>
          <TextField
            variant='outlined'
            name='first_name'
            value={names.first_name}
            label='First Name'
            onChange={onChangeNames}
          />
          {/* <Typography variant='subtitle2' component='p'>
              Error
            </Typography> */}
        </div>
        <div style={formItem}>
          <TextField
            variant='outlined'
            name='surname'
            value={names.surname}
            onChange={onChangeNames}
            label='Surname Name'
          />
          {/* <Typography variant='subtitle2' component='p'>
              Error
            </Typography> */}
        </div>
        <div style={formItem}>
          <TextField
            variant='outlined'
            name='other_name'
            value={names.other_name}
            onChange={onChangeNames}
            label='Other Name'
          />
          {/* <Typography variant='subtitle2' component='p'>
              Error
            </Typography> */}
        </div>
      </Box>
      <Box>
        <div style={formItem}>
          <TextField
            label='Physical location'
            name='location'
            value={tempLocation}
            onChange={onChangeLocation}
          />
          {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
          {tempLocation !== "" && (
            <Paper
              elevation={5}
              sx={{
                zIndex: 100,
                display: "flex",
                flexDirection: "column",
                margin: "0.6rem 0rem",
                padding: "1rem",
              }}>
              {suggestions === null ? (
                <Typography>Loading Results</Typography>
              ) : !suggestions.predictions.length > 0 ? (
                <Typography>No suggestions</Typography>
              ) : (
                suggestions.predictions.map((suggestion, index) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "0.4rem 0rem",
                      }}>
                      <LocationOn
                        sx={{
                          marginRight: "0.3rem",
                        }}
                      />
                      <Typography
                        sx={{ cursor: "pointer" }}
                        variant='body1'
                        component='span'
                        onClick={() => handleSuggestion(suggestion)}>
                        {suggestion.description}
                      </Typography>
                    </div>
                    <Divider />
                  </div>
                ))
              )}
            </Paper>
          )}
        </div>
        <div style={formItem}>
          <TextField
            label='Farm name'
            value={farm_name}
            onChange={(e) =>
              setFormData({ ...formData, farm_name: e.target.value })
            }
          />
          {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
        </div>
        <div style={formItem}>
          <TextField
            label='Bio'
            value={bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />
          {/* <Typography color='red' variant="subtitle2" component='p'>Error</Typography> */}
        </div>
        {/* <div style={formItem}>
          <Typography>Animals kept on the farm</Typography>
          <div style={animalsContainer}>
            {livestock.length > 0 &&
              livestock.map((item, index) => (
                <span key={index} style={animal}>
                  <Typography sx={{ marginRight: "0.3rem" }}>{item}</Typography>
                  <Cancel
                    sx={{ cursor: "pointer" }}
                    onClick={() => onCancel(item)}
                  />
                </span>
              ))}
          </div>
        </div> */}
        {/* <div style={selection}>
          <div
            style={{
              display: "flex",
              margin: "0.4rem 0rem",
            }}>
            <Typography
              sx={{ marginLeft: "0.4rem", cursor: "pointer" }}
              variant='body2'
              component='p'
              onClick={handleClickAnimals}>
              Pigs
            </Typography>
          </div>
          <Divider />
          <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
            <Typography
              sx={{ marginLeft: "0.4rem", cursor: "pointer" }}
              variant='body2'
              component='p'
              onClick={handleClickAnimals}>
              Cattle
            </Typography>
          </div>
          <Divider />
        </div> */}
      </Box>
      <div style={{ textAlign: "center" }}>
        <Button
          variant='contained'
          size='large'
          type='submit'
          sx={{
            padding: "0.3rem",
            backgroundColor: "hotpink",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "deeppink",
            },
            color: "white",
            margin: "0rem 0.8rem",
          }}>
          Submit
        </Button>
      </div>
    </form>
  );
};
export default Form;
