import { Dialog, DialogContent, Link, List, ListItemText, Stack, Typography } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styles from '../styles/infoDialog.module.scss';

export default function HelpDialog(props) {
  return (
    <Dialog classes={{paper: styles.dialog}}
      onClose={() => props.onCloseDialog()}
      open={props.showDialog}>
      <DialogContent className={styles.fields}>
        <Stack>
            <Typography variant="h4">
            Welcome to Tech Challenge!
            </Typography>
            <Typography sx={{ paddingTop: "1em" }}>
                Today, you'll be solving puzzles in teams! They're logic-based puzzles, and if
                you've ever done an Escape Room, these are similar but on "paper".
            </Typography>
            <Typography variant="h4" sx={{ paddingTop: "0.5em" }}>
                Tips
            </Typography>
            <List>
                <ListItemText>
                   - Puzzle instructions usually contain clues for what you're supposed to do.
                </ListItemText>
                <ListItemText>
                    <Typography>
                        - You're provided a&nbsp;
                        <Link color="secondary" href="https://drive.google.com/file/d/1Wz0VFdebx0w0yKgd8a1AiorbgfSVqMYc/view"
                                target="_blank">
                        Code Sheet
                        </Link>
                        , which contain common puzzle tricks.
                    </Typography>
                </ListItemText>
                <ListItemText>
                    - You can ask for 3 hints per puzzle. Click on
                    <HelpOutlineOutlinedIcon sx={{ fontSize: "16px", margin: "0 0.2em" }}/>
                    next to "Points" for more info.
                </ListItemText>
                <ListItemText>
                    - You can use any program, like&nbsp;
                    <Link color="secondary" href="https://app.whiteboard.microsoft.com/"
                            target="_blank">
                    Microsoft Whiteboard
                    </Link>
                    , to help you draw.
                </ListItemText>
            </List>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}