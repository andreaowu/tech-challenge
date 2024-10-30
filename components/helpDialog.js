import { Dialog, DialogContent, Link, Stack, Typography } from '@mui/material';
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
                Today, you'll be solving puzzles! 
                These are not jigsaw puzzles, but rather, if you've ever done an Escape Room, these are similar but on paper.
                They're logic puzzles, and oftentimes, there are hints in the instructions for what you're supposed to do.
                You're provided a&nbsp;
                <Link color="secondary" href="https://drive.google.com/file/d/1Wz0VFdebx0w0yKgd8a1AiorbgfSVqMYc/view"
                        target="_blank">
                Code Sheet
                </Link>
                , and these are tricks common in puzzles to help you solve them.
                You can ask for hints, although points will be deducted if you use them. (Click on the question mark next to
                Points on the main page to find out more information.)
            </Typography>
            <Typography variant="h4" sx={{ paddingTop: "1em" }}>
            A tip!
            </Typography>
            <Typography>
                To draw, feel free to use any programs. For example, you can use&nbsp;
                <Link color="secondary" href="https://app.whiteboard.microsoft.com/"
                        target="_blank">
                Microsoft Whiteboard
                </Link>
                &nbsp;and&nbsp;
                <Link color="secondary" href="https://support.microsoft.com/en-us/office/insert-pictures-and-documents-in-whiteboard-55eb5b48-5f3c-4383-b89f-469750088e64"
                        target="_blank">
                here
                </Link>
                &nbsp;is how to import a document to draw on it.
            </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}