import { useState } from 'react';
import { Button, Dialog, DialogContent, Divider, Stack, TextField, Typography } from '@mui/material';
import styles from '../styles/infoDialog.module.scss';

/* 
 Dialog to input receipt information
 
 props:
  - edit is the receipt to edit
  - showDialog boolean for whether to show this dialog
  - onError emits to notify error occurred
  - onSuccess emits to notify successfully saving receipt
  - onCloseDialog emits to close dialog
 */
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
    console.log(event.keyCode);
    if (event.keyCode === 13 || event.which === 13) {
      // Make "Enter" submit the form
      event.preventDefault(); // prevent enter from refreshing the page
      handleSubmit();
    } else if (event.code === 'Space') {
      // Prevent spaces
      event.preventDefault();
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
            <Typography variant="h5" className={styles.title}>
              Congratulations! You got the correct answer: {props.answer}
            </Typography>
            <Divider light sx={{ paddingBottom: "0.5em" }} />
          </Stack>
          :
          <Stack sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <TextField color="tertiary" variant="filled" label="Enter guess"
                          onKeyPress={handleKeyPress}
                          value={guess.toUpperCase()}
                          onChange={(event) => setGuess(event.target.value.toUpperCase())} />
            { showSubmitButton() }
          </Stack>
        }
        <Typography variant="h5" className={styles.title} sx={{ paddingTop: "0.5em" }}>
          Past Guesses
        </Typography>
        { submissions.map((_, index, arr) => (
          <div key={index}>
            <Typography variant="h6" sx={{ lineHeight: 2, paddingRight: "0.5em" }} 
                        color={(isGuessedCorrectly() && index === 0) ? "success.main" : "error"} >
              { arr[arr.length - 1 - index] }
            </Typography>
          </div>)
        )}
      </DialogContent>
    </Dialog>
  )
}