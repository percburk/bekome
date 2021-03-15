import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

function StrengthsAccordion({ parsePreferences }) {
  const { strengths } = useSelector((store) => store.providerDetails);

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Strengths</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          <Typography>My clients would say I am... {strengths}</Typography>
          <Typography>
            I consider my top qualities to be... {parsePreferences('qualities')}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default StrengthsAccordion;
