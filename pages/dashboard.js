import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Alert, CircularProgress, Container, Divider, Snackbar, Stack, Typography } from '@mui/material';
import NavBar from '../components/navbar';
import PuzzleRow from '../components/puzzleRow';
import HintDialog from '../components/hintDialog';
import SubmitDialog from '../components/submitDialog';
import { useAuth } from '../firebase/auth';
import { getPuzzles, getTeams, updateScore, updateTeam } from '../firebase/firestore';

export default function Dashboard() {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  
  // State involved in loading
  const [isLoadingPuzzles, setIsLoadingPuzzles] = useState(true);
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [specificPuzzle, setSpecificPuzzle] = useState(-1);
  const [isShowHint, setIsShowHint] = useState(false);
  const [isShowSubmit, setIsShowSubmit] = useState(false);
  const [isShowSuccessSnackbar, setIsShowSuccessSnackbar] = useState(false);

  // All puzzle information
  const [puzzles, setPuzzles] = useState([]);

  // All team information
  const [hints, setHints] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [scores, setScores] = useState([]);
  const [totalScore, setTotalScore] = useState(0);

  // Listen for changes to loading and authUser, redirect if needed
  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push('/');
    }
  }, [authUser, isLoading])

  // Get puzzles and teams info once user is logged in
  useEffect(async () => {
    if (authUser) {
      const unsubscribe = await getPuzzles(setPuzzles, setIsLoadingPuzzles);
      await getTeams(setHints, setSubmissions, setScores, setTotalScore, setIsLoadingTeams, authUser.uid);

      return () => unsubscribe();
    }
  }, [authUser])

  const onHint = (index) => {
    setSpecificPuzzle(index);
    setIsShowHint(true);
  }

  const onSubmitHint = (index) => {
    setSpecificPuzzle(index);
    setIsShowSubmit(true);
  }

  const onSubmitSubmission = (updated) => {
    updateTeam(authUser.uid, specificPuzzle, updated, submissions, "submissions")

    // Check whether the score needs to be updated
    if (updated[updated.length - 1] == puzzles[specificPuzzle]["answer"]) {
      const pointsForPuzzle = puzzles[specificPuzzle]["points"]
      const newScore = totalScore + pointsForPuzzle;
      setTotalScore(newScore);
      updateTeam(authUser.uid, specificPuzzle, pointsForPuzzle, scores, "scores")
      updateScore(authUser.uid, newScore);
      setIsShowSuccessSnackbar(true);
    }
  }

  const resetDialogs = () => {
    setIsShowHint(false);
    setIsShowSubmit(false);
    setSpecificPuzzle(-1);
  }

  return ((!authUser || isLoadingPuzzles || isLoadingTeams) ?
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>
    :
    <div>
      <Head>
        <title>Tech Challenge 2024</title>
      </Head>
      <NavBar />
      <Container>
        <Stack direction="row" sx={{ paddingTop: "1.5em", display: "flex", justifyContent: "space-between" }}>
          <Stack sx={{ display: "flex", flexDirection: "row" }}>
            <Typography variant="h3" sx={{ lineHeight: 2, paddingRight: "0.5em"}}>
              PUZZLES
            </Typography>
            <Typography variant="h5" sx={{ alignSelf: "center"}}> Total Score: { totalScore } </Typography>
          </Stack>
          <Typography variant="h5" sx={{ lineHeight: 2, paddingRight: "0.5em" }}>
            Score
          </Typography>
        </Stack>
        { puzzles.map((puzzle, index) => (
          <div key={index}>
            <Divider light sx={{ marginBottom: "0.5em" }} />
            <PuzzleRow puzzle={puzzle}
                       score={scores[index]}
                       onHint={() => onHint(index)}
                       onSubmit={() => onSubmitHint(index)} />
          </div>)
        )}
      </Container>
      {specificPuzzle >= 0 && 
      (<HintDialog showDialog={isShowHint}
                  hints={puzzles[specificPuzzle]["hints"]}
                  numberOfHints={hints[specificPuzzle]}
                  updateCount={(numOfHints) => updateTeam(authUser.uid, specificPuzzle, numOfHints, hints, "hints")}
                  onCloseDialog={() => resetDialogs()}>
      </HintDialog>)}
      {specificPuzzle >= 0 && 
      (<SubmitDialog showDialog={isShowSubmit}
                  answer={puzzles[specificPuzzle]["answer"]}
                  submissions={submissions[specificPuzzle]}
                  updateSubmissions={(updated) => onSubmitSubmission(updated)}
                  onCloseDialog={() => resetDialogs()}>
      </SubmitDialog>)}
      <Snackbar open={isShowSuccessSnackbar} autoHideDuration={1500} onClose={() => setIsShowSuccessSnackbar(false)}
              anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        <Alert onClose={() => setIsShowSuccessSnackbar(false)} severity="success">
          Congratulations, you got the right answer!
        </Alert>
      </Snackbar>
    </div>
  )
}