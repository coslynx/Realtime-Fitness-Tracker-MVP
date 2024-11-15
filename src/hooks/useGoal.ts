import { useState, useEffect } from 'react';
import { api } from 'src/utils/api';
import { LocalCache } from 'src/utils/LocalCache';
import { useAuthContext } from 'src/hooks/useAuth';
import { Logger } from 'src/services/Logger';

interface Goal {
  id: string;
  goalType: 'weight_loss' | 'distance' | 'muscle_gain';
  targetValue: number;
  timeframe: Date;
}

export const useGoal = () => {
  const { user } = useAuthContext();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGoals = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const cachedGoals = LocalCache.get('goals');
      if (cachedGoals) {
        setGoals(cachedGoals);
        setIsLoading(false);
        return;
      }

      if (user) {
        const response = await api.getGoals(user.id);
        setGoals(response.data);
        LocalCache.set('goals', response.data);
      } else {
        setGoals([]);
      }

      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error fetching goals:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const addGoal = async (newGoal: Goal) => {
    setIsLoading(true);
    setError(null);

    try {
      if (user) {
        const response = await api.addGoal(user.id, newGoal);
        setGoals([...goals, response.data]);
        LocalCache.set('goals', [...goals, response.data]);
      }
      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error adding goal:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const updateGoal = async (goalId: string, updatedGoal: Goal) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.updateGoal(goalId, updatedGoal);
      const updatedGoals = goals.map((goal) => (goal.id === goalId ? response.data : goal));
      setGoals(updatedGoals);
      LocalCache.set('goals', updatedGoals);
      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error updating goal:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const deleteGoal = async (goalId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.deleteGoal(goalId);
      const filteredGoals = goals.filter((goal) => goal.id !== goalId);
      setGoals(filteredGoals);
      LocalCache.set('goals', filteredGoals);
      setIsLoading(false);
    } catch (error: any) {
      Logger.error('Error deleting goal:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGoals();
  }, [user]);

  return { goals, isLoading, error, getGoals, addGoal, updateGoal, deleteGoal };
};