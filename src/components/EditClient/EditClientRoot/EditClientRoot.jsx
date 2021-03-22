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

function EditClientRoot() {
  const dispatch = useDispatch();
  const client = useSelector((store) => store.oneClient);
  const clientAnswers = useSelector((store) => store.forms.clientAnswers);
  const [cardDialogOpen, setCardDialogOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('providerQualities');

  useEffect(() => {
    dispatch({ type: 'FETCH_EDIT_CLIENT_PROFILE' });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  const handleInputs = (key) => (event) => {
    dispatch({
      type: 'SET_CLIENT_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  const handleSubmit = () => {
    dispatch({ type: 'SUBMIT_CLIENT_EDITS', payload: clientAnswers });
    if (!cardDialogOpen) {
      setOpenAccordion(false);
    }
  };

  const handleCancel = () => {
    dispatch({ type: 'FETCH_EDIT_CLIENT_PROFILE' });
    if (!cardDialogOpen) {
      setOpenAccordion(false);
    }
  };

  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
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
            <EditClientProviderQualitiesAccordion
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              handleOpenAccordion={handleOpenAccordion}
              openAccordion={openAccordion}
            />
            <EditClientReasonsAccordion
              handleInputs={handleInputs}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              handleOpenAccordion={handleOpenAccordion}
              openAccordion={openAccordion}
            />
            <EditClientTherapyPreferencesAccordion
              handleInputs={handleInputs}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              handleOpenAccordion={handleOpenAccordion}
              openAccordion={openAccordion}
            />
            <EditClientProviderPreferencesAccordion
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              handleOpenAccordion={handleOpenAccordion}
              openAccordion={openAccordion}
            />
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