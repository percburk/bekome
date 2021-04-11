import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Grid } from '@material-ui/core';
// Components
import QuestionAccordion from '../../accordions/QuestionAccordion/QuestionAccordion';
import StrengthsAccordion from '../../accordions/StrengthsAccordion/StrengthsAccordion';
import BackgroundAccordion from '../../accordions/BackgroundAccordion/BackgroundAccordion';
import SpecialtiesAccordion from '../../accordions/SpecialtiesAccordion/SpecialtiesAccordion';
import FormatsAccordion from '../../accordions/FormatsAccordion/FormatsAccordion';
import ProviderCard from '../../cards/ProviderCard/ProviderCard';
import EditProviderQuestionsDialog from '../EditProviderQuestionsDialog/EditProviderQuestionsDialog';
import EditProviderStrengthsDialog from '../EditProviderStrengthsDialog/EditProviderStrengthsDialog';
import EditProviderBackgroundDialog from '../EditProviderBackgroundDialog/EditProviderBackgroundDialog';
import EditProviderSpecialtiesDialog from '../EditProviderSpecialtiesDialog/EditProviderSpecialtiesDialog';
import EditProviderFormatsDialog from '../EditProviderFormatsDialog/EditProviderFormatsDialog';
import EditProviderCardDialog from '../EditProviderCardDialog/EditProviderCardDialog';

// Base container of the provider edit functionality
function EditProviderRoot() {
  const dispatch = useDispatch();
  const { id } = useSelector((store) => store.user);
  const provider = useSelector((store) => store.providerDetails);
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);
  const preferences = useSelector((store) => store.preferences);
  const [dialogOpen, setDialogOpen] = useState(false);
  // This handles all accordions being open on the page
  // Whatever page is open corresponds to the string of the component name
  // that is set here, set for the 'qualities' accordion open on page load
  const [openAccordion, setOpenAccordion] = useState('questions');

  useEffect(() => {
    dispatch({ type: 'FETCH_EDIT_PROVIDER_PROFILE', payload: id });
    dispatch({ type: 'FETCH_PREFERENCES' });
  }, []);

  // Takes the id's from preferences_array and matches them to the corresponding
  // entries from the preferences table, parses a string with the
  // preference name separated by ', '
  const parsePreferences = (category) => {
    return preferences
      .filter((item) => {
        return (
          item.category === category &&
          provider.preferences_array?.includes(item.id)
        );
      })
      .reduce((string, item) => (string += `${item.name}, `), '')
      .slice(0, -2);
  };

  // Sends the key and typing of text inputs to redux
  const handleInputs = (key) => (event) => {
    dispatch({
      type: 'SET_PROVIDER_PERSONAL_DETAILS',
      payload: { key, value: event.target.value },
    });
  };

  // Toggles what accordion is open so only one is open at a time
  const handleOpenAccordion = (panel) => (event, isExpanded) => {
    setOpenAccordion(isExpanded ? panel : false);
  };

  // Resets answers of the accordion if the edits are canceled
  const handleCancel = () => {
    dispatch({ type: 'FETCH_EDIT_PROVIDER_PROFILE', payload: id });
    setDialogOpen(false);
  };

  // Submit the answers in redux to the db
  const handleSubmit = () => {
    dispatch({
      type: 'SUBMIT_PROVIDER_EDITS',
      payload: { answers: providerAnswers, id },
    });
    setDialogOpen(false);
  };

  const accordionProps = {
    parsePreferences,
    edit: true,
    setDialogOpen,
    openAccordion,
    handleOpenAccordion,
  };

  const dialogProps = {
    handleSubmit,
    dialogOpen,
    handleInputs,
    handleCancel,
  };

  return (
    <>
      <Box p={3}>
        <Grid container>
          <Grid item xs={4}>
            <center>
              <ProviderCard
                provider={provider}
                edit={true}
                setDialogOpen={setDialogOpen}
              />
            </center>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5">Edit Profile</Typography>
            <QuestionAccordion {...accordionProps} />
            <StrengthsAccordion {...accordionProps} />
            <BackgroundAccordion {...accordionProps} />
            <SpecialtiesAccordion {...accordionProps} />
            <FormatsAccordion {...accordionProps} />
          </Grid>
        </Grid>
      </Box>
      <EditProviderQuestionsDialog {...dialogProps} />
      <EditProviderStrengthsDialog {...dialogProps} />
      <EditProviderBackgroundDialog {...dialogProps} />
      <EditProviderSpecialtiesDialog {...dialogProps} />
      <EditProviderFormatsDialog {...dialogProps} />
      <EditProviderCardDialog {...dialogProps} />
    </>
  );
}

export default EditProviderRoot;
