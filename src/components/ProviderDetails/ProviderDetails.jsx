import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// Custom hooks
import useStyles from '../../hooks/useStyles';
// Component imports
import FavoriteProviderButton from '../FavoriteProviderButton/FavoriteProviderButton';
import QuestionAccordion from '../accordions/QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../accordions/StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../accordions/BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../accordions/SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../accordions/FormatsAccordion/FormatsAccordion';

// Shows all the details of a specific provider chosen by the client to view
function ProviderDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    providers_users_id,
    first_name,
    last_name,
    pic,
    video,
    city,
    state,
    age,
    saved,
    write_in_pronouns,
    preferences_array,
  } = useSelector((store) => store.providerDetails);
  const preferences = useSelector((store) => store.preferences);
  // Get the provider ID from the URL
  const { id } = useParams();
  // Sets what accordion is open, matching the string to name of accordion
  const [openAccordion, setOpenAccordion] = useState('questions');
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROVIDER_DETAILS', payload: id });
    dispatch({ type: 'GET_PROVIDERS' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  // Takes the id's from preferences_array and matches them to the corresponding
  // entries from the preferences table, parses a string with the
  // preference name separated by ', '
  const parsePreferences = (category) => {
    return preferences
      .filter((item) => {
        return (
          item.category === category && preferences_array?.includes(item.id)
        );
      })
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  // Only opens one accordion at a time
  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  // Toggling opening and closing the video Dialog
  const handleVideoOpen = () => {
    setVideoOpen(!videoOpen);
  };

  const accordionProps = {
    openAccordion,
    handleOpenAccordion,
    parsePreferences,
  };

  return (
    <>
      <Box p={4}>
        <Box display="flex" alignItems="center" ml={4}>
          <IconButton
            color="primary"
            onClick={() => history.goBack()}
            className={classes.backBtn}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">
            {first_name} {last_name}
          </Typography>
          <FavoriteProviderButton
            id={providers_users_id}
            saved={saved}
            type={'FETCH_PROVIDER_DETAILS'}
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box display="flex">
              <img src={pic} className={classes.pic} />
              <Box mt={6}>
                <Typography gutterBottom>Age: {age}</Typography>
                <Typography gutterBottom>
                  Pronouns: {parsePreferences('pronouns')}
                  {write_in_pronouns && `, ${write_in_pronouns}`}
                </Typography>
                <Typography gutterBottom>
                  Location: {city}, {state}
                </Typography>
                <Typography gutterBottom>
                  Languages: {parsePreferences('languages')}
                </Typography>
                <Typography gutterBottom>
                  Religious Affiliations: {parsePreferences('religions')}
                </Typography>
                <Box>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      dispatch({
                        type: 'OPEN_MESSAGE_WINDOW',
                        payload: {
                          sentName: first_name,
                          sentPic: pic,
                          sentId: providers_users_id,
                        },
                      })
                    }
                  >
                    Send Message
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setVideoOpen(true)}
                  >
                    Watch Video
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box boxShadow={2}>
              <QuestionAccordion {...accordionProps} />
              <StrengthsAccordion {...accordionProps} />
              <BackgroundAccordion {...accordionProps} />
              <SpecialtiesAccordion {...accordionProps} />
              <FormatsAccordion {...accordionProps} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={videoOpen} onClose={handleVideoOpen}>
        <video src={video} controls className={classes.video} />
      </Dialog>
    </>
  );
}

export default ProviderDetails;
