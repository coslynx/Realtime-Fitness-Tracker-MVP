import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Box } from '@mui/material';
import { Post } from './Post';
import { api } from 'src/utils/api'; 
import { useAuthContext } from 'src/hooks/useAuth';

const PostList: React.FC = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.getPosts(userId);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Social Feed
      </Typography>
      <Grid item xs={12} md={8} lg={6}>
        {posts.map((post) => (
          <Post 
            key={post.postId} 
            postId={post.postId} 
            author={post.author} 
            content={post.content} 
            likes={post.likes}
            comments={post.comments}
            user={user}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default PostList;