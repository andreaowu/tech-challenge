import { Dialog, DialogContent, List, ListItemText, Stack, Typography } from '@mui/material';
import styles from '../styles/infoDialog.module.scss';

export default function ScoreHintDialog(props) {
  return (
    <Dialog classes={{paper: styles.dialog}}
      onClose={() => props.onCloseDialog()}
      open={props.showDialog}>
      <DialogContent className={styles.fields}>
        <Stack>
            <Typography variant="h4">
            How are points calculated?
            </Typography>
            <Typography sx={{ paddingTop: "1em" }}>
                Depending on the puzzle difficulty, solving the puzzle is worth some number of points.
                For each puzzle, the number of hints you take will affect your score.
                The first hint will cost 5 points, the second hint will cost an additional 10 points, and
                the third hint will cost an additional 20 points.
            </Typography>
            <Typography sx={{ paddingTop: "1em" }}>
                As an example, if a puzzle is worth 300 points, you will get:
                <List sx={{ padding: "0" }}>
                    <ListItemText>
                        * 300 - 5 = 295 points if you ask for one hint
                    </ListItemText>
                    <ListItemText>
                        * 300 - 5 - 10 = 285 points if you ask for two hints
                    </ListItemText>
                    <ListItemText>
                    * 300 - 5 - 10 - 20 = 265 points if you ask for three hints
                    </ListItemText>
                </List> 
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}