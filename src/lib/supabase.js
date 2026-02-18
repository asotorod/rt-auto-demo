import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bagetbpwlknyxeyjwcsj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhZ2V0YnB3bGtueXhleWp3Y3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NTUwMjksImV4cCI6MjA4NzAzMTAyOX0.8hOThurWMmpQ7NCf4YERZ3kPGiTH8RxxqR_TFKvQnEs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// RT Auto Center dealership ID
export const DEALERSHIP_ID = '3d804d5c-0923-40d5-891d-6352ea8f9782'
