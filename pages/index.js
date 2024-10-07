import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider } from 'firebase/auth';
import { Button, CircularProgress, Container, Dialog, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import { auth } from '../firebase/firebase';
import { addInit } from '../firebase/firestore';
import styles from '../styles/landing.module.scss';

const REDIRECT_PAGE = '/dashboard';

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup', // popup signin flow rather than redirect flow
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async function(authResult, redirectUrl) {
      if (authResult.additionalUserInfo.isNewUser) {
        await addInit(authResult.user.uid);
      }
      return false;
    },
  }
};

export default function Home() {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();
  const [login, setLogin] = useState(false);

  // Redirect if finished loading and there's an existing user (user is logged in)
  useEffect(() => {
    if (!isLoading && authUser) {
      router.push({
        pathname: REDIRECT_PAGE
    }, REDIRECT_PAGE)
    }
  }, [authUser, isLoading])

  return ((isLoading || (!isLoading && !!authUser)) ? 
    <CircularProgress color="inherit" sx={{ marginLeft: '50%', marginTop: '25%' }}/>
    :
    <div>
      <Head>
        <title>Tech Challenge</title>
      </Head>

      <main>
        <Container className={styles.container}>
          <Typography variant="h1">Welcome to Fisk & TSU 2024 Tech Challenge!</Typography>
          <Typography variant="h2">3 hours of puzzles with your team, have fun!</Typography>
          <div className={styles.buttons}>
            <Button variant="contained" color="secondary"
                    onClick={() => setLogin(true)}>
              Login / Register
            </Button>
          </div>
          <Dialog onClose={() => setLogin(false)} open={login}>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </Dialog>
        </Container>
      </main>
    </div>
  )
}