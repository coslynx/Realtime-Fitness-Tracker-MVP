import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAuthContext } from 'src/hooks/useAuth';
import { useErrorContext } from 'src/hooks/useError';
import { api } from 'src/utils/api';

const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useAuthContext();
  const { setError } = useErrorContext();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      await login(data);
      router.push('/goals');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={6} lg={4}>
        <Typography variant="h4" align="center" gutterBottom>
          Login to Realtime Fitness Tracker
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username or Email"
            type="email"
            fullWidth
            margin="normal"
            {...register('email', { required: true })}
            error={!!errors.email}
            helperText={errors.email ? 'This field is required' : ''}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            {...register('password', { required: true })}
            error={!!errors.password}
            helperText={errors.password ? 'This field is required' : ''}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </Button>

          <Button
            variant="text"
            onClick={() => setShowPassword(!showPassword)}
            sx={{ mt: 2 }}
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </Button>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <a href="/signup">Sign up</a>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;