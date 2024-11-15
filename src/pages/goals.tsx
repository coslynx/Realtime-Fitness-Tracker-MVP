import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid, Typography, Button, TextField, Alert } from "@mui/material";
import { useGoalContext } from "src/hooks/useGoal";
import { useErrorContext } from "src/hooks/useError";
import GoalForm from "src/components/Goal/GoalForm";

const GoalsPage: React.FC = () => {
  const router = useRouter();
  const { goals, getGoals, isLoading, error, setError } = useGoalContext();
  const { setError: setErrorContext } = useErrorContext();

  useEffect(() => {
    getGoals();
  }, []);

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await deleteGoal(goalId);
      getGoals();
    } catch (err: any) {
      setErrorContext(err.message);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Fitness Goals
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          <Typography variant="body1" align="center">
            Loading goals...
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {goals.length > 0 ? (
              goals.map((goal) => (
                <Grid key={goal.id} item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {goal.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Target: {goal.targetValue}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Timeframe: {goal.timeframe}
                  </Typography>
                  <Grid
                    container
                    spacing={1}
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push(`/goals/${goal.id}`)}
                      >
                        Edit
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" align="center">
                You haven't set any goals yet.
              </Typography>
            )}
          </Grid>
        )}

        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <GoalForm />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GoalsPage;