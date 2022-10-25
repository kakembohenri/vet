import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import FileBase64 from "react-file-base64";
import AlertBox from "../../../../Alert/Alert";
import { formItem, formContainer } from "./styles";
import { createfarmerprofile } from "../../../../../actions/auth";

const Form = () => {
  const [tempLocation, setTempLocation] = useState("");
  const [suggestions, setSuggestions] = useState(null);
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
    profile_pic: "",
  });
  const farmer = useSelector((state) => state.auth.id);

  const { names, bio, farm_name } = formData;

  const handleSuggestion = (suggestion) => {
    setLocation({
      ...location,
      name: suggestion.formatted,
    });
    setTempLocation(suggestion.formatted);
    setLocation((prevState) => ({
      ...prevState,
      coordinates: {
        latitude: suggestion?.lat,
        longitude: suggestion?.lon,
      },
    }));
  };

  const onChangeLocation = (e) => {
    setTempLocation(e.target.value);
    // Get predictions
    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${tempLocation}&format=json&apiKey=83575621a5e94a24b36c2d9b0004a8ff`
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSuggestions(result?.results);
      })
      .catch((error) => console.log("error", error));
  };

  const onChangeNames = (e) => {
    setFormData({
      ...formData,
      names: { ...formData.names, [e.target.name]: e.target.value },
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const newForm = { farmer, ...formData, location };
    dispatch(createfarmerprofile(newForm, navigate));
    console.log("New form is: ", newForm);
  };

  return (
    <>
      <AlertBox />
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
                ) : !suggestions?.length > 0 ? (
                  <Typography>No suggestions</Typography>
                ) : (
                  suggestions?.map((suggestion, index) => (
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
                          {suggestion.formatted}
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
              multiline
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />

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
    </>
  );
};
export default Form;
