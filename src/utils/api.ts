// src/utils/api.ts

import axios from 'axios'; // Version 1.3.5
import { API_BASE_URL } from '../config'; // Make sure you have a config file with the API base URL
import { User } from '../models/User'; // Make sure this model is defined properly
import { LocalCache } from '../utils/LocalCache'; // For local storage fallback

// Import additional data types for API responses (if needed):
// import { Goal } from '../models/Goal';
// import { ProgressEntry } from '../models/Progress'; 
// import { Post } from '../models/Post'; 

class Api {
  async getGoals(userId: string): Promise<any[]> {
    try {
      const token = localStorage.getItem('authSession'); // Retrieve the JWT token
      if (!token) {
        throw new Error('Not authenticated'); // Handle the case where the user is not authenticated
      }
      const response = await axios.get(`${API_BASE_URL}/goals/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request header
        },
      });
      return response.data; 
    } catch (error: any) {
      // Handle the error
      // You could log it, display an error message to the user, or retry the request
      // based on your specific needs. 
      console.error('Error fetching goals:', error);
      throw error; 
    }
  }

  async addGoal(userId: string, goal: any): Promise<any> {
    try {
      const token = localStorage.getItem('authSession'); 
      if (!token) {
        throw new Error('Not authenticated'); 
      }
      const response = await axios.post(`${API_BASE_URL}/goals/${userId}`, goal, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error adding goal:', error);
      throw error;
    }
  }

  async updateGoal(goalId: string, goal: any): Promise<any> {
    try {
      const token = localStorage.getItem('authSession'); 
      if (!token) {
        throw new Error('Not authenticated');
      }
      const response = await axios.put(`${API_BASE_URL}/goals/${goalId}`, goal, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data; 
    } catch (error: any) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  async deleteGoal(goalId: string): Promise<void> {
    try {
      const token = localStorage.getItem('authSession');
      if (!token) {
        throw new Error('Not authenticated');
      }
      await axios.delete(`${API_BASE_URL}/goals/${goalId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Error deleting goal:', error);
      throw error; 
    }
  }

  async getProgressData(userId: string): Promise<any[]> {
    try {
      const token = localStorage.getItem('authSession'); // Retrieve the JWT token
      if (!token) {
        throw new Error('Not authenticated'); // Handle the case where the user is not authenticated
      }
      const response = await axios.get(`${API_BASE_URL}/progress/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request header
        },
      });
      return response.data; 
    } catch (error: any) {
      // Handle the error
      // You could log it, display an error message to the user, or retry the request
      // based on your specific needs. 
      console.error('Error fetching progress data:', error);
      throw error; 
    }
  }

  async updateProgressData(userId: string, progressEntry: any): Promise<any> {
    try {
      const token = localStorage.getItem('authSession'); 
      if (!token) {
        throw new Error('Not authenticated');
      }
      const response = await axios.put(`${API_BASE_URL}/progress/${userId}`, progressEntry, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data; 
    } catch (error: any) {
      console.error('Error updating progress data:', error);
      throw error;
    }
  }

  async addProgressData(userId: string, progressEntry: any): Promise<any> {
    try {
      const token = localStorage.getItem('authSession'); 
      if (!token) {
        throw new Error('Not authenticated'); 
      }
      const response = await axios.post(`${API_BASE_URL}/progress/${userId}`, progressEntry, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error adding progress data:', error);
      throw error;
    }
  }

  async deleteProgressData(progressEntryId: string): Promise<void> {
    try {
      const token = localStorage.getItem('authSession');
      if (!token) {
        throw new Error('Not authenticated');
      }
      await axios.delete(`${API_BASE_URL}/progress/${progressEntryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      console.error('Error deleting progress data:', error);
      throw error; 
    }
  }

  async getPosts(userId: string): Promise<any[]> {
    try {
      const token = localStorage.getItem('authSession'); // Retrieve the JWT token
      if (!token) {
        throw new Error('Not authenticated'); // Handle the case where the user is not authenticated
      }
      const response = await axios.get(`${API_BASE_URL}/posts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the request header
        },
      });
      return response.data; 
    } catch (error: any) {
      // Handle the error
      // You could log it, display an error message to the user, or retry the request
      // based on your specific needs. 
      console.error('Error fetching posts:', error);
      throw error; 
    }
  }

  async createPost(post: any): Promise<any> { 
    try {
      const token = localStorage.getItem('authSession'); 
      if (!token) {
        throw new Error('Not authenticated'); 
      }
      const response = await axios.post(`${API_BASE_URL}/posts`, post, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Implement updatePost if needed
  // async updatePost(postId: string, post: Post): Promise<Post> { 
  //   // ... implementation similar to updateGoal ... 
  // } 
}

export const api = new Api();