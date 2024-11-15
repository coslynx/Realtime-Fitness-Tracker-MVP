import React from 'react';
import { useRouter } from 'next/router';
import { Grid, Typography, Box, Alert } from '@mui/material';
import { useProgressContext } from 'src/hooks/useProgress';
import ProgressChart from 'src/components/Progress/ProgressChart';
import { useErrorContext } from 'src/hooks/useError';
import Navbar from 'src/components/Navbar';

const ProgressPage: React.FC = () => {
  const router = useRouter();
  const { progressData, isLoading, error } = useProgressContext();
  const { setError } = useErrorContext();

  return (
    <div>
      <Navbar />
      <main>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12} md={8} lg={6}>
            <Typography variant="h4" gutterBottom>
              Your Fitness Progress
            </Typography>
            {isLoading && <Typography variant="body1">Loading progress...</Typography>}
            {error && <Alert severity="error">{error}</Alert>}
            {progressData && (
              <ProgressChart goalType="weight_loss" progressData={progressData} />
            )}
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default ProgressPage;