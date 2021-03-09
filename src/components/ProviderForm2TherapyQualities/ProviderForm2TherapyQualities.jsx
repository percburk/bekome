import { useSelector } from 'react-redux';
import { Paper, TextField, Typography, Grid } from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';

function ProviderForm2TherapyQualities({ classes, handleInputs }) {
  const providerAnswers = useSelector((store) => store.forms.providerAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container>
        <Grid item xs={6}>
          <Typography>My biggest strengths as a therapist are:</Typography>
          <FormCheckboxes category={'qualities'} limit={5} />
        </Grid>
        <Grid item xs={6}>
          <Typography>My clients would describe me as:</Typography>
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="Answer here"
            onChange={handleInputs('strengths')}
            value={providerAnswers.strengths}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProviderForm2TherapyQualities;