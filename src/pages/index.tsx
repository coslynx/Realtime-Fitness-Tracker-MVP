import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Button, Grid, Container, Box } from '@mui/material';
import { useAuthContext } from 'src/hooks/useAuth';
import { useGoalContext } from 'src/hooks/useGoal';
import { useProgressContext } from 'src/hooks/useProgress';
import { useSocialContext } from 'src/hooks/useSocial';
import { useErrorContext } from 'src/hooks/useError';

const HomePage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthContext();
  const { goals } = useGoalContext();
  const { progressData } = useProgressContext();
  const { recentPosts } = useSocialContext();
  const { error } = useErrorContext();

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" align="center" gutterBottom>
          Welcome to Realtime Fitness Tracker!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Join the fitness revolution and track your progress in real-time. Set goals, monitor your journey, and stay motivated with our interactive features.
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6} lg={4}>
            <Button variant="contained" fullWidth onClick={() => router.push('/signup')}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Button variant="contained" fullWidth onClick={() => router.push('/login')}>
              Log In
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h5" align="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4} lg={3}>
            <Typography variant="body2" align="center" gutterBottom>
              Real-time Progress Tracking
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Typography variant="body2" align="center" gutterBottom>
              Personalized Goal Setting
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Typography variant="body2" align="center" gutterBottom>
              Motivating Social Features
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Recent Progress:
            </Typography>
            {/* Display user's progress on their primary goal */}
            {/* You'll likely need to create a ProgressChart component 
                to display progress data in a chart. */}
            {/* Example: */}
            {/* <ProgressChart progressData={progressData[0]} /> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Active Goals:
            </Typography>
            {/* Display a list of user's active goals */}
            <ul>
              {goals?.map((goal) => (
                <li key={goal.id}>
                  <Typography variant="body2">{goal.title}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Recent Posts:
            </Typography>
            {/* Display a feed of the user's recent social posts */}
            <ul>
              {recentPosts?.map((post) => (
                <li key={post.id}>
                  <Typography variant="body2">{post.content}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        </Grid>
      </Grid>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default HomePage;