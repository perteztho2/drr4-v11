import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Database types
export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string
          title: string
          excerpt: string | null
          content: string | null
          image: string | null
          author: string | null
          status: 'published' | 'draft'
          date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt?: string | null
          content?: string | null
          image?: string | null
          author?: string | null
          status?: 'published' | 'draft'
          date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string | null
          content?: string | null
          image?: string | null
          author?: string | null
          status?: 'published' | 'draft'
          date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string | null
          icon: string | null
          tags: string[] | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          icon?: string | null
          tags?: string[] | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          icon?: string | null
          tags?: string[] | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      incident_reports: {
        Row: {
          id: string
          reference_number: string
          reporter_name: string
          contact_number: string
          location: string | null
          incident_type: string | null
          description: string | null
          urgency: 'LOW' | 'MEDIUM' | 'HIGH'
          status: 'pending' | 'in-progress' | 'resolved'
          date_reported: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference_number: string
          reporter_name: string
          contact_number: string
          location?: string | null
          incident_type?: string | null
          description?: string | null
          urgency?: 'LOW' | 'MEDIUM' | 'HIGH'
          status?: 'pending' | 'in-progress' | 'resolved'
          date_reported?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference_number?: string
          reporter_name?: string
          contact_number?: string
          location?: string | null
          incident_type?: string | null
          description?: string | null
          urgency?: 'LOW' | 'MEDIUM' | 'HIGH'
          status?: 'pending' | 'in-progress' | 'resolved'
          date_reported?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image: string | null
          category: string | null
          date: string | null
          location: string | null
          tags: string[] | null
          status: 'published' | 'draft'
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image?: string | null
          category?: string | null
          date?: string | null
          location?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft'
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image?: string | null
          category?: string | null
          date?: string | null
          location?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft'
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}