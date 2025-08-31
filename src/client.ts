import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ltxkqzmvkwfjkgxwjmgz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eGtxem12a3dmamtneHdqbWd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMTc3ODMsImV4cCI6MjA3MTg5Mzc4M30.aAwMdEM5CO5yXjHuOWrLMtWfIA7AJAhXrIU3cGhXAjE'
export const supabase = createClient(supabaseUrl, supabaseKey)