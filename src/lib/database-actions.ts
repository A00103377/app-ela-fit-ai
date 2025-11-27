import { supabase } from './supabase';
import { UserProfile, Workout, Progress } from './types';

// ==================== PERFIL ====================
export async function createProfile(userId: string, profile: Omit<UserProfile, 'id'>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      name: profile.name,
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
      fitness_level: profile.fitnessLevel,
      goals: profile.goals,
      restrictions: profile.restrictions,
      training_location: profile.trainingLocation,
      weekly_availability: profile.weeklyAvailability,
      preferred_duration: profile.preferredDuration,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      name: updates.name,
      age: updates.age,
      weight: updates.weight,
      height: updates.height,
      fitness_level: updates.fitnessLevel,
      goals: updates.goals,
      restrictions: updates.restrictions,
      training_location: updates.trainingLocation,
      weekly_availability: updates.weeklyAvailability,
      preferred_duration: updates.preferredDuration,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ==================== TREINOS ====================
export async function saveWorkout(userId: string, workout: Workout) {
  const { data, error } = await supabase
    .from('workouts')
    .insert({
      user_id: userId,
      name: workout.name,
      mode: workout.mode,
      duration: workout.duration,
      difficulty: workout.difficulty,
      muscle_groups: workout.muscleGroups,
      exercises: workout.exercises,
      warmup: workout.warmup,
      cooldown: workout.cooldown,
      tips: workout.tips,
      completed: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getWorkouts(userId: string, limit = 10) {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function completeWorkout(workoutId: string) {
  const { data, error } = await supabase
    .from('workouts')
    .update({
      completed: true,
      completed_at: new Date().toISOString(),
    })
    .eq('id', workoutId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getWorkoutStats(userId: string) {
  const { data, error } = await supabase
    .from('workouts')
    .select('completed, created_at')
    .eq('user_id', userId);

  if (error) throw error;

  const total = data.length;
  const completed = data.filter(w => w.completed).length;
  const thisWeek = data.filter(w => {
    const date = new Date(w.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }).length;

  return { total, completed, thisWeek };
}

// ==================== PROGRESSO ====================
export async function saveProgress(userId: string, progress: Omit<Progress, 'id'>) {
  const { data, error } = await supabase
    .from('progress')
    .insert({
      user_id: userId,
      date: progress.date,
      weight: progress.weight,
      measurements: progress.measurements,
      photos: progress.photos || [],
      notes: progress.notes,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getProgressHistory(userId: string, limit = 30) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getWeightProgress(userId: string) {
  const { data, error } = await supabase
    .from('progress')
    .select('date, weight')
    .eq('user_id', userId)
    .order('date', { ascending: true });

  if (error) throw error;
  return data;
}

// ==================== CONQUISTAS ====================
export async function unlockAchievement(
  userId: string,
  achievement: {
    type: string;
    title: string;
    description: string;
    icon: string;
  }
) {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      user_id: userId,
      ...achievement,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAchievements(userId: string) {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ==================== NUTRIÇÃO ====================
export async function saveNutritionPlan(
  userId: string,
  plan: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    meals: any;
  }
) {
  const { data, error } = await supabase
    .from('nutrition_plans')
    .insert({
      user_id: userId,
      ...plan,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getNutritionPlans(userId: string) {
  const { data, error } = await supabase
    .from('nutrition_plans')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
