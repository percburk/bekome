import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Box, Grid } from '@material-ui/core';
// Components
import ClientCard from '../../cards/ClientCard/ClientCard';
import EditClientProviderQualitiesAccordion from '../EditClientProviderQualitiesAccordion/EditClientProviderQualitiesAccordion';
import EditClientCardDialog from '../EditClientCardDialog/EditClientCardDialog';
import EditClientReasonsAccordion from '../EditClientReasonsAccordion/EditClientReasonsAccordion';
import EditClientTherapyPreferencesAccordion from '../EditClientTherapyPreferencesAccordion/EditClientTherapyPreferencesAccordion';
import EditClientProviderPreferencesAccordion from '../EditClientProviderPreferencesAccordion/EditClientProviderPreferencesAccordion';

// Root container of the edit client functionality
function EditClientRoot() {
  const dispatch = useDispatch();
  const client = useSelector((store) => store.oneClient);
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  // This handles all accordions being open on the page
  // Whatever page is open corresponds to the string of the component name
  // that is set here, set for the 'qualities' accordion open on page load
  const [openAccordion, setOpenAccordion] = useState('providerQualities');

  useEffect(() => {
    dispatch({ type: 'FETCH_EDIT_CLIENT_PROFILE' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  // Sends the key and typing of text inputs to redux
  const handleInputs = (key) => (event) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  // Submit the answers in redux to the db
  const handleSubmit = () => {
    dispatch({ type: 'SUBMIT_CLIENT_EDITS', payload: clientAnswers });
    // If the card dialog isn't open, this closes the accordion that was edited
    if (!cardDialogOpen) {
      setOpenAccordion(false);
    }
  };

  // Resets answers of the accordion if the edits are canceled
  const handleCancel = () => {
    dispatch({ type: 'FETCH_EDIT_CLIENT_PROFILE' });
    if (!cardDialogOpen) {
      setOpenAccordion(false);
    }
  };

  // Toggles what accordion is open so only one is open at a time
  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  const accordionProps = {
    handleInputs,
    handleSubmit,
    handleCancel,
    handleOpenAccordion,
    openAccordion,
  };

  return (
    <>
      <Box p={3}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <center>
              <ClientCard
                client={client}
                edit={true}
                setCardDialogOpen={setCardDialogOpen}
              />
            </center>
          </Grid>
          <Grid item xs={8}>
            <Box pb={2}>
              <Typography variant="h5">Edit Profile</Typography>
            </Box>
            <EditClientProviderQualitiesAccordion {...accordionProps} />
            <EditClientReasonsAccordion {...accordionProps} />
            <EditClientTherapyPreferencesAccordion {...accordionProps} />
            <EditClientProviderPreferencesAccordion {...accordionProps} />
          </Grid>
        </Grid>
      </Box>
      <EditClientCardDialog
        handleInputs={handleInputs}
        handleSubmit={handleSubmit}
        cardDialogOpen={cardDialogOpen}
        setCardDialogOpen={setCardDialogOpen}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default EditClientRoot;
