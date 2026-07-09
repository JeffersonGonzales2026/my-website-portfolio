// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase configuration variables inside .env.local");
}

// Create a single, reusable Supabase client instance throughout your microsites
export const supabase = createClient(supabaseUrl, supabaseAnonKey);