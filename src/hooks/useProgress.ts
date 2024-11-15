import { useState, useEffect } from 'react';
import { api } from 'src/utils/api'; 
import { LocalCache } from 'src/utils/LocalCache';
import { useAuthContext } from 'src/hooks/useAuth';
import { Logger } from 'src/services/Logger'; 

interface ProgressEntry {
  id: string; 
  goalType: 'weight_loss' | 'distance' | 'muscle_gain';
  date: Date;
  value: number; 
  // potentially other properties like activity, workout type, etc.
}

export const useProgress = () => {
  const { user } = useAuthContext();
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Add a state variable for cached progress data
  const [cachedProgressData, setCachedProgressData] = useState<ProgressEntry[]>([]);

  // Fetch progress data function
  const getProgressData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cachedData = LocalCache.get('progressData');
      if (cachedData) {
        setProgressData(cachedData);
        setCachedProgressData(cachedData); 
        setIsLoading(false); 
        return;
      }
      if (user) {
        const response = await api.getProgressData(user.id);
        setProgressData(response.data);
        setCachedProgressData(response.data); 
        LocalCache.set('progressData', response.data);
      } else {
        setProgressData([]);
        setCachedProgressData([]);
      }
      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error fetching progress data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Update progress data function
  const updateProgressData = async (updatedEntry: ProgressEntry) => {
    setIsLoading(true);
    setError(null);
    try {
      if (user) {
        const response = await api.updateProgressData(user.id, updatedEntry);
        const updatedProgress = progressData.map((entry) =>
          entry.id === updatedEntry.id ? response.data : entry
        );
        setProgressData(updatedProgress);
        setCachedProgressData(updatedProgress); 
        LocalCache.set('progressData', updatedProgress);
      }
      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error updating progress data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Add new progress data function
  const addProgressData = async (newEntry: ProgressEntry) => {
    setIsLoading(true);
    setError(null);
    try {
      if (user) {
        const response = await api.addProgressData(user.id, newEntry);
        setProgressData([...progressData, response.data]);
        setCachedProgressData([...cachedProgressData, response.data]); 
        LocalCache.set('progressData', [...progressData, response.data]);
      }
      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error adding progress data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  // Delete progress data function
  const deleteProgressData = async (entryId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.deleteProgressData(entryId); 
      const filteredProgress = progressData.filter((entry) => entry.id !== entryId);
      setProgressData(filteredProgress);
      setCachedProgressData(filteredProgress);
      LocalCache.set('progressData', filteredProgress);
      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error deleting progress data:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };
  

  // Fetch progress data on initial render or when the user changes
  useEffect(() => {
    getProgressData(); 
  }, [user]);

  return {
    progressData,
    isLoading,
    error,
    getProgressData,
    updateProgressData,
    addProgressData,
    deleteProgressData
  };
};