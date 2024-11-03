import { collection, doc, getDoc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const PUZZLES_COLLECTION = 'puzzle';
const TEAMS_COLLECTION = 'teams';
const TOTAL_NUMBER_PUZZLES = 20;
const CHECK_COLLECTION = 'check';

/* 
 Adds all team information when a user creates an account
*/
export function addInit(id) {
  const hintsAndScores = {}
  { Array.from({length: TOTAL_NUMBER_PUZZLES}, (_, index) => hintsAndScores[index] = 0 )}

  const submissions = {}
  { Array.from({length: TOTAL_NUMBER_PUZZLES}, (_, index) => submissions[index] = [] )} 

  setDoc(doc(db, TEAMS_COLLECTION, id), 
    {
      hints: hintsAndScores,
      scores: hintsAndScores,
      submissions,
      totalScore: 0
    });
}

// Gets static puzzle information
export async function getPuzzles(setPuzzles, setIsLoading, puzzleCount) {
  let puzzles = {};
  const puzzlesQuery = query(collection(db, PUZZLES_COLLECTION));

  const unsubscribe = onSnapshot(puzzlesQuery, async (snapshot) => {
    let allInfo = [];

    // Sort puzzles based on documentId, which is a string
    // documentIds will never be equal so don't need to return 0
    const sortedPuzzles = snapshot.docs.sort((a, b) => {
      const idA = Number(a.id);
      const idB = Number(b.id);
      if (idA < idB) {
        return -1;
      }
      return 1;
    });

    for (const documentSnapshot of sortedPuzzles) {
      const puzzle = documentSnapshot.data();
      allInfo.push(puzzle);
    }

    setPuzzles(allInfo.slice(0, puzzleCount));
    puzzles = allInfo;
    setIsLoading(false);
  })

  const teamsQuery = query(collection(db, TEAMS_COLLECTION));

  onSnapshot(teamsQuery, async (snapshot) => {
    for (const documentSnapshot of snapshot.docs) {
      const team = documentSnapshot.data();
      const id =  documentSnapshot.id;
      const totalScore = team.totalScore;
      const submissions = team.submissions;
      let correctScore = 0;

      for (const [index, submission] of Object.entries(submissions)) {
        const lastSubmission = submission[submission.length - 1];
        const puzzlePoints = puzzles[index]['points'];
        const correctAnswer = puzzles[index]['answer'];
        correctScore += (lastSubmission == correctAnswer) ? puzzlePoints : 0;
      };

      setDoc(doc(db, CHECK_COLLECTION, id), 
      {
        correctScore,
        totalScore
      });
    }
  })

  return unsubscribe;
}

// Gets puzzle information for specific team with @id
export async function getTeams(setHints, setSubmissions, setScores, setTotalScore, setIsLoadingTeams, setTeamInfo, id) {
  const docRef = doc(db, TEAMS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  
  setHints(data.hints);
  setSubmissions(data.submissions);
  setScores(data.scores);
  setTotalScore(data.totalScore);
  if (data.teamName) {
    setTeamInfo({
      teamName: data.teamName,
      members: data.members
    });
  } else {
    setTeamInfo({
      teamName: "",
      members: []
    })
  }
  setIsLoadingTeams(false);
}

// Update team info with @id
export function updateTeamInfo(id, teamInfo) {
  setDoc(doc(db, TEAMS_COLLECTION, id), 
    { teamName: teamInfo.teamName, members: teamInfo.members },
    { merge: true }
  );
}

// Update hints, submissions, or scores for team @id for puzzle @puzzleNumber
export function updateTeam(id, puzzleNumber, updated, current, key) {
  current[puzzleNumber] = updated;
  setDoc(doc(db, TEAMS_COLLECTION, id), { [key]: current }, { merge: true });
}

// Update total score for team @id
export function updateScore(id, totalScore) {
  setDoc(doc(db, TEAMS_COLLECTION, id), { totalScore }, { merge: true });
}