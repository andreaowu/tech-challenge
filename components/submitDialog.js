import { useState } from 'react';
import { Button, Dialog, DialogContent, Divider, Stack, TextField, Typography } from '@mui/material';
import styles from '../styles/infoDialog.module.scss';

export default function ExpenseDialog(props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissions, setSubmissions] = useState(props.submissions);
  const [guess, setGuess] = useState("");

  const isGuessedCorrectly = () => {
    return submissions[submissions.length - 1] === props.answer;
  }

  const showSubmitButton = () => {
    if (isSubmitting) { 
      return <Button color="secondary" variant="contained" disabled={true} sx={{ margin: "0.5em 0" }} > Submitting... </Button>
    } else if (!isGuessedCorrectly()) {
      return <Button color="secondary" variant="contained" sx={{ margin: "0.5em 0"}}
                     onClick={handleSubmit} disabled={isSubmitting}> Submit </Button>
    } 
  }

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      // Make "Enter" submit the form
      event.preventDefault(); // prevent enter from refreshing the page
      handleSubmit();
    } else if (event.code === 'Space') {
      // Prevent spaces
      event.preventDefault();
    } else {
      // Remove spaces
      const value = event.target.value;

    }
  }

  // Store receipt information to Storage and Firestore
  const handleSubmit = async () => {
    setIsSubmitting(true);

    const updatedSubmissions = [...submissions, guess];
    setSubmissions(updatedSubmissions);
    props.updateSubmissions(updatedSubmissions);

    // Change submission button to be able to submit again after calculating
    setGuess("");
    setIsSubmitting(false);
  };

  return (
    <Dialog classes={{paper: styles.submitDialog}}
      onClose={props.onCloseDialog}
      open={props.showDialog}
      component="form">
      <Typography variant="h4" className={styles.title}>
        SUBMISSIONS
      </Typography>
      <DialogContent sx={{ padding: "1em 0 0" }}>
        { isGuessedCorrectly() ?
          <Stack>
            <Typography variant="h6" sx={{ lineHeight: 2, paddingRight: "0.5em" }} 
                        color="success.main" >
              { props.answer }
            </Typography>
            <Divider light sx={{ paddingBottom: "0.5em" }} />
          </Stack>
          :
          <Stack sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TextField color="tertiary" variant="filled" label="Enter guess"
                         sx={{ width: "70%" }}
                         onKeyPress={handleKeyPress}
                         value={guess.toUpperCase().replace(/\s/g, '')}
                         autoFocus={true}
                         onChange={(event) => setGuess(event.target.value.toUpperCase().replace(/\s/g, ''))} />
            { showSubmitButton() }
          </Stack>
        }
        <Typography variant="h5" className={styles.title} sx={{ paddingTop: "0.5em" }}>
          Past Guesses
        </Typography>
        { !isGuessedCorrectly() &&
          <Typography variant="h6" sx={{ lineHeight: 2, paddingRight: "0.5em" }} 
                      color="error" >
            { submissions[submissions.length - 1] }
          </Typography>
        }
        { submissions.map((_, index, arr) => (
          <div key={index}>
            <Typography variant="h6" sx={{ lineHeight: 2, paddingRight: "0.5em" }} 
                        color="error" >
              { arr[arr.length - 2 - index] }
            </Typography>
          </div>)
        )}
      </DialogContent>
    </Dialog>
  )
}