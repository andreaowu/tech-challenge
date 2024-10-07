import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import { useAuth } from '../firebase/auth';
import styles from '../styles/navbar.module.scss';

export default function NavBar(props) {
  const { authUser, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <Container className={styles.container}>
            <Typography variant="h2" sx={{ flexGrow: 1, alignSelf: "center", fontSize: "32px" }}>
              Tech Challenge 2024
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography variant="h7" sx={{ flexGrow: 1 }}>
                Team: {props.teamName}
              </Typography>
              <Button variant="text" color="secondary" onClick={signOut}>
                Logout
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}