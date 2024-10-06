import { collection, doc, documentId, getDoc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'; 
import { db } from './firebase';

const PUZZLES_COLLECTION = 'puzzle';
const TEAMS_COLLECTION = 'teams';
const NUM_PUZZLES = 8;

/* 
 Adds all team information when a user creates an account
*/
export function addInit(id) {
  const hintsAndScores = {}
  { Array.from({length: NUM_PUZZLES}, (_, index) => hintsAndScores[index] = 0 )}

  const submissions = {}
  { Array.from({length: NUM_PUZZLES}, (_, index) => submissions[index] = [] )} 

  setDoc(doc(db, TEAMS_COLLECTION, id), 
    {
      hints: hintsAndScores,
      scores: hintsAndScores,
      submissions,
      totalScore: 0
    });
}

export async function getPuzzles(setPuzzles, setIsLoading) {
  const puzzlesQuery = query(collection(db, PUZZLES_COLLECTION), orderBy(documentId()));

  const unsubscribe = onSnapshot(puzzlesQuery, async (snapshot) => {
    let allInfo = [];
    for (const documentSnapshot of snapshot.docs) {
      const puzzle = documentSnapshot.data();
      allInfo.push(puzzle);
    }
    setPuzzles(allInfo);
    setIsLoading(false);
  })

  return unsubscribe;
}

export async function getTeams(setHints, setSubmissions, setScores, setTotalScore, setIsLoadingTeams, id) {
  const docRef = doc(db, TEAMS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  
  setHints(data.hints);
  setSubmissions(data.submissions);
  setScores(data.scores);
  setTotalScore(data.totalScore);

  setIsLoadingTeams(false);
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