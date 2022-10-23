import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { LocationOn, Cancel } from "@mui/icons-material";
import FileBase64 from "react-file-base64";
import {
  formItem,
  formContainer,
  selection,
  servicesContainer,
  service,
} from "./styles";
import axios from "axios";
import { createvetprofile } from "../../../../../actions/auth";

const Form = () => {
  const [duties, setDuties] = useState([]);
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
    clinic: "",
    experience: "",
    services: [],
    profile_pic: "",
  });

  const { names, clinic, services, experience } = formData;

  const handleClickServices = (e) => {
    let duty = e.target.innerHTML;

    setDuties([...duties, duty]);

    services.push(duty);
    let newArray = services.filter(
      (item, index) => services.indexOf(item) === index
    );
    setFormData({
      ...formData,
      services: newArray,
    });
  };


  const handleSuggestion = (suggestion) => {
    setLocation({
      ...location,
      name: suggestion.description,
    });
    setTempLocation(suggestion.description);
    setId(suggestion.place_id);
  };

  const onCancel = (duty) => {
    setDuties(duties.filter((item) => item !== duty));
    let newArray = services.filter((item) => item !== duty);
    setFormData({
      ...formData,
      services: newArray,
    });
  };

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
          "X-RapidAPI-Key":
            "1ab1a33298msh7dae2c3ac457c29p154917jsn910e5935532f",
          "X-RapidAPI-Host": "google-maps28.p.rapidapi.com",
        },
      };

      axios
        .request(option)
        .then(function (response) {
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
    dispatch(createvetprofile(newForm, navigate));
  };

  return (
    <form style={formContainer} onSubmit={onSubmit}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "1rem 0rem",
        }}>
        <div style={formItem}>
          <TextField
            variant='outlined'
            name='first_name'
            value={names.first_name}
            label='First Name'
            onChange={onChangeNames}
          />
          {/* <Typography variant="subtitle2" component='p'>Error</Typography> */}
        </div>
        <div style={formItem}>
          <TextField
            variant='outlined'
            name='surname'
            value={names.surname}
            onChange={onChangeNames}
            label='Surname Name'
          />
          {/* <Typography variant="subtitle2" component='p'>Error</Typography> */}
        </div>
        <div style={formItem}>
          <TextField
            variant='outlined'
            name='other_name'
            value={names.other_name}
            onChange={onChangeNames}
            label='Other Name'
          />
          {/* <Typography variant="subtitle2" component='p'>Error</Typography> */}
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
            label='Clinic Name'
            name='clinic'
            value={clinic}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div style={formItem}>
          <TextField
            type='number'
            label='Years of experience'
            name='experience'
            value={experience}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <Typography variant='caption' component='p'>
            Profile picture
          </Typography>
          <FileBase64
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setFormData({ ...formData, profile_pic: base64 })
            }
          />
          {/* <Typography color='red' variant='subtitle2' component='p'>
          Error
        </Typography> */}
        </div>
        <div style={formItem}>
          <Typography>Services you offer</Typography>
          <div style={servicesContainer}>
            {duties.length > 0 &&
              duties
                .filter((item, index) => duties.indexOf(item) === index)
                .map((item, index) => (
                  <span key={index} style={service}>
                    <Typography sx={{ marginRight: "0.3rem" }}>
                      {item}
                    </Typography>
                    <Cancel
                      sx={{ cursor: "pointer" }}
                      onClick={() => onCancel(item)}
                    />
                  </span>
                ))}
          </div>
        </div>
        <div style={selection}>
          <div
            style={{
              display: "flex",
              margin: "0.4rem 0rem",
            }}>
            <Typography
              sx={{ marginLeft: "0.4rem", cursor: "pointer" }}
              variant='body2'
              component='p'
              onClick={handleClickServices}>
              Artificial insemination
            </Typography>
          </div>
          <Divider />
          <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
            <Typography
              sx={{ marginLeft: "0.4rem", cursor: "pointer" }}
              variant='body2'
              component='p'
              onClick={handleClickServices}>
              Castration
            </Typography>
          </div>
          <Divider />
        </div>
      </Box>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant='contained'
          type='submit'
          sx={{
            padding: "0.3rem",
            backgroundColor: "hotpink",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "deeppink",
            },
            color: "white",
            margin: "0rem 0.8rem",
            width: "fit-content",
          }}>
          Submit
        </Button>
      </div>
    </form>
  );
};
export default Form;
