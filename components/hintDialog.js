import { useState } from 'react';
import { Button, Dialog, DialogContent, Typography } from '@mui/material';
import styles from '../styles/infoDialog.module.scss';

/* 
 Dialog to show hints
 
 props:
  - hints: all hints for this puzzle
  - number of hints: number of hints team has already asked for
 */
export default function HintDialog(props) {
  const [numberOfHints, setNumberOfHints] = useState(props.numberOfHints);
  const isMaxHints = numberOfHints === 3;

  const onHint = () => {
    { 
      if (!isMaxHints) {
        setNumberOfHints(numberOfHints += 1);
        props.updateCount(numberOfHints);
      }
    }    
  }

  return (
    <Dialog classes={{paper: styles.dialog}}
      onClose={() => props.onCloseDialog(numberOfHints)}
      open={props.showDialog}>
      <DialogContent className={styles.fields}>
        <Typography variant="h4">
          HINTS
        </Typography>
        { numberOfHints === 0 && 
          <Typography variant="h6" sx={{ lineHeight: 2, paddingRight: "0.5em" }}>
            No hints yet!
          </Typography>
        }
        {Array.from({length: numberOfHints}, (_, index) => 
          <Typography key={index} variant="h6" sx={{ lineHeight: 2, paddingRight: "0.5em", lineHeight: "normal" }}>
            {index + 1}. {props.hints[index + 1]}
          </Typography>
        )}
        <Button color="secondary" variant="outlined" sx={{ alignSelf: "center", width: "35%" }}
                onClick={onHint} disabled={numberOfHints == 3}>
          {isMaxHints ? "Max Hints Reached" : "Hint Please!" }
        </Button>
      </DialogContent>
    </Dialog>
  )
}