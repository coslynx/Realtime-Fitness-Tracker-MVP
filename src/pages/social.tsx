import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSocialContext } from 'src/hooks/useSocial';
import { useAuthContext } from 'src/hooks/useAuth';
import { useErrorContext } from 'src/hooks/useError';
import PostList from 'src/components/Social/PostList';
import PostForm from 'src/components/Social/PostForm';
import { Grid, Typography, Alert } from '@mui/material';
import { api } from 'src/utils/api';

const SocialPage: React.FC = () => {
  const { user } = useAuthContext();
  const { posts, getPosts, createPost, isLoading, error } = useSocialContext();
  const { setError } = useErrorContext();
  const router = useRouter();

  useEffect(() => {
    getPosts();
  }, []);

  if (error) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
        </Grid>
      </Grid>
    );
  }

  if (isLoading) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">Loading posts...</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={12} md={8} lg={6}>
        <Typography variant="h4" align="center" gutterBottom>
          Social Feed
        </Typography>

        <PostForm onCreatePost={createPost} />

        <PostList posts={posts} />
      </Grid>
    </Grid>
  );
};

export default SocialPage;