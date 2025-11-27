import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos do banco de dados
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          age: number;
          weight: number;
          height: number;
          fitness_level: string;
          goals: string[];
          restrictions: string[];
          training_location: string;
          weekly_availability: number;
          preferred_duration: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      workouts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          mode: string;
          duration: number;
          difficulty: string;
          muscle_groups: string[];
          exercises: any;
          warmup: string[];
          cooldown: string[];
          tips: string[];
          completed: boolean;
          completed_at: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['workouts']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['workouts']['Insert']>;
      };
      progress: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          weight: number;
          measurements: any;
          photos: string[];
          notes: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['progress']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['progress']['Insert']>;
      };
      achievements: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          description: string;
          icon: string;
          unlocked_at: string;
        };
        Insert: Omit<Database['public']['Tables']['achievements']['Row'], 'id' | 'unlocked_at'>;
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
      };
      nutrition_plans: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          calories: number;
          protein: number;
          carbs: number;
          fats: number;
          meals: any;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['nutrition_plans']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['nutrition_plans']['Insert']>;
      };
    };
  };
}
