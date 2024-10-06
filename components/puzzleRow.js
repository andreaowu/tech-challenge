import { Button, Link, Stack, Typography } from '@mui/material';
import styles from '../styles/landing.module.scss';

/* 
Each row with puzzle information

props: puzzle data
 - name
 - url

 - onHint emits to notify needing to show the hint dialog
 - onSubmit emits to notify needing to show the submit dialog
 */
export default function PuzzleRow(props) {
    const puzzle = props.puzzle;
    return (
        <Stack display="flex" direction="row" justifyContent="space-between" sx={{ margin: "1em 0" }}>
            <Typography variant="h5">
                <Link color="secondary" href={puzzle.url} target="_blank">{puzzle.name}</Link>
            </Typography>
            <Stack direction="row" className={styles.row}>
                <Button color="secondary" onClick={props.onHint}>
                    Hints    
                </Button>
                <Button color="secondary" onClick={props.onSubmit}>
                    Submit
                </Button>
                <Typography sx={{ width: "2em", alignSelf: "center", display: "flex", justifyContent: "center" }}>
                    {props.score}
                </Typography>
            </Stack>
        </Stack>
    )
}