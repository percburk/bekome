import { useSelector } from 'react-redux';
import { Paper, Typography, TextField, Grid, Box } from '@material-ui/core';

// Component imports
import FormCheckboxes from '../FormCheckboxes/FormCheckboxes';
import useStyles from '../../hooks/useStyles';
import S3Uploader from '../S3Uploader/S3Uploader';

function ClientForm1Info({ handleInputs }) {
  const classes = useStyles();
  const {
    first_name,
    last_name,
    write_in_pronouns,
    date_of_birth,
    city,
    state_id,
  } = useSelector((store) => store.forms.clientAnswers);

  return (
    <Paper className={classes.paper} elevation={4}>
      <Grid container spacing={5}>
        <Grid container item xs={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="First Name"
            className={classes.inputs}
            value={first_name || ''}
            onChange={handleInputs('first_name')}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Last Name"
            className={classes.inputs}
            value={last_name || ''}
            onChange={handleInputs('last_name')}
          />
          <Grid item xs={6}>
            <Typography gutterBottom>What pronouns do you use?</Typography>
            <Typography variant="body2" gutterBottom>
              <i>select all that apply</i>
            </Typography>
            <FormCheckboxes category={'pronouns'} />
            <Box>
              <TextField
                variant="outlined"
                label="Other"
                size="small"
                className={classes.inputs}
                value={write_in_pronouns || ''}
                onChange={handleInputs('write_in_pronouns')}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              label="Date of Birth"
              className={classes.inputs}
              value={date_of_birth}
              onChange={handleInputs('date_of_birth') || ''}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Location"
              className={classes.inputs}
              value={city || ''}
              onChange={handleInputs('city')}
            />
            <FormControl variant="outlined">
              <InputLabel id="state-picker">State</InputLabel>
              <Select
                className={classes.stateSelect}
                label="State"
                value={state_id || ''}
                onChange={handleInputs('state_id')}
              >
                {states.map((state) => {
                  return <MenuItem value={state.id}>{state.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <Typography>What kind of insurance do you have?</Typography>
            <FormCheckboxes category={'insurance'} />
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom>Add a profile photo:</Typography>
          <Typography variant="body2" gutterBottom>
            <i>not required</i>
          </Typography>
          <S3Uploader />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ClientForm1Info;
