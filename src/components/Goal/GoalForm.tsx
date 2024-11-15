import React, { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useGoalContext } from "src/hooks/useGoal";
import { api } from "src/utils/api";

const GoalForm: React.FC = () => {
  const { addGoal, isLoading, error } = useGoalContext();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await addGoal(data);
      router.push("/goals");
    } catch (err: any) {
      console.error("Error saving goal:", err);
      // Display error message to the user
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} md={6} lg={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Set Your Fitness Goal
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Goal Type"
            select
            fullWidth
            margin="normal"
            {...register("goalType", { required: true })}
            error={!!errors.goalType}
            helperText={errors.goalType ? "This field is required" : ""}
          >
            <option value="weight_loss">Weight Loss</option>
            <option value="distance">Distance</option>
            <option value="muscle_gain">Muscle Gain</option>
          </TextField>

          <TextField
            label="Target Value"
            type="number"
            fullWidth
            margin="normal"
            {...register("targetValue", { required: true })}
            error={!!errors.targetValue}
            helperText={errors.targetValue ? "This field is required" : ""}
          />

          <TextField
            label="Timeframe"
            type="date"
            fullWidth
            margin="normal"
            {...register("timeframe", { required: true })}
            error={!!errors.timeframe}
            helperText={errors.timeframe ? "This field is required" : ""}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Set Goal"}
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default GoalForm;