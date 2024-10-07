import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from '@mui/material';
import styles from '../styles/infoDialog.module.scss';

// Default form state for the dialog
const DEFAULT_FORM_STATE = {
  teamName: "",
  player1: "",
  player2: "",
  player3: "",
  player4: "",
};

export default function TeamDialog(props) {    
  const [formFields, setFormFields] = useState(props.teamInfo.teamName ? props.teamInfo : DEFAULT_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check whether any of the form fields are unedited
  const isDisabled = () => !formFields.teamName || !formFields.player1 || !formFields.player2 
                           || !formFields.player3 || !formFields.player4;

  // Update given field in the form
  const updateFormField = (event, field) => {
    setFormFields(prevState => ({...prevState, [field]: event.target.value}))
  }

  const closeDialog = (event, reason) => {
    // Prevent closing from clicking outside of the dialog box
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown"))
        return;

    setIsSubmitting(false);
    props.onCloseDialog();
  }

  const handleKeyPress = (event) => {
    if (!isDisabled() && (event.keyCode === 13 || event.which === 13)) {
      // Make "Enter" submit the form
      event.preventDefault(); // prevent enter from refreshing the page
      handleSubmit();
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const teamInfo = {
        teamName: formFields.teamName,
        members: [formFields.player1, formFields.player2, formFields.player3, formFields.player4]
    };

    props.updateTeamInfo(teamInfo);
    closeDialog();
  };

  return (
    <Dialog classes={{paper: styles.dialog}}
      onClose={closeDialog}
      open={props.showDialog}
      component="form">
      <Typography variant="h4" className={styles.title}>
        Team Information
      </Typography>
      <DialogContent className={styles.fields}>
        <TextField color="tertiary" label="Team Name" variant="standard" 
                   value={formFields.teamName}
                   onKeyPress={handleKeyPress}
                   onChange={(event) => updateFormField(event, 'teamName')} />
        <TextField color="tertiary" label="Member 1" variant="standard"
                   value={formFields.player1}
                   onKeyPress={handleKeyPress}
                   onChange={(event) => updateFormField(event, 'player1')} />
        <TextField color="tertiary" label="Member 2" variant="standard"
                   value={formFields.player2}
                   onKeyPress={handleKeyPress}
                   onChange={(event) => updateFormField(event, 'player2')} />
        <TextField color="tertiary" label="Member 3" variant="standard"
                   value={formFields.player3}
                   onKeyPress={handleKeyPress}
                   onChange={(event) => updateFormField(event, 'player3')} />
        <TextField color="tertiary" label="Member 4" variant="standard"
                   value={formFields.player4}
                   onKeyPress={handleKeyPress}
                   onChange={(event) => updateFormField(event, 'player4')} />
      </DialogContent>
      <DialogActions>
        {isSubmitting ? 
          <Button color="secondary" variant="contained" disabled={true}>
            Submitting...
          </Button> :
          <Button color="secondary" variant="contained" onClick={handleSubmit} disabled={isDisabled()}>
            Submit
          </Button>}
      </DialogActions>
    </Dialog>
  )
}