export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      roadmap_days: {
        Row: {
          id: string;
          day_number: number;
          title: string;
          description: string;
          learning_objectives: string[] | null;
          estimated_time: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          day_number: number;
          title: string;
          description: string;
          learning_objectives?: string[] | null;
          estimated_time?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          day_number?: number;
          title?: string;
          description?: string;
          learning_objectives?: string[] | null;
          estimated_time?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      exercises: {
        Row: {
          id: string;
          day_id: string;
          title: string;
          problem_statement: string;
          starter_code: string | null;
          expected_output: string | null;
          difficulty: "Easy" | "Medium" | "Hard";
          hints: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          day_id: string;
          title: string;
          problem_statement: string;
          starter_code?: string | null;
          expected_output?: string | null;
          difficulty?: "Easy" | "Medium" | "Hard";
          hints?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          day_id?: string;
          title?: string;
          problem_statement?: string;
          starter_code?: string | null;
          expected_output?: string | null;
          difficulty?: "Easy" | "Medium" | "Hard";
          hints?: string[] | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "exercises_day_id_fkey";
            columns: ["day_id"];
            isOneToOne: false;
            referencedRelation: "roadmap_days";
            referencedColumns: ["id"];
          }
        ];
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          day_id: string;
          exercise_id: string;
          code: string | null;
          output: string | null;
          is_completed: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          day_id: string;
          exercise_id: string;
          code?: string | null;
          output?: string | null;
          is_completed?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          day_id?: string;
          exercise_id?: string;
          code?: string | null;
          output?: string | null;
          is_completed?: boolean;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_progress_day_id_fkey";
            columns: ["day_id"];
            isOneToOne: false;
            referencedRelation: "roadmap_days";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_progress_exercise_id_fkey";
            columns: ["exercise_id"];
            isOneToOne: false;
            referencedRelation: "exercises";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type RoadmapDay = Database["public"]["Tables"]["roadmap_days"]["Row"];
export type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
export type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
