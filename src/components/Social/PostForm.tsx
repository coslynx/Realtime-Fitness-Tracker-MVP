import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { api } from 'src/utils/api';
import { useAuthContext } from 'src/hooks/useAuth';
import DOMPurify from 'dompurify'; 

const PostForm: React.FC = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const sanitizedContent = DOMPurify.sanitize(data.content);
      const response = await api.createPost({
        content: sanitizedContent,
        authorId: user.id,
      });

      // Handle success, potentially update the post list, etc.
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Share Your Fitness Journey!
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="What's on your mind?"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            {...register('content', { required: true })}
            error={!!errors.content}
            helperText={errors.content ? 'Please write your post' : ''}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={!user || !user.id}
          >
            Post
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default PostForm;