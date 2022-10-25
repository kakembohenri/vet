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
import AlertBox from "../../../../Alert/Alert";
import { createvetprofile } from "../../../../../actions/auth";
import { setAlert } from "../../../../../actions/alert";

const Form = () => {
  const [duties, setDuties] = useState([]);
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
    clinic: "",
    experience: "",
    services: [],
    profile_pic: "",
  });

  const { names, clinic, services, experience, profile_pic } = formData;

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
    const newForm = { ...formData, location };

    if (profile_pic !== "") {
      dispatch(createvetprofile(newForm, navigate));
    } else {
      dispatch(setAlert("Profile pic field is empty", "error"));
    }
  };

  return (
    <>
      <AlertBox />
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
          <Typography>Select service</Typography>
          <div style={selection}>
            <div
              style={{
                display: "flex",
                margin: "0.4rem 0rem",
              }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='span'
                onClick={handleClickServices}>
                Artificial insemination
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Castration
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Clinical diagnosis
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Dental surgeries
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Preventive healthcare
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Administer prescribed drugs
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Health status examination
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Wound dressing
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Spraying
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Diagnose illnesses
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Prescribe medication
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Vaccination
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Ophthalmic surgeries
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Spraying
              </Typography>
            </div>
            <Divider />
            <div style={{ display: "flex", margin: "0.4rem 0rem" }}>
              <Typography
                sx={{
                  marginLeft: "0.4rem",
                  cursor: "pointer",
                  color: "white",
                  background: "hotpink",
                  height: "fit-content",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                }}
                variant='body2'
                component='p'
                onClick={handleClickServices}>
                Orthopedic surgeries
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
            Next
          </Button>
        </div>
      </form>
    </>
  );
};
export default Form;
